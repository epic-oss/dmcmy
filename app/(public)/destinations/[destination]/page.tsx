import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { destinations, siteConfig } from '@/lib/config'
import { getPublishedCompanies } from '@/lib/services/companies'
import Hero from '@/components/shared/Hero'
import CompanyCard from '@/components/shared/CompanyCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MapPin, Palmtree, ArrowRight, CheckCircle, Star } from 'lucide-react'

export async function generateStaticParams() {
  return destinations.map((dest) => ({
    destination: dest.slug
  }))
}

export async function generateMetadata({
  params
}: {
  params: { destination: string }
}): Promise<Metadata> {
  const destinationData = destinations.find((d) => d.slug === params.destination)

  if (!destinationData) {
    return {
      title: 'Destination Not Found | DMCMY'
    }
  }

  const title = `${destinationData.name} DMCs ${siteConfig.currentYear} - Destination Management Companies`
  const description = `Find expert DMCs for ${destinationData.name} events and travel. Specialized Destination Management Companies for corporate retreats, MICE, incentive trips, and luxury experiences in ${destinationData.name}, Malaysia.`

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

export default async function DestinationPage({
  params
}: {
  params: { destination: string }
}) {
  const destinationData = destinations.find((d) => d.slug === params.destination)

  if (!destinationData) {
    notFound()
  }

  const { companies, total } = await getPublishedCompanies({
    destinations: [destinationData.name],
    limit: 50
  })

  return (
    <>
      {/* Hero */}
      <Hero
        title={`${destinationData.name} Destination Management Companies`}
        subtitle={`Expert DMCs specializing in ${destinationData.name} corporate events, MICE, and luxury travel experiences`}
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
              Why Choose {destinationData.name} for Your Corporate Event?
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {destinationData.name} is a premier destination for corporate events, team building retreats, MICE programs, and incentive travel in Malaysia.
              With its unique blend of natural beauty, world-class facilities, and authentic Malaysian culture, {destinationData.name} offers unforgettable
              experiences for groups of all sizes.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-8">
              <Card className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Palmtree className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Unique Venues</h3>
                <p className="text-sm text-muted-foreground">
                  From beachfront resorts to highland retreats, {destinationData.name} offers diverse event spaces.
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Premium Experiences</h3>
                <p className="text-sm text-muted-foreground">
                  Access to exclusive activities, cultural programs, and luxury accommodations.
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Expert DMCs</h3>
                <p className="text-sm text-muted-foreground">
                  Local Destination Management Companies with deep {destinationData.name} expertise.
                </p>
              </Card>
            </div>

            <h3 className="text-2xl font-bold mb-4 mt-12">
              What DMCs in {destinationData.name} Offer
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Destination Management Companies specializing in {destinationData.name} provide:
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Venue Sourcing:</strong> Hotels, resorts, conference centers, and unique outdoor venues</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Team Building Activities:</strong> Adventure sports, cultural workshops, beach olympics, treasure hunts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Transportation:</strong> Airport transfers, coach hire, private transfers throughout {destinationData.name}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>F&B Management:</strong> Gala dinners, themed events, local cuisine experiences, dietary accommodations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Cultural Experiences:</strong> Authentic Malaysian activities and local heritage tours</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>On-Ground Support:</strong> Dedicated event managers and 24/7 emergency assistance</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold mb-4">
              Best Time to Visit {destinationData.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {destinationData.name} is a year-round destination, but timing your event can enhance the experience. DMCs can advise on:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
              <li>Weather patterns and dry seasons for outdoor activities</li>
              <li>Peak tourism periods to avoid (or leverage for networking)</li>
              <li>Local festivals and cultural events to incorporate</li>
              <li>Venue availability and pricing fluctuations</li>
            </ul>

            <h3 className="text-2xl font-bold mb-4">
              Sample {destinationData.name} Itineraries
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Popular event formats in {destinationData.name}:
            </p>

            <div className="space-y-4 mb-8">
              <Card className="p-6">
                <h4 className="font-semibold text-lg mb-2">3-Day Corporate Retreat</h4>
                <p className="text-sm text-muted-foreground">
                  Day 1: Arrival + welcome dinner • Day 2: Strategic planning session + team building activities + gala dinner
                  • Day 3: Leisure activities + departure
                </p>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold text-lg mb-2">2-Day MICE Conference</h4>
                <p className="text-sm text-muted-foreground">
                  Day 1: Conference sessions + networking lunch + exhibition + cocktail reception
                  • Day 2: Workshops + site tours + farewell dinner
                </p>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold text-lg mb-2">5-Day Incentive Trip</h4>
                <p className="text-sm text-muted-foreground">
                  Luxury accommodation + adventure activities + cultural experiences + fine dining + spa treatments + awards ceremony
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Companies List */}
      <section id="companies" className="bg-muted/50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">
            DMCs Specializing in {destinationData.name} ({total})
          </h2>

          {companies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                No DMCs currently specialize in {destinationData.name}. Browse our full directory to find DMCs who can arrange events here.
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
              Plan Your {destinationData.name} Event Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with experienced DMCs who know {destinationData.name} inside out. Get personalized proposals for your corporate event,
              MICE program, or incentive trip.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/#companies">Get Free Quotes</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/listings">Browse All DMCs</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </>
  )
}
