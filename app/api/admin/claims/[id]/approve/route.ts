import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS?.split(',').map(id => id.trim()) || []

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check auth
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || !ADMIN_USER_IDS.includes(user.id)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: claimId } = await params

    // Get claim request
    const { data: claim, error: claimError } = await supabaseAdmin
      .from('claim_requests_dmc')
      .select('*')
      .eq('id', claimId)
      .single()

    if (claimError || !claim) {
      return NextResponse.json({ error: 'Claim request not found' }, { status: 404 })
    }

    // Update claim request status
    await supabaseAdmin
      .from('claim_requests_dmc')
      .update({
        status: 'approved',
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id
      })
      .eq('id', claimId)

    // Update company with claimed info
    await supabaseAdmin
      .from('companies_dmc')
      .update({
        is_claimed: true,
        claimed_by: claim.user_id,
        claimed_at: new Date().toISOString()
      })
      .eq('id', claim.company_id)

  } catch (error) {
    console.error('Approve claim error:', error)
    return NextResponse.json({ error: 'Failed to approve claim' }, { status: 500 })
  }

  // Return success response
  return NextResponse.redirect(new URL('/admin/claims', request.url))
}
