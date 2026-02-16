import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, Award } from 'lucide-react'
import { Database } from '@/types/database'

type Company = Database['public']['Tables']['companies_dmc']['Row']

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <Link href={`/companies/${company.slug}`} className="group block h-full">
      <Card className={`overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        company.is_premium ? 'premium-card bg-white' : 'border border-border hover:border-accent/30 bg-white shadow-md'
      }`}>
        {/* Premium Badge */}
        {company.is_premium && (
          <div className="premium-badge text-primary-foreground text-xs font-bold px-4 py-2 text-center tracking-wider flex items-center justify-center gap-2">
            <Award className="h-4 w-4" />
            PREMIUM PARTNER
          </div>
        )}

        {/* Cover Image */}
        <div className="relative h-56 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
          {company.cover_image_url ? (
            <Image
              src={company.cover_image_url}
              alt={company.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              {company.logo_url ? (
                <div className="relative w-32 h-32">
                  <Image
                    src={company.logo_url}
                    alt={company.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              ) : (
                <div className="text-6xl font-bold text-primary/20">
                  {company.name[0]}
                </div>
              )}
            </div>
          )}

          {/* Verified Badge */}
          {company.is_verified && (
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <Star className="h-5 w-5 text-accent fill-accent" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {company.name}
          </h3>

          {company.tagline && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              {company.tagline}
            </p>
          )}

          {/* Location */}
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-2 text-accent flex-shrink-0" />
            <span className="line-clamp-1">
              {company.city ? `${company.city}, ${company.state}` : company.state}
            </span>
          </div>

          {/* Service Categories */}
          {company.service_categories && company.service_categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {company.service_categories.slice(0, 2).map((cat) => (
                <Badge
                  key={cat}
                  variant="secondary"
                  className="text-xs font-medium bg-secondary hover:bg-accent/10 transition-colors"
                >
                  {cat}
                </Badge>
              ))}
              {company.service_categories.length > 2 && (
                <Badge
                  variant="secondary"
                  className="text-xs font-medium bg-accent/10 text-accent-foreground"
                >
                  +{company.service_categories.length - 2} more
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Hover indicator */}
        <div className={`h-1 w-full transition-all duration-300 ${
          company.is_premium
            ? 'bg-gold-gradient'
            : 'bg-accent group-hover:bg-primary'
        }`}></div>
      </Card>
    </Link>
  )
}
