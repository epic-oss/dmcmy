import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import Hero from '@/components/shared/Hero'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Star, ArrowRight, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: `Pricing for DMCs - List Your Company | DMCMY`,
  description: `Free and Premium listing options for Destination Management Companies in Malaysia. Get discovered by corporate clients, MICE planners, and travel agencies. Premium listings from ${siteConfig.currency}${siteConfig.pricing.premium.monthly}/month.`
}

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        title="Pricing for Destination Management Companies"
        subtitle="Choose the plan that fits your business. Start with a free listing or go premium to get more leads"
      />

      {/* Pricing Cards */}
      <section className="container py-16">
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="p-8 relative">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Free Listing</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">{siteConfig.currency}0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">
                Perfect for getting started. Establish your presence on Malaysia's premier DMC directory.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Basic company profile with description</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Contact information (phone, email, website)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Service categories & destination expertise tags</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Listed in search results</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Appear in relevant state/destination pages</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground line-through">Priority placement in listings</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground line-through">Receive broadcast quote requests</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground line-through">Premium badge & gold border</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground line-through">Logo & photo gallery</span>
              </li>
            </ul>

            <Button asChild variant="outline" className="w-full" size="lg">
              <Link href="/submit">Create Free Listing</Link>
            </Button>
          </Card>

          {/* Premium Plan */}
          <Card className="p-8 relative border-2 border-accent ring-2 ring-accent/20 shadow-xl">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1">
              <Star className="h-3 w-3 mr-1" />
              Most Popular
            </Badge>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                Premium Listing
                <Badge variant="secondary" className="text-xs">Recommended</Badge>
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">{siteConfig.currency}{siteConfig.pricing.premium.monthly}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">
                Maximize your visibility and get high-quality leads from corporate clients actively seeking DMC services.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Everything in Free, plus:</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Priority placement</strong> - Appear first in all listings</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Broadcast leads</strong> - Receive quote requests from "Get Free Quotes" button</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Premium badge & gold border</strong> - Stand out visually</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Enhanced profile</strong> - Company logo, cover image, photo gallery</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Featured on homepage</strong> - Eligible for featured company showcase</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Lead analytics</strong> - Dashboard insights on inquiries and profile views</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Certifications showcase</strong> - Display your credentials and memberships</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Cancel anytime - No long-term commitment</span>
              </li>
            </ul>

            <Button asChild className="w-full" size="lg">
              <Link href="/submit">
                Start Premium Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              14-day free trial • Cancel anytime
            </p>
          </Card>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Feature Comparison</h2>

          <div className="max-w-4xl mx-auto bg-card rounded-lg overflow-hidden border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">Free</th>
                  <th className="text-center p-4 font-semibold bg-accent/10">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Company profile & description</td>
                  <td className="text-center p-4"><CheckCircle className="h-5 w-5 text-green-600 inline" /></td>
                  <td className="text-center p-4 bg-accent/5"><CheckCircle className="h-5 w-5 text-green-600 inline" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Contact details (phone, email, website)</td>
                  <td className="text-center p-4"><CheckCircle className="h-5 w-5 text-green-600 inline" /></td>
                  <td className="text-center p-4 bg-accent/5"><CheckCircle className="h-5 w-5 text-green-600 inline" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Service categories & destinations</td>
                  <td className="text-center p-4"><CheckCircle className="h-5 w-5 text-green-600 inline" /></td>
                  <td className="text-center p-4 bg-accent/5"><CheckCircle className="h-5 w-5 text-green-600 inline" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Direct inquiries from company page</td>
                  <td className="text-center p-4"><CheckCircle className="h-5 w-5 text-green-600 inline" /></td>
                  <td className="text-center p-4 bg-accent/5"><CheckCircle className="h-5 w-5 text-green-600 inline" /></td>
                </tr>
                <tr className="border-b bg-muted/30">
                  <td className="p-4"><strong>Priority listing placement</strong></td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4 bg-accent/5"><CheckCircle className="h-5 w-5 text-green-600 inline" /></td>
                </tr>
                <tr className="border-b bg-muted/30">
                  <td className="p-4"><strong>Broadcast lead distribution</strong></td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4 bg-accent/5"><CheckCircle className="h-5 w-5 text-green-600 inline" /></td>
                </tr>
                <tr className="border-b bg-muted/30">
                  <td className="p-4"><strong>Premium badge & gold border</strong></td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4 bg-accent/5"><CheckCircle className="h-5 w-5 text-green-600 inline" /></td>
                </tr>
                <tr className="border-b bg-muted/30">
                  <td className="p-4"><strong>Logo, cover image & gallery</strong></td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4 bg-accent/5"><CheckCircle className="h-5 w-5 text-green-600 inline" /></td>
                </tr>
                <tr className="border-b bg-muted/30">
                  <td className="p-4"><strong>Featured on homepage</strong></td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4 bg-accent/5"><CheckCircle className="h-5 w-5 text-green-600 inline" /></td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-4"><strong>Lead analytics dashboard</strong></td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4 bg-accent/5"><CheckCircle className="h-5 w-5 text-green-600 inline" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex gap-4">
                <HelpCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">How do I get started?</h3>
                  <p className="text-muted-foreground">
                    Simply create your company profile by clicking "Create Free Listing" or "Start Premium Trial". You'll need to sign up for an account,
                    fill in your company details, and submit for approval. Once approved, your listing goes live.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex gap-4">
                <HelpCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">What are "broadcast leads"?</h3>
                  <p className="text-muted-foreground">
                    When users click the "Get Free Quotes" button on our homepage and submit their requirements, all Premium DMCs receive that inquiry
                    via email. This gives you access to warm leads who are actively seeking DMC services, even if they didn't visit your specific profile.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex gap-4">
                <HelpCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Can I upgrade from Free to Premium later?</h3>
                  <p className="text-muted-foreground">
                    Yes! You can upgrade to Premium at any time from your dashboard. Your existing profile information will be preserved, and you'll
                    immediately get access to all Premium features including priority placement and broadcast leads.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex gap-4">
                <HelpCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">
                    We accept all major credit cards (Visa, Mastercard, American Express) through Stripe, our secure payment processor.
                    You'll be billed monthly, and can cancel anytime without penalty.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex gap-4">
                <HelpCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">How many leads can I expect?</h3>
                  <p className="text-muted-foreground">
                    Lead volume depends on your service offerings, location coverage, and how well your profile is optimized. Premium members typically
                    receive 5-15 broadcast inquiries per month, plus direct inquiries from your company profile page. We recommend filling out your
                    profile completely to maximize visibility.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex gap-4">
                <HelpCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Is there a setup fee or contract?</h3>
                  <p className="text-muted-foreground">
                    No setup fee, no long-term contract. Free listings are always free. Premium is a simple month-to-month subscription at {siteConfig.currency}{siteConfig.pricing.premium.monthly}/month.
                    Cancel anytime from your dashboard with no penalties or hidden fees.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-16">
        <div className="container text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Get More Corporate Clients?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join Malaysia's premier DMC directory and start receiving qualified leads today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/submit">Start Free Trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/listings">Browse DMC Listings</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
