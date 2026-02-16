import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { Database } from '@/types/database'

type Company = Database['public']['Tables']['companies_dmc']['Row']
type CompanyInsert = Database['public']['Tables']['companies_dmc']['Insert']
type CompanyUpdate = Database['public']['Tables']['companies_dmc']['Update']

/**
 * Get published companies with optional filtering
 * Uses companies_dmc table (shared Epic Buzz database)
 */
export async function getPublishedCompanies({
  state,
  serviceCategories,
  destinations,
  isPremium,
  priceTier,
  limit = 50,
  offset = 0
}: {
  state?: string
  serviceCategories?: string[]
  destinations?: string[]
  isPremium?: boolean
  priceTier?: string
  limit?: number
  offset?: number
} = {}) {
  const supabase = await createClient()

  let query = supabase
    .from('companies_dmc')
    .select('*', { count: 'exact' })
    .eq('is_published', true)
    .order('is_premium', { ascending: false }) // Premium first
    .order('is_featured', { ascending: false }) // Then featured
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (state) query = query.eq('state', state)
  if (isPremium !== undefined) query = query.eq('is_premium', isPremium)
  if (priceTier) query = query.eq('price_tier', priceTier)
  if (serviceCategories?.length) {
    query = query.contains('service_categories', serviceCategories)
  }
  if (destinations?.length) {
    query = query.contains('destination_expertise', destinations)
  }

  const { data, error, count } = await query

  if (error) throw error
  return { companies: data as Company[], total: count || 0 }
}

/**
 * Get a single company by slug
 */
export async function getCompanyBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('companies_dmc')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // Not found
    throw error
  }

  return data as Company
}

/**
 * Get featured companies for homepage
 */
export async function getFeaturedCompanies(limit = 6) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('companies_dmc')
    .select('*')
    .eq('is_featured', true)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as Company[]
}

/**
 * Get premium companies
 */
export async function getPremiumCompanies(limit = 12) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('companies_dmc')
    .select('*')
    .eq('is_premium', true)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as Company[]
}

/**
 * Increment view count for a company (async, don't await)
 */
export async function incrementViewCount(companyId: string) {
  const supabase = await createClient()

  // Call the database function increment_view_count_dmc
  await supabase.rpc('increment_view_count_dmc', { company_id: companyId })
}

/**
 * Get companies claimed by a specific user
 */
export async function getCompaniesByUserId(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('companies_dmc')
    .select('*')
    .eq('claimed_by', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Company[]
}

/**
 * Get a company by ID (for editing)
 */
export async function getCompanyById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('companies_dmc')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }

  return data as Company
}

/**
 * Create a new company (requires authentication)
 */
export async function createCompany(company: CompanyInsert) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('companies_dmc')
    .insert(company)
    .select()
    .single()

  if (error) throw error
  return data as Company
}

/**
 * Update a company (only if user owns it via RLS)
 */
export async function updateCompany(id: string, updates: CompanyUpdate) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('companies_dmc')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Company
}

/**
 * Admin: Get all companies (bypasses RLS)
 */
export async function getAllCompaniesAdmin(limit = 100, offset = 0) {
  const { data, error, count } = await supabaseAdmin
    .from('companies_dmc')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return { companies: data as Company[], total: count || 0 }
}

/**
 * Admin: Update company (bypasses RLS)
 */
export async function updateCompanyAdmin(id: string, updates: CompanyUpdate) {
  const { data, error } = await supabaseAdmin
    .from('companies_dmc')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Company
}

/**
 * Admin: Delete company (bypasses RLS)
 */
export async function deleteCompanyAdmin(id: string) {
  const { error } = await supabaseAdmin
    .from('companies_dmc')
    .delete()
    .eq('id', id)

  if (error) throw error
}

/**
 * Search companies by name or description
 */
export async function searchCompanies(searchTerm: string, limit = 20) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('companies_dmc')
    .select('*')
    .eq('is_published', true)
    .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order('is_premium', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as Company[]
}
