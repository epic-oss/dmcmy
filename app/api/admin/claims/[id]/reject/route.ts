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
    const { data: claim, error: claimError } = await (supabaseAdmin as any)
      .from('claim_requests_dmc')
      .select('*')
      .eq('id', claimId)
      .single()

    if (claimError || !claim) {
      return NextResponse.json({ error: 'Claim request not found' }, { status: 404 })
    }

    // Update claim request status
    await (supabaseAdmin as any)
      .from('claim_requests_dmc')
      .update({
        status: 'rejected',
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
        rejection_reason: 'Rejected by admin'
      })
      .eq('id', claimId)

  } catch (error) {
    console.error('Reject claim error:', error)
    return NextResponse.json({ error: 'Failed to reject claim' }, { status: 500 })
  }

  // Return success response
  return NextResponse.redirect(new URL('/admin/claims', request.url))
}
