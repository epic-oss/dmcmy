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
      >
        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link href="/listings">
            Browse DMC Directory
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </Hero>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-background to-accent/5 py-16 border-y-2 border-accent/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-0">
            <div className="text-center py-6 px-4 border-r border-accent/20 last:border-r-0">
              <div className="text-5xl font-bold bg-gold-gradient bg-clip-text text-transparent mb-3">50+</div>
              <div className="text-foreground/70 font-medium">Verified DMCs</div>
            </div>
            <div className="text-center py-6 px-4 border-r border-accent/20 last:border-r-0">
              <div className="text-5xl font-bold bg-gold-gradient bg-clip-text text-transparent mb-3">16</div>
              <div className="text-foreground/70 font-medium">States Covered</div>
            </div>
            <div className="text-center py-6 px-4 border-r border-accent/20 last:border-r-0">
              <div className="text-5xl font-bold bg-gold-gradient bg-clip-text text-transparent mb-3">100%</div>
              <div className="text-foreground/70 font-medium">Free to Use</div>
            </div>
            <div className="text-center py-6 px-4">
              <div className="text-5xl font-bold bg-gold-gradient bg-clip-text text-transparent mb-3">24h</div>
              <div className="text-foreground/70 font-medium">Quote Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Featured Destination Management Companies
            </h2>
            <div className="h-1 w-32 bg-gold-gradient mx-auto mb-4"></div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Premium DMCs with proven track records in corporate events, MICE, and luxury travel
          </p>
        </div>

        {featured.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-gold-gradient hover:shadow-lg hover:shadow-accent/30 text-primary font-semibold px-8 py-6 text-lg">
                <Link href="/listings">
                  View All DMCs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-8 text-lg">
              Featured companies will appear here soon. Browse our directory to discover top DMCs.
            </p>
            <Button asChild size="lg" className="bg-gold-gradient hover:shadow-lg text-primary font-semibold px-8 py-6">
              <Link href="/listings">Browse All DMCs</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Browse by Service */}
      <section className="section-alt py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Browse by Service Category</h2>
            <div className="h-1 w-32 bg-gold-gradient mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find DMCs specialized in your specific event or travel needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.slice(0, 8).map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group">
                <Card className="p-8 hover:shadow-2xl hover:border-accent hover:-translate-y-1 transition-all duration-300 h-full bg-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  <div className="relative flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-5 group-hover:from-accent/20 group-hover:to-accent/30 transition-all duration-300 group-hover:scale-110">
                      <Star className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
                    </div>
                    <h3 className="font-bold text-base leading-tight group-hover:text-accent transition-colors">
                      {service.name}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/listings" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-lg group">
              View all {serviceCategories.length} service categories
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Destination */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Popular Destinations</h2>
          <div className="h-1 w-32 bg-gold-gradient mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover DMCs with expertise in Malaysia's top event and travel destinations
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {destinations.slice(0, 12).map((dest, index) => {
            const gradients = [
              'from-primary/90 to-primary',
              'from-accent/90 to-accent/70',
              'from-primary/80 to-accent/60',
              'from-primary/70 to-primary/90'
            ]
            const gradient = gradients[index % gradients.length]

            return (
              <Link key={dest.slug} href={`/destinations/${dest.slug}`} className="group">
                <Card className={`p-6 h-32 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center bg-gradient-to-br ${gradient} border-0 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <h3 className="font-bold text-white relative z-10 text-lg group-hover:scale-110 transition-transform duration-300">
                    {dest.name}
                  </h3>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/listings" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-lg group">
            Explore all {destinations.length} destinations
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Why Use a DMC */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a365d 0%, #0f2038 100%)' }}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

        <div className="container max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
              Why Use a Destination Management Company?
            </h2>
            <div className="h-1 w-32 bg-gold-gradient mx-auto mb-6"></div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              DMCs provide local expertise and end-to-end event management to make your corporate events and travel programs seamless
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-5 group">
              <div className="flex-shrink-0">
                <div className="h-14 w-14 rounded-xl bg-gold-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-3 text-white">Local Expertise</h3>
                <p className="text-white/80 leading-relaxed text-lg">
                  DMCs have deep knowledge of Malaysian destinations, venues, suppliers, and cultural nuances to ensure authentic experiences.
                </p>
              </div>
            </div>

            <div className="flex gap-5 group">
              <div className="flex-shrink-0">
                <div className="h-14 w-14 rounded-xl bg-gold-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-7 w-7 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-3 text-white">End-to-End Management</h3>
                <p className="text-white/80 leading-relaxed text-lg">
                  From initial planning to on-ground execution, DMCs handle all logistics including venues, transport, activities, and catering.
                </p>
              </div>
            </div>

            <div className="flex gap-5 group">
              <div className="flex-shrink-0">
                <div className="h-14 w-14 rounded-xl bg-gold-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-7 w-7 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-3 text-white">Cost Savings</h3>
                <p className="text-white/80 leading-relaxed text-lg">
                  Leverage established supplier relationships and bulk buying power for better rates than booking directly.
                </p>
              </div>
            </div>

            <div className="flex gap-5 group">
              <div className="flex-shrink-0">
                <div className="h-14 w-14 rounded-xl bg-gold-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-7 w-7 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-3 text-white">Risk Mitigation</h3>
                <p className="text-white/80 leading-relaxed text-lg">
                  Professional DMCs handle permits, compliance, insurance, and provide on-ground support to manage unexpected situations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-alt py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">How DMCMY Works</h2>
            <div className="h-1 w-32 bg-gold-gradient mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get connected with the right DMCs in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-gradient text-primary font-bold text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="font-bold text-2xl mb-4">Submit Your Requirements</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Tell us about your event type, destination preferences, group size, and budget through our simple form.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-gradient text-primary font-bold text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="font-bold text-2xl mb-4">Receive Multiple Quotes</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Get detailed proposals from multiple verified DMCs within 24-48 hours, tailored to your specific needs.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-gradient text-primary font-bold text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="font-bold text-2xl mb-4">Compare & Choose</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Compare offers, check company profiles and credentials, then select the DMC that best fits your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a365d 0%, #0f2038 100%)' }}>
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-3xl"></div>

        <div className="container text-center max-w-5xl relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
            Ready to Find Your Perfect DMC?
          </h2>
          <div className="h-1 w-32 bg-gold-gradient mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Get free quotes from multiple verified providers in minutes. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button asChild size="lg" className="text-lg px-10 py-7 bg-gold-gradient hover:shadow-2xl hover:shadow-accent/40 hover:scale-105 transition-all duration-300 font-bold text-primary">
              <Link href="/listings">
                Browse DMC Directory
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-10 py-7 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white hover:scale-105 transition-all duration-300 font-semibold backdrop-blur-sm">
              <Link href="/pricing">View Pricing for DMCs</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
