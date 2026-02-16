import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { malaysianStates, siteConfig } from '@/lib/config'
import { getPublishedCompanies } from '@/lib/services/companies'
import Hero from '@/components/shared/Hero'
import CompanyCard from '@/components/shared/CompanyCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MapPin, Building2, ArrowRight, CheckCircle } from 'lucide-react'

export async function generateStaticParams() {
  return malaysianStates.map((state) => ({
    state: state.slug
  }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ state: string }>
}): Promise<Metadata> {
  const { state } = await params
  const stateData = malaysianStates.find((s) => s.slug === state)

  if (!stateData) {
    return {
      title: 'State Not Found | DMCMY'
    }
  }

  const title = `Best DMCs in ${stateData.name} ${siteConfig.currentYear} - Destination Management Companies`
  const description = `Find top-rated Destination Management Companies in ${stateData.name}. Compare verified DMCs for corporate events, MICE, incentive travel, team building, and luxury experiences in ${stateData.name}, Malaysia.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_MY'
    }
  }
}

export default async function LocationPage({
  params
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const stateData = malaysianStates.find((s) => s.slug === state)

  if (!stateData) {
    notFound()
  }

  const { companies, total } = await getPublishedCompanies({
    state: stateData.name,
    limit: 50
  })

  return (
    <>
      {/* Hero */}
      <Hero
        title={`Destination Management Companies in ${stateData.name}`}
        subtitle={`Connect with ${total} verified DMC${total !== 1 ? 's' : ''} specializing in ${stateData.name} events and experiences`}
        size="default"
      >
        <Button asChild size="lg">
          <Link href="#companies">
            View DMCs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </Hero>

      {/* Introduction Section */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold mb-6">
              Why Choose a DMC in {stateData.name}?
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {stateData.name} is one of Malaysia's premier destinations for corporate events, MICE (Meetings, Incentives, Conferences, and Exhibitions),
              team building activities, and luxury travel experiences. Working with a local Destination Management Company (DMC) in {stateData.name} ensures
              you get the best venues, authentic local experiences, and seamless event execution.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Local Expertise</h3>
                    <p className="text-sm text-muted-foreground">
                      DMCs in {stateData.name} have deep knowledge of local venues, suppliers, attractions, and cultural considerations.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Venue Connections</h3>
                    <p className="text-sm text-muted-foreground">
                      Access to the best hotels, conference centers, unique event spaces, and off-the-beaten-path locations.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">End-to-End Planning</h3>
                    <p className="text-sm text-muted-foreground">
                      From airport transfers to gala dinners, DMCs handle every aspect of your event logistics.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Cost Efficiency</h3>
                    <p className="text-sm text-muted-foreground">
                      Leverage bulk rates and established supplier relationships for better pricing than booking direct.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <h3 className="text-2xl font-bold mb-4 mt-12">
              Popular Events in {stateData.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Destination Management Companies in {stateData.name} specialize in organizing:
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Corporate Retreats:</strong> Multi-day team building and strategic planning sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>MICE Events:</strong> International conferences, trade shows, and exhibitions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Incentive Travel:</strong> Reward trips for top-performing employees and partners</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Team Building Programs:</strong> Outdoor adventures, cultural experiences, and workshops</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Gala Dinners & Award Ceremonies:</strong> Elegant corporate celebrations</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold mb-4">
              How to Choose the Right DMC in {stateData.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When selecting a Destination Management Company in {stateData.name}, consider:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-8">
              <li><strong>Experience:</strong> Look for DMCs with proven track records in your event type</li>
              <li><strong>Local Knowledge:</strong> Ensure they have deep expertise in {stateData.name} venues and suppliers</li>
              <li><strong>Service Range:</strong> Check if they offer all services you need (transport, accommodation, activities)</li>
              <li><strong>Client References:</strong> Request testimonials from past corporate clients</li>
              <li><strong>Budget Transparency:</strong> Choose DMCs that provide detailed breakdowns and clear pricing</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Companies List */}
      <section id="companies" className="bg-muted/50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">
            DMCs in {stateData.name} ({total})
          </h2>

          {companies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">
                No DMCs currently listed in {stateData.name}. Check back soon or browse our full directory.
              </p>
              <Button asChild>
                <Link href="/listings">Browse All DMCs</Link>
              </Button>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-accent/20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Plan Your Event in {stateData.name}?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get free quotes from multiple verified DMCs in {stateData.name}. Compare proposals and choose the best fit for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/listings">Browse All DMCs</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#companies">Get Free Quotes</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </>
  )
}
