import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { serviceCategories, siteConfig } from '@/lib/config'
import { getPublishedCompanies } from '@/lib/services/companies'
import Hero from '@/components/shared/Hero'
import CompanyCard from '@/components/shared/CompanyCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Briefcase, ArrowRight, CheckCircle, Users, TrendingUp } from 'lucide-react'

export async function generateStaticParams() {
  return serviceCategories.map((service) => ({
    service: service.slug
  }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ service: string }>
}): Promise<Metadata> {
  const { service } = await params
  const serviceData = serviceCategories.find((s) => s.slug === service)

  if (!serviceData) {
    return {
      title: 'Service Not Found | DMCMY'
    }
  }

  const title = `${serviceData.name} DMCs in Malaysia ${siteConfig.currentYear} | DMCMY`
  const description = `Find specialized Destination Management Companies for ${serviceData.name} in Malaysia. Compare expert DMCs offering ${serviceData.name.toLowerCase()} services across Malaysia.`

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

export default async function ServicePage({
  params
}: {
  params: Promise<{ service: string }>
}) {
  const { service } = await params
  const serviceData = serviceCategories.find((s) => s.slug === service)

  if (!serviceData) {
    notFound()
  }

  const { companies, total } = await getPublishedCompanies({
    serviceCategories: [serviceData.name],
    limit: 50
  })

  return (
    <>
      {/* Hero */}
      <Hero
        title={`${serviceData.name} in Malaysia`}
        subtitle={`Connect with ${total} expert DMC${total !== 1 ? 's' : ''} specializing in ${serviceData.name.toLowerCase()} across Malaysia`}
        size="default"
      >
        <Button asChild size="lg">
          <Link href="#companies">
            View Specialist DMCs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </Hero>

      {/* Introduction Section */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold mb-6">
              Expert {serviceData.name} Services in Malaysia
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Malaysia's Destination Management Companies specialize in delivering world-class {serviceData.name.toLowerCase()} experiences.
              Whether you're planning a small executive retreat or a large-scale international event, the right DMC brings local expertise,
              established supplier networks, and end-to-end project management to ensure success.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-8">
              <Card className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Specialized Expertise</h3>
                <p className="text-sm text-muted-foreground">
                  DMCs with proven track records in {serviceData.name.toLowerCase()}
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Tailored Solutions</h3>
                <p className="text-sm text-muted-foreground">
                  Custom programs designed for your specific objectives and budget
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Measurable Results</h3>
                <p className="text-sm text-muted-foreground">
                  Professional execution with clear KPIs and post-event reporting
                </p>
              </Card>
            </div>

            <h3 className="text-2xl font-bold mb-4 mt-12">
              What to Expect from {serviceData.name} DMCs
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Professional Destination Management Companies offering {serviceData.name.toLowerCase()} in Malaysia typically provide:
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Initial Consultation:</strong> Understanding your objectives, budget, group size, and preferences</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Venue Selection:</strong> Recommending and securing the perfect locations for your event</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Program Design:</strong> Creating engaging itineraries and activities aligned with your goals</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Logistics Management:</strong> Coordinating transportation, accommodation, meals, and equipment</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>On-Site Execution:</strong> Dedicated event managers ensuring seamless delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Post-Event Support:</strong> Feedback collection, reporting, and continuous improvement</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold mb-4">
              Popular Destinations for {serviceData.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              DMCs organize {serviceData.name.toLowerCase()} across Malaysia's top destinations:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Urban Hubs</h4>
                <p className="text-sm text-muted-foreground">
                  Kuala Lumpur, Penang, Johor Bahru - Modern facilities, excellent connectivity, world-class hotels
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Beach Resorts</h4>
                <p className="text-sm text-muted-foreground">
                  Langkawi, Sabah, Redang - Tropical settings, team building activities, relaxation
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Highland Retreats</h4>
                <p className="text-sm text-muted-foreground">
                  Cameron Highlands, Genting, Fraser's Hill - Cool climate, peaceful ambiance, focused environments
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Cultural Destinations</h4>
                <p className="text-sm text-muted-foreground">
                  Melaka, Ipoh, Kuching - Heritage sites, authentic experiences, unique venues
                </p>
              </Card>
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Budget Considerations
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {serviceData.name} budgets in Malaysia typically range from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
              <li><strong>Small groups (10-30 pax):</strong> RM 20,000 - RM 100,000</li>
              <li><strong>Medium groups (30-100 pax):</strong> RM 100,000 - RM 300,000</li>
              <li><strong>Large groups (100-500+ pax):</strong> RM 300,000 - RM 2,000,000+</li>
            </ul>
            <p className="text-sm text-muted-foreground italic mb-8">
              Note: Actual costs depend on duration, venue choice, activities, accommodation level, and season. DMCs can work within various budgets.
            </p>

            <h3 className="text-2xl font-bold mb-4">
              How to Choose the Right DMC
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When selecting a DMC for {serviceData.name.toLowerCase()}, evaluate:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-8">
              <li><strong>Relevant Experience:</strong> Past events similar to yours (industry, size, format)</li>
              <li><strong>Destination Knowledge:</strong> Deep expertise in your chosen Malaysian location</li>
              <li><strong>Service Portfolio:</strong> Full-service capabilities vs. specialized offerings</li>
              <li><strong>Client Testimonials:</strong> References from corporate clients in your industry</li>
              <li><strong>Transparent Pricing:</strong> Detailed breakdowns and clear terms</li>
              <li><strong>Crisis Management:</strong> Contingency planning and problem-solving track record</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Companies List */}
      <section id="companies" className="bg-muted/50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">
            DMCs Specializing in {serviceData.name} ({total})
          </h2>

          {companies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                No DMCs currently list {serviceData.name.toLowerCase()} as a specialty. Browse our full directory to find suitable providers.
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
              Ready to Plan Your {serviceData.name}?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get free, no-obligation quotes from specialized DMCs. Compare proposals, check credentials, and choose the perfect partner
              for your {serviceData.name.toLowerCase()} in Malaysia.
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
