import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, Award } from 'lucide-react'
import { Database } from '@/types/database'
import { cn } from '@/lib/utils/cn'

type Company = Database['public']['Tables']['companies_dmc']['Row']

interface CompanyCardProps {
  company: Company
  className?: string
}

export default function CompanyCard({ company, className }: CompanyCardProps) {
  return (
    <Link href={`/companies/${company.slug}`} className="block group">
      <Card className={cn(
        "overflow-hidden hover:shadow-xl transition-all duration-300 h-full",
        company.is_premium && "border-2 border-accent ring-2 ring-accent/20",
        className
      )}>
        {/* Premium Badge */}
        {company.is_premium && (
          <div className="bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 text-center flex items-center justify-center gap-2">
            <Award className="h-3.5 w-3.5" />
            PREMIUM LISTING
          </div>
        )}

        {/* Cover Image or Logo */}
        <div className="relative h-48 bg-gradient-to-br from-primary/5 to-accent/5">
          {company.cover_image_url ? (
            <Image
              src={company.cover_image_url}
              alt={company.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : company.logo_url ? (
            <div className="w-full h-full flex items-center justify-center p-8">
              <Image
                src={company.logo_url}
                alt={company.name}
                width={160}
                height={80}
                className="object-contain max-h-24"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl font-bold text-primary/20">
                {company.name[0]}
              </span>
            </div>
          )}

          {/* Featured Badge */}
          {company.is_featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm flex items-center gap-1">
                <Star className="h-3 w-3 fill-accent text-accent" />
                Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Company Name */}
          <h3 className="font-bold text-lg mb-1.5 line-clamp-1 group-hover:text-accent transition-colors">
            {company.name}
          </h3>

          {/* Tagline */}
          {company.tagline && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 min-h-[2.5rem]">
              {company.tagline}
            </p>
          )}

          {/* Location */}
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span className="line-clamp-1">
              {company.city ? `${company.city}, ${company.state}` : company.state}
            </span>
          </div>

          {/* Service Categories */}
          {company.service_categories && company.service_categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {company.service_categories.slice(0, 2).map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="text-xs font-medium"
                >
                  {category.length > 20 ? category.slice(0, 20) + '...' : category}
                </Badge>
              ))}
              {company.service_categories.length > 2 && (
                <Badge
                  variant="outline"
                  className="text-xs font-medium text-muted-foreground"
                >
                  +{company.service_categories.length - 2} more
                </Badge>
              )}
            </div>
          )}

          {/* Established Year (if available) */}
          {company.established_year && (
            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
              Established {company.established_year}
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
