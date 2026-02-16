import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCompanyBySlug, incrementViewCount } from '@/lib/services/companies'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { MapPin, Phone, Mail, Globe, Users, Calendar, Award, CheckCircle, Building2 } from 'lucide-react'
import InquiryModalTrigger from './InquiryModalTrigger'

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)

  if (!company) {
    return {
      title: 'Company Not Found | DMCMY'
    }
  }

  const title = company.meta_title || `${company.name} - Destination Management Company in ${company.state} | DMCMY`
  const description = company.meta_description || company.tagline || `Professional DMC services in ${company.state}, Malaysia. ${company.service_categories?.slice(0, 3).join(', ')}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: company.cover_image_url ? [company.cover_image_url] : company.logo_url ? [company.logo_url] : [],
      type: 'website',
      locale: 'en_MY'
    }
  }
}

export default async function CompanyProfilePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)

  if (!company) {
    notFound()
  }

  // Track view (async, don't await to not block page load)
  incrementViewCount(company.id).catch(() => {})

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image / Header */}
      <div className="relative h-72 md:h-96 bg-gradient-to-br from-primary/10 to-accent/10">
        {company.cover_image_url ? (
          <Image
            src={company.cover_image_url}
            alt={company.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {company.logo_url ? (
              <div className="relative w-64 h-32">
                <Image
                  src={company.logo_url}
                  alt={company.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="text-8xl font-bold text-primary/20">
                {company.name[0]}
              </div>
            )}
          </div>
        )}

        {/* Premium & Featured Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          {company.is_premium && (
            <Badge className="bg-accent text-accent-foreground text-sm px-4 py-1.5 flex items-center gap-2">
              <Award className="h-4 w-4" />
              PREMIUM
            </Badge>
          )}
          {company.is_featured && (
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-sm px-4 py-1.5">
              Featured
            </Badge>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{company.name}</h1>
              {company.tagline && (
                <p className="text-xl text-muted-foreground leading-relaxed">{company.tagline}</p>
              )}
              {company.is_verified && (
                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Verified DMC</span>
                </div>
              )}
            </div>

            {/* About Section */}
            {company.description && (
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-primary" />
                  About {company.name}
                </h2>
                <div className="prose max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                  {company.description}
                </div>
              </section>
            )}

            {/* Services Offered */}
            {company.service_categories && company.service_categories.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Services Offered</h2>
                <div className="flex flex-wrap gap-2">
                  {company.service_categories.map((category) => (
                    <Link
                      key={category}
                      href={`/listings?service=${encodeURIComponent(category)}`}
                    >
                      <Badge
                        variant="secondary"
                        className="text-sm py-1.5 px-3 hover:bg-accent/20 hover:border-accent transition-colors cursor-pointer"
                      >
                        {category}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Destination Expertise */}
            {company.destination_expertise && company.destination_expertise.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Destination Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {company.destination_expertise.map((destination) => (
                    <Link
                      key={destination}
                      href={`/listings?destination=${encodeURIComponent(destination)}`}
                    >
                      <Badge
                        variant="outline"
                        className="text-sm py-1.5 px-3 hover:bg-accent/10 hover:border-accent transition-colors cursor-pointer"
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        {destination}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications & Memberships */}
            {company.certifications && company.certifications.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Certifications & Memberships</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {company.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{cert}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Languages Supported */}
            {company.languages && company.languages.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Languages Supported</h2>
                <div className="flex flex-wrap gap-2">
                  {company.languages.map((language) => (
                    <Badge key={language} variant="outline" className="text-sm">
                      {language}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery */}
            {company.gallery_images && company.gallery_images.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {company.gallery_images.map((imageUrl, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={imageUrl}
                        alt={`${company.name} gallery image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Inquiry Card */}
            <Card className="p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">Get a Quote</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Request a detailed proposal directly from {company.name}
              </p>

              <InquiryModalTrigger
                companyId={company.id}
                companyName={company.name}
              />

              {/* Company Details */}
              <div className="mt-6 pt-6 border-t space-y-4">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Location</div>
                    <div className="text-sm text-muted-foreground">
                      {company.city && `${company.city}, `}{company.state}
                      {company.address && (
                        <div className="mt-1 text-xs">{company.address}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                {company.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Phone</div>
                      <a
                        href={`tel:${company.phone}`}
                        className="text-sm text-accent hover:underline"
                      >
                        {company.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {company.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Email</div>
                      <a
                        href={`mailto:${company.email}`}
                        className="text-sm text-accent hover:underline break-all"
                      >
                        {company.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Website */}
                {company.website_url && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Website</div>
                      <a
                        href={company.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent hover:underline break-all"
                      >
                        Visit Website →
                      </a>
                    </div>
                  </div>
                )}

                {/* Group Size Capacity */}
                {(company.min_group_size || company.max_group_size) && (
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Group Size</div>
                      <div className="text-sm text-muted-foreground">
                        {company.min_group_size && company.max_group_size
                          ? `${company.min_group_size} - ${company.max_group_size} people`
                          : company.min_group_size
                          ? `From ${company.min_group_size} people`
                          : `Up to ${company.max_group_size} people`
                        }
                      </div>
                    </div>
                  </div>
                )}

                {/* Established Year */}
                {company.established_year && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Established</div>
                      <div className="text-sm text-muted-foreground">
                        {company.established_year}
                        {' '}
                        ({new Date().getFullYear() - company.established_year} years in business)
                      </div>
                    </div>
                  </div>
                )}

                {/* Price Tier */}
                {company.price_tier && (
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Price Tier</div>
                      <Badge variant="outline" className="mt-1 capitalize">
                        {company.price_tier}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Other DMCs in the Same State */}
            <Card className="p-6">
              <h3 className="font-semibold mb-3">More DMCs in {company.state}</h3>
              <Link
                href={`/listings?state=${encodeURIComponent(company.state)}`}
                className="text-sm text-accent hover:underline"
              >
                View all DMCs in {company.state} →
              </Link>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
