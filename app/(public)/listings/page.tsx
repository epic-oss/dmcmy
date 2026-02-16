import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig, malaysianStates, serviceCategories, destinations } from '@/lib/config'
import { getPublishedCompanies } from '@/lib/services/companies'
import CompanyCard from '@/components/shared/CompanyCard'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Filter, X } from 'lucide-react'

export const metadata: Metadata = {
  title: `DMC Directory - Find Destination Management Companies in Malaysia | DMCMY`,
  description: 'Browse and compare Malaysia\'s top DMCs. Filter by location, service type, and destination expertise.'
}

export default async function ListingsPage({
  searchParams
}: {
  searchParams: {
    state?: string
    service?: string
    destination?: string
    page?: string
  }
}) {
  const page = Number(searchParams.page) || 1
  const limit = 24

  const { companies, total } = await getPublishedCompanies({
    state: searchParams.state,
    serviceCategories: searchParams.service ? [searchParams.service] : undefined,
    destinations: searchParams.destination ? [searchParams.destination] : undefined,
    limit,
    offset: (page - 1) * limit
  })

  const totalPages = Math.ceil(total / limit)

  // Active filters
  const activeFilters = [
    searchParams.state && { type: 'state', value: searchParams.state, label: `State: ${searchParams.state}` },
    searchParams.service && { type: 'service', value: searchParams.service, label: `Service: ${searchParams.service}` },
    searchParams.destination && { type: 'destination', value: searchParams.destination, label: `Destination: ${searchParams.destination}` }
  ].filter(Boolean) as Array<{ type: string; value: string; label: string }>

  // Build filter removal URL
  const buildFilterRemovalUrl = (typeToRemove: string) => {
    const params = new URLSearchParams()
    if (searchParams.state && typeToRemove !== 'state') params.set('state', searchParams.state)
    if (searchParams.service && typeToRemove !== 'service') params.set('service', searchParams.service)
    if (searchParams.destination && typeToRemove !== 'destination') params.set('destination', searchParams.destination)
    return `/listings${params.toString() ? '?' + params.toString() : ''}`
  }

  // Build pagination URL
  const buildPaginationUrl = (pageNum: number) => {
    const params = new URLSearchParams()
    if (searchParams.state) params.set('state', searchParams.state)
    if (searchParams.service) params.set('service', searchParams.service)
    if (searchParams.destination) params.set('destination', searchParams.destination)
    params.set('page', pageNum.toString())
    return `/listings?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Destination Management Companies in Malaysia
          </h1>
          <p className="text-lg text-primary-foreground/90">
            Browse {total} verified DMCs across Malaysia - Filter by state, service, or destination
          </p>
        </div>
      </section>

      <div className="container py-8">
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Active Filters:
            </span>
            {activeFilters.map((filter) => (
              <Link
                key={filter.type}
                href={buildFilterRemovalUrl(filter.type)}
                className="group"
              >
                <Badge
                  variant="secondary"
                  className="pl-3 pr-2 py-1.5 hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
                >
                  {filter.label}
                  <X className="ml-2 h-3 w-3 group-hover:text-destructive" />
                </Badge>
              </Link>
            ))}
            {activeFilters.length > 1 && (
              <Link href="/listings">
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Clear all
                </Button>
              </Link>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <Card className="p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-lg">Filters</h2>
              </div>

              <div className="space-y-6">
                {/* By State */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-foreground">By State</h3>
                  <div className="space-y-1.5 max-h-60 overflow-y-auto">
                    {malaysianStates.map((state) => (
                      <Link
                        key={state.slug}
                        href={`/listings?state=${encodeURIComponent(state.name)}`}
                        className={`block text-sm py-1.5 px-2 rounded hover:bg-accent/50 transition-colors ${
                          searchParams.state === state.name
                            ? 'bg-accent text-accent-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {state.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* By Service */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-foreground">By Service</h3>
                  <div className="space-y-1.5 max-h-60 overflow-y-auto">
                    {serviceCategories.slice(0, 10).map((service) => (
                      <Link
                        key={service.slug}
                        href={`/listings?service=${encodeURIComponent(service.name)}`}
                        className={`block text-sm py-1.5 px-2 rounded hover:bg-accent/50 transition-colors ${
                          searchParams.service === service.name
                            ? 'bg-accent text-accent-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/listings"
                    className="text-xs text-accent hover:underline mt-2 inline-block"
                  >
                    View all services →
                  </Link>
                </div>

                {/* By Destination */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-foreground">By Destination</h3>
                  <div className="space-y-1.5 max-h-60 overflow-y-auto">
                    {destinations.slice(0, 10).map((dest) => (
                      <Link
                        key={dest.slug}
                        href={`/listings?destination=${encodeURIComponent(dest.name)}`}
                        className={`block text-sm py-1.5 px-2 rounded hover:bg-accent/50 transition-colors ${
                          searchParams.destination === dest.name
                            ? 'bg-accent text-accent-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {dest.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/listings"
                    className="text-xs text-accent hover:underline mt-2 inline-block"
                  >
                    View all destinations →
                  </Link>
                </div>
              </div>
            </Card>
          </aside>

          {/* Results */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">
                  Showing{' '}
                  <span className="font-semibold text-foreground">
                    {companies.length > 0 ? (page - 1) * limit + 1 : 0}
                  </span>
                  {' '}-{' '}
                  <span className="font-semibold text-foreground">
                    {Math.min(page * limit, total)}
                  </span>
                  {' '}of{' '}
                  <span className="font-semibold text-foreground">{total}</span>
                  {' '}companies
                </p>
              </div>
            </div>

            {/* Companies Grid */}
            {companies.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {companies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex items-center gap-2">
                      {/* Previous Button */}
                      {page > 1 && (
                        <Link href={buildPaginationUrl(page - 1)}>
                          <Button variant="outline" size="sm">
                            Previous
                          </Button>
                        </Link>
                      )}

                      {/* Page Numbers */}
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                          let pageNum: number

                          if (totalPages <= 7) {
                            pageNum = i + 1
                          } else if (page <= 4) {
                            pageNum = i + 1
                          } else if (page >= totalPages - 3) {
                            pageNum = totalPages - 6 + i
                          } else {
                            pageNum = page - 3 + i
                          }

                          const isCurrentPage = pageNum === page

                          return (
                            <Link key={i} href={buildPaginationUrl(pageNum)}>
                              <Button
                                variant={isCurrentPage ? 'default' : 'outline'}
                                size="sm"
                                className={`min-w-[40px] ${isCurrentPage ? 'pointer-events-none' : ''}`}
                              >
                                {pageNum}
                              </Button>
                            </Link>
                          )
                        })}
                      </div>

                      {/* Next Button */}
                      {page < totalPages && (
                        <Link href={buildPaginationUrl(page + 1)}>
                          <Button variant="outline" size="sm">
                            Next
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <Filter className="h-10 w-10 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">No DMCs found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  No destination management companies match your current filters. Try adjusting your search criteria.
                </p>
                <Link href="/listings">
                  <Button>Clear all filters</Button>
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
