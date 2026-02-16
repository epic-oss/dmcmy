import { Metadata } from 'next'
import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, MessageSquare, GitPullRequest, Users, Star, Eye, ArrowRight, Upload } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin Dashboard | DMCMY'
}

export default async function AdminDashboardPage() {
  // Get stats using admin client (bypasses RLS)
  const { count: totalCompanies } = await supabaseAdmin
    .from('companies_dmc')
    .select('*', { count: 'exact', head: true })

  const { count: publishedCompanies } = await supabaseAdmin
    .from('companies_dmc')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true)

  const { count: premiumCompanies } = await supabaseAdmin
    .from('companies_dmc')
    .select('*', { count: 'exact', head: true })
    .eq('is_premium', true)

  const { count: claimedCompanies } = await supabaseAdmin
    .from('companies_dmc')
    .select('*', { count: 'exact', head: true })
    .eq('is_claimed', true)

  const { count: totalInquiries } = await supabaseAdmin
    .from('inquiries_dmc')
    .select('*', { count: 'exact', head: true })

  const { count: pendingClaims } = await supabaseAdmin
    .from('claim_requests_dmc')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  // Get total views and users
  const { data: viewsData } = await supabaseAdmin
    .from('companies_dmc')
    .select('view_count')

  const totalViews = viewsData?.reduce((sum: number, company: any) => sum + (company.view_count || 0), 0) || 0

  const { count: totalUsers } = await supabaseAdmin
    .from('companies_dmc')
    .select('claimed_by', { count: 'exact', head: true })
    .not('claimed_by', 'is', null)

  return (
    <div className="container py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Platform overview and quick actions
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Companies</p>
              <p className="text-2xl font-bold">{totalCompanies || 0}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {publishedCompanies || 0} published
              </p>
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
              <p className="text-2xl font-bold">{premiumCompanies || 0}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {claimedCompanies || 0} claimed
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inquiries</p>
              <p className="text-2xl font-bold">{totalInquiries || 0}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {totalViews} total views
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <GitPullRequest className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Claims</p>
              <p className="text-2xl font-bold">{pendingClaims || 0}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {totalUsers || 0} users
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <Building2 className="h-10 w-10 text-primary mb-4" />
          <h3 className="font-semibold text-lg mb-2">Manage Companies</h3>
          <p className="text-sm text-muted-foreground mb-4">
            View, edit, approve, and moderate all DMC listings on the platform.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/admin/companies">
              View Companies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Card>

        <Card className="p-6">
          <Upload className="h-10 w-10 text-primary mb-4" />
          <h3 className="font-semibold text-lg mb-2">Import Companies</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Bulk upload DMC companies from CSV files (Outscraper exports supported).
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/admin/import">
              CSV Import Tool
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Card>

        <Card className="p-6">
          <GitPullRequest className="h-10 w-10 text-primary mb-4" />
          <h3 className="font-semibold text-lg mb-2">Claim Requests</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Review and approve DMC owners claiming their company listings.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/admin/claims">
              Review Claims
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Platform Health</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Published Rate</span>
              <span className="text-2xl font-bold text-green-600">
                {totalCompanies ? Math.round((publishedCompanies! / totalCompanies) * 100) : 0}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {publishedCompanies} of {totalCompanies} companies are live
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Premium Rate</span>
              <span className="text-2xl font-bold text-accent">
                {totalCompanies ? Math.round((premiumCompanies! / totalCompanies) * 100) : 0}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {premiumCompanies} premium out of {totalCompanies} total
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Claimed Rate</span>
              <span className="text-2xl font-bold text-blue-600">
                {totalCompanies ? Math.round((claimedCompanies! / totalCompanies) * 100) : 0}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {claimedCompanies} companies claimed by owners
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
