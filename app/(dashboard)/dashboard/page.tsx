import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getCompaniesByUserId } from '@/lib/services/companies'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, MessageSquare, Eye, Star, ArrowRight, Plus } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dashboard | DMCMY'
}

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Get user's companies
  const companies = await getCompaniesByUserId(user.id)

  // Calculate totals
  const totalViews = companies.reduce((sum, company) => sum + (company.view_count || 0), 0)
  const totalInquiries = companies.reduce((sum, company) => sum + (company.inquiry_count || 0), 0)
  const premiumCount = companies.filter(c => c.is_premium).length

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your DMC listings.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Companies</p>
              <p className="text-2xl font-bold">{companies.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Star className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Premium</p>
              <p className="text-2xl font-bold">{premiumCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Views</p>
              <p className="text-2xl font-bold">{totalViews}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inquiries</p>
              <p className="text-2xl font-bold">{totalInquiries}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Companies List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Your Companies</h2>
          <Button asChild size="sm">
            <Link href="/submit">
              <Plus className="h-4 w-4 mr-2" />
              Add Company
            </Link>
          </Button>
        </div>

        {companies.length > 0 ? (
          <div className="space-y-4">
            {companies.map((company) => (
              <div
                key={company.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold">{company.name}</h3>
                    {company.is_premium && (
                      <Badge className="bg-accent text-accent-foreground">
                        Premium
                      </Badge>
                    )}
                    {!company.is_published && (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {company.state} • {company.view_count || 0} views • {company.inquiry_count || 0} inquiries
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/companies/${company.slug}`} target="_blank">
                      View
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={`/dashboard/companies/${company.id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No companies yet</h3>
            <p className="text-muted-foreground mb-6">
              Get started by adding your first DMC listing
            </p>
            <Button asChild>
              <Link href="/submit">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Company
              </Link>
            </Button>
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-3">Need more leads?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upgrade to Premium to receive broadcast inquiries and get priority placement in listings.
          </p>
          <Button asChild variant="outline">
            <Link href="/pricing">
              View Pricing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-3">View your inquiries</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Check and respond to quote requests from potential clients.
          </p>
          <Button asChild variant="outline">
            <Link href="/dashboard/inquiries">
              View Inquiries
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}
