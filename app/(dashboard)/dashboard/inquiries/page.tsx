import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getCompaniesByUserId } from '@/lib/services/companies'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Mail, Phone, Building2, Users, Calendar, MapPin, DollarSign, AlertCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export const metadata: Metadata = {
  title: 'Inquiries | Dashboard | DMCMY'
}

export default async function InquiriesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Get user's companies
  const companies = await getCompaniesByUserId(user.id)
  const companyIds = companies.map(c => c.id)

  // Get inquiries for user's companies
  const { data: inquiries } = await supabase
    .from('inquiries_dmc')
    .select('*, companies_dmc(name, slug)')
    .in('company_id', companyIds)
    .order('created_at', { ascending: false })
    .limit(50)

  // Also get broadcast inquiries if user has premium companies
  const hasPremium = companies.some(c => c.is_premium)
  let broadcastInquiries: any[] = []

  if (hasPremium) {
    const { data } = await supabase
      .from('inquiries_dmc')
      .select('*')
      .eq('source', 'floating_button')
      .order('created_at', { ascending: false })
      .limit(20)

    broadcastInquiries = data || []
  }

  const allInquiries = [...(inquiries || []), ...broadcastInquiries].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Inquiries</h1>
        <p className="text-muted-foreground">
          Quote requests from potential clients
        </p>
      </div>

      {!hasPremium && (
        <Card className="p-6 mb-6 bg-accent/5 border-accent/20">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Upgrade to Premium for More Leads</h3>
              <p className="text-sm text-muted-foreground">
                Premium members receive broadcast inquiries from the "Get Free Quotes" button on the homepage,
                in addition to direct inquiries from their company page.
              </p>
            </div>
          </div>
        </Card>
      )}

      {allInquiries.length > 0 ? (
        <div className="space-y-6">
          {allInquiries.map((inquiry: any) => {
            const isBroadcast = inquiry.source === 'floating_button'
            const company = inquiry.companies_dmc

            return (
              <Card key={inquiry.id} className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{inquiry.full_name}</h3>
                      {isBroadcast ? (
                        <Badge className="bg-accent text-accent-foreground">
                          Broadcast Lead
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          Direct Inquiry
                        </Badge>
                      )}
                    </div>
                    {!isBroadcast && company && (
                      <p className="text-sm text-muted-foreground">
                        For: <span className="font-medium">{company.name}</span>
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(inquiry.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid sm:grid-cols-2 gap-4 mb-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a href={`mailto:${inquiry.email}`} className="text-sm font-medium text-accent hover:underline break-all">
                        {inquiry.email}
                      </a>
                    </div>
                  </div>

                  {inquiry.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <a href={`tel:${inquiry.phone}`} className="text-sm font-medium text-accent hover:underline">
                          {inquiry.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {inquiry.lead_company && (
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Company</p>
                        <p className="text-sm font-medium">{inquiry.lead_company}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Event Details */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {inquiry.event_type && (
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Event Type</p>
                        <p className="text-sm">{inquiry.event_type}</p>
                      </div>
                    </div>
                  )}

                  {inquiry.group_size && (
                    <div className="flex items-start gap-2">
                      <Users className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Group Size</p>
                        <p className="text-sm">{inquiry.group_size}</p>
                      </div>
                    </div>
                  )}

                  {inquiry.preferred_destination && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Destination</p>
                        <p className="text-sm">{inquiry.preferred_destination}</p>
                      </div>
                    </div>
                  )}

                  {inquiry.preferred_dates && (
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Preferred Dates</p>
                        <p className="text-sm">{inquiry.preferred_dates}</p>
                      </div>
                    </div>
                  )}

                  {inquiry.estimated_budget && (
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Budget</p>
                        <p className="text-sm">{inquiry.estimated_budget}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Special Requirements */}
                {inquiry.special_requirements && (
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Special Requirements</p>
                    <p className="text-sm">{inquiry.special_requirements}</p>
                  </div>
                )}

                {/* Message */}
                {inquiry.message && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Additional Details</p>
                    <p className="text-sm whitespace-pre-line">{inquiry.message}</p>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="p-12">
          <div className="text-center">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No inquiries yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {hasPremium
                ? "You'll receive inquiries here when potential clients request quotes. Make sure your company profile is complete to attract more leads."
                : "You'll receive inquiries here when clients request quotes from your company page. Upgrade to Premium to also receive broadcast leads from the homepage."
              }
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
