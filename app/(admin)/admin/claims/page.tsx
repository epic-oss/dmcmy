import { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GitPullRequest, CheckCircle, XCircle, Mail, Phone, Building2, User } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export const metadata: Metadata = {
  title: 'Claim Requests | Admin | DMCMY'
}

export default async function ClaimRequestsPage() {
  // Get all claim requests with company and user info
  const { data: claims } = await supabaseAdmin
    .from('claim_requests_dmc')
    .select(`
      *,
      companies_dmc (
        name,
        slug,
        state,
        city
      )
    `)
    .order('created_at', { ascending: false })

  const pendingClaims = claims?.filter(c => c.status === 'pending') || []
  const reviewedClaims = claims?.filter(c => c.status !== 'pending') || []

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Claim Requests</h1>
        <p className="text-muted-foreground">
          Review and approve DMC owners claiming their listings
        </p>
      </div>

      {/* Pending Claims */}
      {pendingClaims.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <GitPullRequest className="h-6 w-6 text-orange-600" />
            Pending Requests ({pendingClaims.length})
          </h2>

          <div className="space-y-4">
            {pendingClaims.map((claim: any) => {
              const company = claim.companies_dmc

              return (
                <Card key={claim.id} className="p-6 border-2 border-orange-200 bg-orange-50/50">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Claim Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold">
                          {company?.name || 'Unknown Company'}
                        </h3>
                        <Badge variant="outline" className="border-orange-600 text-orange-600">
                          Pending Review
                        </Badge>
                      </div>

                      {company && (
                        <p className="text-sm text-muted-foreground mb-4">
                          <Building2 className="h-4 w-4 inline mr-1" />
                          {company.city && `${company.city}, `}{company.state}
                        </p>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Requester Name</p>
                          <p className="font-medium flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {claim.requester_name}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Position</p>
                          <p className="font-medium">{claim.position || 'Not specified'}</p>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Email</p>
                          <a
                            href={`mailto:${claim.requester_email}`}
                            className="text-sm text-accent hover:underline flex items-center gap-2"
                          >
                            <Mail className="h-4 w-4" />
                            {claim.requester_email}
                          </a>
                        </div>

                        {claim.requester_phone && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Phone</p>
                            <a
                              href={`tel:${claim.requester_phone}`}
                              className="text-sm text-accent hover:underline flex items-center gap-2"
                            >
                              <Phone className="h-4 w-4" />
                              {claim.requester_phone}
                            </a>
                          </div>
                        )}
                      </div>

                      {claim.verification_notes && (
                        <div className="p-3 bg-white rounded-md border">
                          <p className="text-xs text-muted-foreground mb-1">Verification Notes</p>
                          <p className="text-sm">{claim.verification_notes}</p>
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground mt-3">
                        Submitted {formatDistanceToNow(new Date(claim.created_at), { addSuffix: true })}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[160px]">
                      <form
                        action={`/api/admin/claims/${claim.id}/approve`}
                        method="POST"
                        className="flex-1 lg:flex-none"
                      >
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </form>

                      <form
                        action={`/api/admin/claims/${claim.id}/reject`}
                        method="POST"
                        className="flex-1 lg:flex-none"
                      >
                        <Button type="submit" variant="destructive" className="w-full">
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </form>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Reviewed Claims */}
      {reviewedClaims.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Reviewed Requests ({reviewedClaims.length})
          </h2>

          <div className="space-y-4">
            {reviewedClaims.map((claim: any) => {
              const company = claim.companies_dmc
              const isApproved = claim.status === 'approved'

              return (
                <Card key={claim.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          {company?.name || 'Unknown Company'}
                        </h3>
                        <Badge variant={isApproved ? 'default' : 'destructive'} className={isApproved ? 'bg-green-600' : ''}>
                          {isApproved ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approved
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1" />
                              Rejected
                            </>
                          )}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Requester: <span className="font-medium">{claim.requester_name}</span> ({claim.requester_email})
                      </p>

                      {claim.rejection_reason && (
                        <p className="text-sm text-destructive mt-2">
                          Reason: {claim.rejection_reason}
                        </p>
                      )}

                      <p className="text-xs text-muted-foreground mt-2">
                        Reviewed {formatDistanceToNow(new Date(claim.reviewed_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!claims || claims.length === 0) && (
        <Card className="p-12">
          <div className="text-center">
            <GitPullRequest className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Claim Requests</h3>
            <p className="text-muted-foreground">
              Claim requests from vendors will appear here for review
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
