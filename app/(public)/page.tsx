import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig, serviceCategories, destinations } from '@/lib/config'
import { getFeaturedCompanies } from '@/lib/services/companies'
import Hero from '@/components/shared/Hero'
import CompanyCard from '@/components/shared/CompanyCard'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Star, Award, Shield, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: `Best Destination Management Companies in Malaysia ${siteConfig.currentYear} | DMCMY`,
  description: 'Compare top DMCs for corporate retreats, MICE events, incentive travel & more. Get free quotes from verified providers across Malaysia.',
  openGraph: {
    title: `${siteConfig.title} - Find Malaysia's Top DMCs`,
    description: siteConfig.description,
    type: 'website',
    locale: 'en_MY',
    siteName: siteConfig.name
  }
}

export default async function HomePage() {
  const featured = await getFeaturedCompanies()

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={`Find Malaysia's Top DMCs in ${siteConfig.currentYear}`}
        subtitle="Connect with verified Destination Management Companies for your corporate events, MICE, and luxury travel experiences"
        size="large"
      >
        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link href="/listings">
            Browse DMC Directory
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </Hero>

      {/* Stats Section */}
      <section className="bg-muted/50 py-12 border-y">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Verified DMCs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">16</div>
              <div className="text-muted-foreground">States Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Free to Use</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24h</div>
              <div className="text-muted-foreground">Quote Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Destination Management Companies</h2>
            <p className="text-lg text-muted-foreground">
              Premium DMCs with proven track records in Malaysia
            </p>
          </div>
        </div>

        {featured.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild size="lg" variant="outline">
                <Link href="/listings">
                  View All DMCs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">
              Featured companies will appear here soon. Browse our directory to discover top DMCs.
            </p>
            <Button asChild size="lg">
              <Link href="/listings">Browse All DMCs</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Browse by Service */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Service Category</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find DMCs specialized in your specific event or travel needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceCategories.slice(0, 8).map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group">
                <Card className="p-6 hover:shadow-lg hover:border-accent transition-all duration-300 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <Star className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                    </div>
                    <h3 className="font-semibold text-sm leading-tight group-hover:text-accent transition-colors">
                      {service.name}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/listings" className="text-accent hover:underline font-medium">
              View all {serviceCategories.length} service categories →
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Destination */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover DMCs with expertise in Malaysia's top event and travel destinations
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {destinations.slice(0, 12).map((dest) => (
            <Link key={dest.slug} href={`/destinations/${dest.slug}`} className="group">
              <Card className="p-5 hover:shadow-lg hover:border-accent transition-all duration-300 text-center h-full flex items-center justify-center">
                <h3 className="font-semibold group-hover:text-accent transition-colors">
                  {dest.name}
                </h3>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/listings" className="text-accent hover:underline font-medium">
            Explore all {destinations.length} destinations →
          </Link>
        </div>
      </section>

      {/* Why Use a DMC */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Use a Destination Management Company?</h2>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              DMCs provide local expertise and end-to-end event management to make your corporate events and travel programs seamless
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Local Expertise</h3>
                <p className="text-primary-foreground/90 leading-relaxed">
                  DMCs have deep knowledge of Malaysian destinations, venues, suppliers, and cultural nuances to ensure authentic experiences.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">End-to-End Management</h3>
                <p className="text-primary-foreground/90 leading-relaxed">
                  From initial planning to on-ground execution, DMCs handle all logistics including venues, transport, activities, and catering.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Cost Savings</h3>
                <p className="text-primary-foreground/90 leading-relaxed">
                  Leverage established supplier relationships and bulk buying power for better rates than booking directly.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Award className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Risk Mitigation</h3>
                <p className="text-primary-foreground/90 leading-relaxed">
                  Professional DMCs handle permits, compliance, insurance, and provide on-ground support to manage unexpected situations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How DMCMY Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get connected with the right DMCs in just a few simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent font-bold text-2xl mb-4">
              1
            </div>
            <h3 className="font-semibold text-xl mb-3">Submit Your Requirements</h3>
            <p className="text-muted-foreground">
              Tell us about your event type, destination preferences, group size, and budget through our simple form.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent font-bold text-2xl mb-4">
              2
            </div>
            <h3 className="font-semibold text-xl mb-3">Receive Multiple Quotes</h3>
            <p className="text-muted-foreground">
              Get detailed proposals from multiple verified DMCs within 24-48 hours, tailored to your specific needs.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent font-bold text-2xl mb-4">
              3
            </div>
            <h3 className="font-semibold text-xl mb-3">Compare & Choose</h3>
            <p className="text-muted-foreground">
              Compare offers, check company profiles and credentials, then select the DMC that best fits your requirements.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-16">
        <div className="container text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect DMC?</h2>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
            Get free quotes from multiple verified providers in minutes. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/listings">Browse DMC Directory</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/pricing">View Pricing for DMCs</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
