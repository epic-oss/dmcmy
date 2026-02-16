import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { siteConfig } from '@/lib/config'
import { Database } from '@/types/database'

type Inquiry = Database['public']['Tables']['inquiries_dmc']['Row']
type InquiryInsert = Database['public']['Tables']['inquiries_dmc']['Insert']

/**
 * Create a new inquiry and send to Make.com webhook
 * Handles both broadcast and company-specific inquiries
 */
export async function createInquiry(data: {
  source: 'floating_button' | 'company_specific_inquiry'
  companyId?: string
  fullName: string
  email: string
  phone?: string
  leadCompany?: string
  eventType?: string
  groupSize?: string
  preferredDestination?: string
  preferredDates?: string
  estimatedBudget?: string
  specialRequirements?: string
  message?: string
}) {
  const supabase = await createClient()

  // Insert into inquiries_dmc table
  const { data: inquiry, error } = await (supabase as any)
    .from('inquiries_dmc')
    .insert({
      source: data.source,
      company_id: data.companyId,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone || null,
      lead_company: data.leadCompany || null,
      event_type: data.eventType || null,
      group_size: data.groupSize || null,
      preferred_destination: data.preferredDestination || null,
      preferred_dates: data.preferredDates || null,
      estimated_budget: data.estimatedBudget || null,
      special_requirements: data.specialRequirements || null,
      message: data.message || null
    })
    .select()
    .single()

  if (error) {
    console.error('Supabase insert error:', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
      fullError: error
    })
    throw new Error(`Database error: ${error.message} (Code: ${error.code})`)
  }

  // Send to Make.com webhook (async, don't block user)
  if (siteConfig.makeWebhookUrl) {
    try {
      const webhookPayload = {
        source: data.source,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        leadCompany: data.leadCompany,
        companyName: data.companyId ? 'Company-specific' : null,
        eventType: data.eventType,
        groupSize: data.groupSize,
        preferredDestination: data.preferredDestination,
        preferredDates: data.preferredDates,
        estimatedBudget: data.estimatedBudget,
        specialRequirements: data.specialRequirements,
        message: data.message,
        inquiryId: inquiry.id,
        createdAt: inquiry.created_at,
        timestamp: new Date().toISOString()
      }

      const response = await fetch(siteConfig.makeWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload)
      })

      if (response.ok) {
        // Update webhook status
        await (supabase as any)
          .from('inquiries_dmc')
          .update({
            webhook_sent_at: new Date().toISOString(),
            webhook_status: 'sent'
          })
          .eq('id', inquiry.id)
      } else {
        throw new Error(`Webhook failed: ${response.status}`)
      }
    } catch (webhookError) {
      console.error('Make.com webhook failed:', webhookError)

      // Update webhook status to failed
      await (supabase as any)
        .from('inquiries_dmc')
        .update({
          webhook_sent_at: new Date().toISOString(),
          webhook_status: 'failed'
        })
        .eq('id', inquiry.id)

      // Don't throw - we still want to save the inquiry even if webhook fails
    }
  }

  return inquiry as Inquiry
}

/**
 * Get inquiries for a specific company (vendor dashboard)
 */
export async function getInquiriesForCompany(companyId: string) {
  const supabase = await createClient()

  const { data, error } = await (supabase as any)
    .from('inquiries_dmc')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Inquiry[]
}

/**
 * Get broadcast inquiries (for premium vendors)
 */
export async function getBroadcastInquiries(limit = 50) {
  const supabase = await createClient()

  const { data, error } = await (supabase as any)
    .from('inquiries_dmc')
    .select('*')
    .eq('source', 'floating_button')
    .is('company_id', null)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as Inquiry[]
}

/**
 * Admin: Get all inquiries (bypasses RLS)
 */
export async function getAllInquiriesAdmin(limit = 100, offset = 0) {
  const { data, error, count } = await supabaseAdmin
    .from('inquiries_dmc')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return { inquiries: data as Inquiry[], total: count || 0 }
}

/**
 * Admin: Update inquiry status
 */
export async function updateInquiryStatusAdmin(id: string, status: string) {
  const { data, error } = await supabaseAdmin
    .from('inquiries_dmc')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Inquiry
}

/**
 * Get inquiry by ID
 */
export async function getInquiryById(id: string) {
  const supabase = await createClient()

  const { data, error } = await (supabase as any)
    .from('inquiries_dmc')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }

  return data as Inquiry
}

/**
 * Get inquiry count for a company
 */
export async function getInquiryCountForCompany(companyId: string) {
  const supabase = await createClient()

  const { count, error } = await (supabase as any)
    .from('inquiries_dmc')
    .select('*', { count: 'exact', head: true })
    .eq('company_id', companyId)

  if (error) throw error
  return count || 0
}
