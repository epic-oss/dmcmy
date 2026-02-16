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
        <Button asChild size="lg" className="bg-gold-gradient hover:shadow-lg hover:shadow-accent/30 text-primary font-bold text-lg px-8 py-6">
          <Link href="/listings">
            Browse DMC Directory
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </Hero>

      {/* Stats Section */}
      <section className="bg-primary py-16 md:py-20 border-y-2 border-accent">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">50+</div>
              <div className="h-1 w-16 bg-gold-gradient mx-auto mb-3"></div>
              <div className="text-white/80 font-medium">Verified DMCs</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">16</div>
              <div className="h-1 w-16 bg-gold-gradient mx-auto mb-3"></div>
              <div className="text-white/80 font-medium">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">100%</div>
              <div className="h-1 w-16 bg-gold-gradient mx-auto mb-3"></div>
              <div className="text-white/80 font-medium">Free to Use</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">24h</div>
              <div className="h-1 w-16 bg-gold-gradient mx-auto mb-3"></div>
              <div className="text-white/80 font-medium">Quote Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16 md:py-20">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Featured Destination Management Companies
            </h2>
            <div className="h-1 w-24 bg-gold-gradient mx-auto mb-4"></div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Premium DMCs with proven track records in corporate events, MICE, and luxury travel
            </p>
          </div>

          {featured.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Button asChild size="lg" className="bg-gold-gradient hover:shadow-lg hover:shadow-accent/30 text-primary font-bold px-8 py-6 text-lg">
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
              <Button asChild size="lg" className="bg-gold-gradient hover:shadow-lg text-primary font-bold px-8 py-6">
                <Link href="/listings">Browse All DMCs</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Browse by Service */}
      <section className="section-alt py-16 md:py-20">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Browse by Service Category</h2>
            <div className="h-1 w-24 bg-gold-gradient mx-auto mb-4"></div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Find DMCs specialized in your specific event or travel needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceCategories.slice(0, 8).map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group">
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300 h-full bg-white border border-border">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm leading-tight">
                      {service.name}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/listings" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold group">
              View all {serviceCategories.length} service categories
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Destination */}
      <section className="py-16 md:py-20">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Popular Destinations</h2>
            <div className="h-1 w-24 bg-gold-gradient mx-auto mb-4"></div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover DMCs with expertise in Malaysia's top event and travel destinations
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {destinations.slice(0, 12).map((dest, index) => {
              const gradients = [
                'from-[#1a365d] to-[#2d4a7c]',
                'from-[#2d4a7c] to-[#1a365d]',
                'from-[#0f2038] to-[#1a365d]',
                'from-[#1a365d] to-[#0f2038]'
              ]
              const gradient = gradients[index % gradients.length]

              return (
                <Link key={dest.slug} href={`/destinations/${dest.slug}`} className="group">
                  <Card className={`p-5 h-28 hover:shadow-lg transition-shadow duration-300 text-center flex items-center justify-center bg-gradient-to-br ${gradient} border-0`}>
                    <h3 className="font-semibold text-white text-base">
                      {dest.name}
                    </h3>
                  </Card>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-8">
            <Link href="/listings" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold group">
              Explore all {destinations.length} destinations
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Use a DMC */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a365d 0%, #0f2038 100%)' }}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

        <div className="container max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">
              Why Use a Destination Management Company?
            </h2>
            <div className="h-1 w-24 bg-gold-gradient mx-auto mb-4"></div>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              DMCs provide local expertise and end-to-end event management to make your corporate events and travel programs seamless
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-lg bg-gold-gradient flex items-center justify-center shadow-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-white">Local Expertise</h3>
                <p className="text-white/80 leading-relaxed">
                  DMCs have deep knowledge of Malaysian destinations, venues, suppliers, and cultural nuances to ensure authentic experiences.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-lg bg-gold-gradient flex items-center justify-center shadow-lg">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-white">End-to-End Management</h3>
                <p className="text-white/80 leading-relaxed">
                  From initial planning to on-ground execution, DMCs handle all logistics including venues, transport, activities, and catering.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-lg bg-gold-gradient flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-white">Cost Savings</h3>
                <p className="text-white/80 leading-relaxed">
                  Leverage established supplier relationships and bulk buying power for better rates than booking directly.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-lg bg-gold-gradient flex items-center justify-center shadow-lg">
                  <Award className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-white">Risk Mitigation</h3>
                <p className="text-white/80 leading-relaxed">
                  Professional DMCs handle permits, compliance, insurance, and provide on-ground support to manage unexpected situations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-alt py-16 md:py-20">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">How DMCMY Works</h2>
            <div className="h-1 w-24 bg-gold-gradient mx-auto mb-4"></div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Get connected with the right DMCs in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-gradient text-primary font-bold text-2xl mb-4 shadow-lg">
                1
              </div>
              <h3 className="font-bold text-xl mb-3">Submit Your Requirements</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tell us about your event type, destination preferences, group size, and budget through our simple form.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-gradient text-primary font-bold text-2xl mb-4 shadow-lg">
                2
              </div>
              <h3 className="font-bold text-xl mb-3">Receive Multiple Quotes</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get detailed proposals from multiple verified DMCs within 24-48 hours, tailored to your specific needs.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-gradient text-primary font-bold text-2xl mb-4 shadow-lg">
                3
              </div>
              <h3 className="font-bold text-xl mb-3">Compare & Choose</h3>
              <p className="text-muted-foreground leading-relaxed">
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
