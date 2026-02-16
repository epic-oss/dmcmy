import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getCompaniesByUserId } from '@/lib/services/companies'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, Plus, Eye, MessageSquare, ExternalLink, Edit } from 'lucide-react'

export const metadata: Metadata = {
  title: 'My Companies | Dashboard | DMCMY'
}

export default async function MyCompaniesPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const companies = await getCompaniesByUserId(user.id)

  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Companies</h1>
          <p className="text-muted-foreground">
            Manage your DMC listings and view performance
          </p>
        </div>
        <Button asChild>
          <Link href="/submit">
            <Plus className="h-4 w-4 mr-2" />
            Add Company
          </Link>
        </Button>
      </div>

      {companies.length > 0 ? (
        <div className="grid gap-6">
          {companies.map((company) => (
            <Card key={company.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Company Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h2 className="text-2xl font-bold">{company.name}</h2>
                    {company.is_premium && (
                      <Badge className="bg-accent text-accent-foreground">Premium</Badge>
                    )}
                    {company.is_featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                    {!company.is_published && (
                      <Badge variant="outline">Draft</Badge>
                    )}
                    {company.is_verified && (
                      <Badge className="bg-green-600">Verified</Badge>
                    )}
                  </div>

                  {company.tagline && (
                    <p className="text-muted-foreground mb-4">{company.tagline}</p>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {company.city && `${company.city}, `}{company.state}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Status</p>
                      <p className="text-sm text-muted-foreground">
                        {company.is_published ? 'Published' : 'Draft'}
                        {company.is_premium && company.premium_expires_at && (
                          <span> • Premium until {new Date(company.premium_expires_at).toLocaleDateString()}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{company.view_count || 0}</span>
                      <span className="text-muted-foreground">views</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{company.inquiry_count || 0}</span>
                      <span className="text-muted-foreground">inquiries</span>
                    </div>
                  </div>

                  {/* Service Categories */}
                  {company.service_categories && company.service_categories.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Services</p>
                      <div className="flex flex-wrap gap-1.5">
                        {company.service_categories.slice(0, 4).map((cat) => (
                          <Badge key={cat} variant="secondary" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                        {company.service_categories.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{company.service_categories.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[140px]">
                  <Button asChild className="flex-1 lg:flex-none lg:w-full" size="sm">
                    <Link href={`/dashboard/companies/${company.id}/edit`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 lg:flex-none lg:w-full" size="sm">
                    <Link href={`/companies/${company.slug}`} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  {!company.is_premium && (
                    <Button asChild variant="outline" className="flex-1 lg:flex-none lg:w-full" size="sm">
                      <Link href="/pricing">
                        Upgrade
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12">
          <div className="text-center">
            <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No companies yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start by adding your DMC company to get discovered by corporate clients looking for destination management services in Malaysia.
            </p>
            <Button asChild size="lg">
              <Link href="/submit">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Company
              </Link>
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
