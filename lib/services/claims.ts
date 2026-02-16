import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { Database } from '@/types/database'

type ClaimRequest = Database['public']['Tables']['claim_requests_dmc']['Row']
type ClaimRequestInsert = Database['public']['Tables']['claim_requests_dmc']['Insert']

/**
 * Create a new claim request for a company
 */
export async function createClaimRequest(data: {
  companyId: string
  userId: string
  requesterName: string
  requesterEmail: string
  requesterPhone?: string
  position?: string
  verificationNotes?: string
}) {
  const supabase = await createClient()

  const { data: claimRequest, error } = await (supabase as any)
    .from('claim_requests_dmc')
    .insert({
      company_id: data.companyId,
      user_id: data.userId,
      requester_name: data.requesterName,
      requester_email: data.requesterEmail,
      requester_phone: data.requesterPhone,
      position: data.position,
      verification_notes: data.verificationNotes
    })
    .select()
    .single()

  if (error) {
    // Check if this is a duplicate claim attempt
    if (error.code === '23505') {
      throw new Error('You have already submitted a claim request for this company')
    }
    throw error
  }

  return claimRequest as ClaimRequest
}

/**
 * Get claim requests for a specific user
 */
export async function getClaimRequestsByUser(userId: string) {
  const supabase = await createClient()

  const { data, error } = await (supabase as any)
    .from('claim_requests_dmc')
    .select(`
      *,
      companies_dmc (
        id,
        name,
        slug,
        logo_url
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Admin: Get all pending claim requests
 */
export async function getPendingClaimRequestsAdmin() {
  const { data, error } = await supabaseAdmin
    .from('claim_requests_dmc')
    .select(`
      *,
      companies_dmc (
        id,
        name,
        slug,
        state,
        logo_url
      )
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Admin: Get all claim requests (all statuses)
 */
export async function getAllClaimRequestsAdmin(limit = 100, offset = 0) {
  const { data, error, count } = await supabaseAdmin
    .from('claim_requests_dmc')
    .select(`
      *,
      companies_dmc (
        id,
        name,
        slug,
        state,
        logo_url
      )
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return { claims: data, total: count || 0 }
}

/**
 * Admin: Approve a claim request
 */
export async function approveClaimRequestAdmin(
  requestId: string,
  adminUserId: string
) {
  // Get the claim request first
  const { data: claimRequest, error: fetchError } = await supabaseAdmin
    .from('claim_requests_dmc')
    .select('*')
    .eq('id', requestId)
    .single()

  if (fetchError) throw fetchError

  // Update the claim request status
  const { error: updateClaimError } = await supabaseAdmin
    .from('claim_requests_dmc')
    .update({
      status: 'approved',
      reviewed_at: new Date().toISOString(),
      reviewed_by: adminUserId
    })
    .eq('id', requestId)

  if (updateClaimError) throw updateClaimError

  // Update the company to mark it as claimed
  const { error: updateCompanyError } = await supabaseAdmin
    .from('companies_dmc')
    .update({
      is_claimed: true,
      claimed_by: claimRequest.user_id,
      claimed_at: new Date().toISOString()
    })
    .eq('id', claimRequest.company_id)

  if (updateCompanyError) throw updateCompanyError

  return true
}

/**
 * Admin: Reject a claim request
 */
export async function rejectClaimRequestAdmin(
  requestId: string,
  adminUserId: string,
  rejectionReason?: string
) {
  const { error } = await supabaseAdmin
    .from('claim_requests_dmc')
    .update({
      status: 'rejected',
      reviewed_at: new Date().toISOString(),
      reviewed_by: adminUserId,
      rejection_reason: rejectionReason
    })
    .eq('id', requestId)

  if (error) throw error

  return true
}

/**
 * Check if a company is already claimed
 */
export async function isCompanyClaimed(companyId: string) {
  const supabase = await createClient()

  const { data, error } = await (supabase as any)
    .from('companies_dmc')
    .select('is_claimed, claimed_by')
    .eq('id', companyId)
    .single()

  if (error) throw error

  return data.is_claimed
}

/**
 * Check if user has already requested to claim this company
 */
export async function hasUserRequestedClaim(companyId: string, userId: string) {
  const supabase = await createClient()

  const { data, error } = await (supabase as any)
    .from('claim_requests_dmc')
    .select('id, status')
    .eq('company_id', companyId)
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error

  return data !== null
}

/**
 * Get claim request by ID
 */
export async function getClaimRequestById(id: string) {
  const supabase = await createClient()

  const { data, error } = await (supabase as any)
    .from('claim_requests_dmc')
    .select(`
      *,
      companies_dmc (
        id,
        name,
        slug,
        logo_url,
        state,
        city
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }

  return data
}
