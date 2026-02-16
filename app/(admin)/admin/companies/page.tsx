import { Metadata } from 'next'
import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Building2, ExternalLink, Eye, MessageSquare, Star, CheckCircle, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Companies | Admin | DMCMY'
}

export default async function AdminCompaniesPage({
  searchParams
}: {
  searchParams: {
    search?: string
    status?: string
  }
}) {
  // Get all companies using admin client
  let query = supabaseAdmin
    .from('companies_dmc')
    .select('*')
    .order('created_at', { ascending: false })

  if (searchParams.search) {
    query = query.ilike('name', `%${searchParams.search}%`)
  }

  if (searchParams.status === 'published') {
    query = query.eq('is_published', true)
  } else if (searchParams.status === 'draft') {
    query = query.eq('is_published', false)
  } else if (searchParams.status === 'premium') {
    query = query.eq('is_premium', true)
  } else if (searchParams.status === 'claimed') {
    query = query.eq('is_claimed', true)
  }

  const { data: companies, error } = await query.limit(100)

  if (error) {
    console.error('Error fetching companies:', error)
  }

  return (
    <div className="container py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Companies</h1>
        <p className="text-muted-foreground">
          Manage and moderate DMC listings
        </p>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <form className="flex-1" method="get">
            <Input
              name="search"
              type="search"
              placeholder="Search companies..."
              defaultValue={searchParams.search}
              className="w-full"
            />
          </form>

          <div className="flex gap-2">
            <Link href="/admin/companies">
              <Badge variant={!searchParams.status ? 'default' : 'outline'} className="cursor-pointer">
                All
              </Badge>
            </Link>
            <Link href="/admin/companies?status=published">
              <Badge variant={searchParams.status === 'published' ? 'default' : 'outline'} className="cursor-pointer">
                Published
              </Badge>
            </Link>
            <Link href="/admin/companies?status=draft">
              <Badge variant={searchParams.status === 'draft' ? 'default' : 'outline'} className="cursor-pointer">
                Draft
              </Badge>
            </Link>
            <Link href="/admin/companies?status=premium">
              <Badge variant={searchParams.status === 'premium' ? 'default' : 'outline'} className="cursor-pointer">
                Premium
              </Badge>
            </Link>
            <Link href="/admin/companies?status=claimed">
              <Badge variant={searchParams.status === 'claimed' ? 'default' : 'outline'} className="cursor-pointer">
                Claimed
              </Badge>
            </Link>
          </div>
        </div>
      </Card>

      {/* Companies List */}
      {companies && companies.length > 0 ? (
        <div className="space-y-4">
          {companies.map((company: any) => (
            <Card key={company.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Company Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{company.name}</h3>
                    {company.is_premium && (
                      <Badge className="bg-accent text-accent-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                    {company.is_featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                    {company.is_verified && (
                      <Badge className="bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {company.is_claimed && (
                      <Badge variant="outline">Claimed</Badge>
                    )}
                    {!company.is_published && (
                      <Badge variant="destructive">Draft</Badge>
                    )}
                  </div>

                  {company.tagline && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {company.tagline}
                    </p>
                  )}

                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Location:</span>{' '}
                      <span className="font-medium">
                        {company.city && `${company.city}, `}{company.state}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Created:</span>{' '}
                      <span className="font-medium">
                        {new Date(company.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{company.view_count || 0}</span>
                      <span className="text-muted-foreground">views</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{company.inquiry_count || 0}</span>
                      <span className="text-muted-foreground">inquiries</span>
                    </div>
                  </div>

                  {/* Service Categories */}
                  {company.service_categories && company.service_categories.length > 0 && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1.5">
                        {company.service_categories.slice(0, 3).map((cat: string) => (
                          <Badge key={cat} variant="secondary" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                        {company.service_categories.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{company.service_categories.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[140px]">
                  <Button asChild variant="outline" size="sm" className="flex-1 lg:flex-none lg:w-full">
                    <Link href={`/companies/${company.slug}`} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>

                  {!company.is_published && (
                    <form action={`/api/admin/companies/${company.id}/publish`} method="POST" className="flex-1 lg:flex-none lg:w-full">
                      <Button type="submit" variant="default" size="sm" className="w-full">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Publish
                      </Button>
                    </form>
                  )}

                  {company.is_published && (
                    <form action={`/api/admin/companies/${company.id}/unpublish`} method="POST" className="flex-1 lg:flex-none lg:w-full">
                      <Button type="submit" variant="outline" size="sm" className="w-full">
                        <XCircle className="h-4 w-4 mr-2" />
                        Unpublish
                      </Button>
                    </form>
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
            <h3 className="text-xl font-semibold mb-2">No companies found</h3>
            <p className="text-muted-foreground">
              {searchParams.search || searchParams.status
                ? 'Try adjusting your filters'
                : 'Import companies using the CSV Import tool'
              }
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
