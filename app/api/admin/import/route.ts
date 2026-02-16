import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

// Helper function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Helper to parse CSV line (handles quoted fields with commas)
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

// Check if user is admin
const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS?.split(',').map(id => id.trim()) || []

export async function POST(request: NextRequest) {
  try {
    // Check auth
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || !ADMIN_USER_IDS.includes(user.id)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get file from form data
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Read and parse CSV
    const text = await file.text()
    const lines = text.split('\n').filter(line => line.trim())

    if (lines.length < 2) {
      return NextResponse.json({ error: 'CSV file is empty or invalid' }, { status: 400 })
    }

    // Parse header
    const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim())

    // Required fields
    const requiredFields = ['name', 'state']
    const missingFields = requiredFields.filter(field => !headers.includes(field))

    if (missingFields.length > 0) {
      return NextResponse.json({
        error: `Missing required columns: ${missingFields.join(', ')}`
      }, { status: 400 })
    }

    // Process rows
    let successCount = 0
    const errors: string[] = []

    for (let i = 1; i < lines.length; i++) {
      try {
        const values = parseCSVLine(lines[i])

        if (values.length < headers.length) {
          errors.push(`Row ${i + 1}: Insufficient columns`)
          continue
        }

        // Build company object
        const row: Record<string, string> = {}
        headers.forEach((header, index) => {
          row[header] = values[index]
        })

        // Validate required fields
        if (!row.name || !row.state) {
          errors.push(`Row ${i + 1}: Missing name or state`)
          continue
        }

        // Generate slug
        let slug = generateSlug(row.name)

        // Check for duplicate slug
        const { data: existing } = await supabaseAdmin
          .from('companies_dmc')
          .select('slug')
          .eq('slug', slug)
          .single()

        if (existing) {
          slug = `${slug}-${Date.now()}`
        }

        // Parse array fields (comma-separated in quotes)
        const serviceCategories = row.service_categories
          ? row.service_categories.split(',').map(s => s.trim()).filter(Boolean)
          : []

        const destinationExpertise = row.destination_expertise
          ? row.destination_expertise.split(',').map(s => s.trim()).filter(Boolean)
          : []

        const certifications = row.certifications
          ? row.certifications.split(',').map(s => s.trim()).filter(Boolean)
          : []

        const languages = row.languages
          ? row.languages.split(',').map(s => s.trim()).filter(Boolean)
          : []

        // Insert company
        const { error: insertError } = await supabaseAdmin
          .from('companies_dmc')
          .insert({
            name: row.name,
            slug,
            description: row.description || null,
            tagline: row.tagline || null,
            state: row.state,
            city: row.city || null,
            address: row.address || null,
            postal_code: row.postal_code || null,
            phone: row.phone || null,
            email: row.email || null,
            website_url: row.website_url || null,
            service_categories: serviceCategories.length > 0 ? serviceCategories : null,
            destination_expertise: destinationExpertise.length > 0 ? destinationExpertise : null,
            certifications: certifications.length > 0 ? certifications : null,
            languages: languages.length > 0 ? languages : null,
            established_year: row.established_year ? parseInt(row.established_year) : null,
            is_published: true,
            is_claimed: false,
            is_premium: false,
            is_featured: false
          })

        if (insertError) {
          errors.push(`Row ${i + 1} (${row.name}): ${insertError.message}`)
        } else {
          successCount++
        }
      } catch (rowError) {
        errors.push(`Row ${i + 1}: ${rowError instanceof Error ? rowError.message : 'Unknown error'}`)
      }
    }

    return NextResponse.json({
      success: successCount,
      errors
    })
  } catch (error) {
    console.error('CSV import error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Import failed'
    }, { status: 500 })
  }
}
