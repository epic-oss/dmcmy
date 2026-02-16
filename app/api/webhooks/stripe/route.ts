import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', errorMessage)
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    )
  }

  console.log('Received Stripe webhook:', event.type)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const companyId = session.metadata?.companyId

        if (companyId) {
          console.log('Activating premium for company:', companyId)

          // Update company to premium status
          const { error } = await supabaseAdmin
            .from('companies_dmc')
            .update({
              is_premium: true,
              premium_started_at: new Date().toISOString(),
              stripe_subscription_id: session.subscription as string,
              stripe_customer_id: session.customer as string
            })
            .eq('id', companyId)

          if (error) {
            console.error('Error updating company premium status:', error)
            throw error
          }

          console.log('Premium activated successfully for company:', companyId)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription

        console.log('Subscription updated:', subscription.id)

        // Handle subscription updates (e.g., plan changes)
        const { error } = await supabaseAdmin
          .from('companies_dmc')
          .update({
            is_premium: subscription.status === 'active',
            premium_started_at: new Date(subscription.current_period_start * 1000).toISOString(),
            premium_expires_at: new Date(subscription.current_period_end * 1000).toISOString()
          })
          .eq('stripe_subscription_id', subscription.id)

        if (error) {
          console.error('Error updating subscription:', error)
          throw error
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        console.log('Subscription cancelled:', subscription.id)

        // Downgrade company to free tier
        const { error } = await supabaseAdmin
          .from('companies_dmc')
          .update({
            is_premium: false,
            premium_expires_at: new Date().toISOString()
          })
          .eq('stripe_subscription_id', subscription.id)

        if (error) {
          console.error('Error cancelling premium:', error)
          throw error
        }

        console.log('Premium cancelled for subscription:', subscription.id)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice

        console.warn('Payment failed for invoice:', invoice.id)

        // Optionally: Send email notification to customer
        // or update company status to "payment_failed"
        break
      }

      default:
        console.log('Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
