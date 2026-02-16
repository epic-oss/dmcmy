import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

// Premium subscription price ID (RM99/month)
export const PREMIUM_PRICE_ID = process.env.STRIPE_PREMIUM_PRICE_ID || ''

if (!PREMIUM_PRICE_ID) {
  console.warn('Warning: STRIPE_PREMIUM_PRICE_ID not set')
}
