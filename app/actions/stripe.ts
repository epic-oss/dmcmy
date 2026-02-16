'use server'

import { redirect } from 'next/navigation'
import { stripe, PREMIUM_PRICE_ID } from '@/lib/stripe/server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

/**
 * Create a Stripe Checkout session for premium subscription
 */
export async function createCheckoutSession(companyId: string) {
  const supabase = await createClient()

  // Verify user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Not authenticated')
  }

  // Verify user owns this company
  const { data: company, error: companyError } = await supabase
    .from('companies_dmc')
    .select('id, name, claimed_by, stripe_customer_id, is_premium')
    .eq('id', companyId)
    .single()

  if (companyError || !company) {
    throw new Error('Company not found')
  }

  if (company.claimed_by !== user.id) {
    throw new Error('You do not own this company')
  }

  if (company.is_premium) {
    throw new Error('Company is already premium')
  }

  // Get or create Stripe customer
  let customerId = company.stripe_customer_id

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        companyId: company.id,
        userId: user.id
      }
    })

    customerId = customer.id

    // Save customer ID to company
    await supabaseAdmin
      .from('companies_dmc')
      .update({ stripe_customer_id: customerId })
      .eq('id', companyId)
  }

  // Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: PREMIUM_PRICE_ID,
        quantity: 1
      }
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/billing?success=true&company_id=${companyId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?cancelled=true`,
    metadata: {
      companyId: company.id,
      userId: user.id
    },
    subscription_data: {
      metadata: {
        companyId: company.id,
        userId: user.id
      }
    }
  })

  if (!session.url) {
    throw new Error('Failed to create checkout session')
  }

  return session.url
}

/**
 * Create a Stripe Customer Portal session for managing subscription
 */
export async function createPortalSession(companyId: string) {
  const supabase = await createClient()

  // Verify user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Not authenticated')
  }

  // Get company and verify ownership
  const { data: company, error: companyError } = await supabase
    .from('companies_dmc')
    .select('stripe_customer_id, claimed_by')
    .eq('id', companyId)
    .single()

  if (companyError || !company) {
    throw new Error('Company not found')
  }

  if (company.claimed_by !== user.id) {
    throw new Error('You do not own this company')
  }

  if (!company.stripe_customer_id) {
    throw new Error('No Stripe customer found')
  }

  // Create Customer Portal session
  const session = await stripe.billingPortal.sessions.create({
    customer: company.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/billing`
  })

  return session.url
}

/**
 * Redirect to Stripe Checkout (wrapper for use in forms)
 */
export async function redirectToCheckout(companyId: string) {
  const url = await createCheckoutSession(companyId)
  redirect(url)
}

/**
 * Redirect to Stripe Customer Portal (wrapper for use in forms)
 */
export async function redirectToPortal(companyId: string) {
  const url = await createPortalSession(companyId)
  redirect(url)
}
