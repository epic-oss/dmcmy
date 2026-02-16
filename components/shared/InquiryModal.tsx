'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { submitInquiry } from '@/app/actions/inquiries'
import { eventTypes, budgetRanges, destinations } from '@/lib/config'
import { CheckCircle, Loader2, Send, Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils/cn'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
  source: 'floating_button' | 'company_specific_inquiry'
  companyId?: string
  companyName?: string
}

export default function InquiryModal({
  isOpen,
  onClose,
  source,
  companyId,
  companyName
}: InquiryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    leadCompany: '',
    eventType: '',
    groupSize: '',
    preferredDestination: '',
    preferredDates: '',
    estimatedBudget: '',
    specialRequirements: '',
    message: ''
  })

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await submitInquiry(formData, { source, companyId })

      if (result.success) {
        setIsSuccess(true)
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose()
          // Reset form
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            leadCompany: '',
            eventType: '',
            groupSize: '',
            preferredDestination: '',
            preferredDates: '',
            estimatedBudget: '',
            specialRequirements: '',
            message: ''
          })
          setSelectedDate(undefined)
          setIsSuccess(false)
        }, 2500)
      } else {
        setError(result.error || 'Failed to submit inquiry')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {source === 'floating_button'
              ? 'Get Free Quotes from Multiple DMCs'
              : `Request Quote from ${companyName}`
            }
          </DialogTitle>
          <DialogDescription>
            {source === 'floating_button'
              ? 'Fill out the form below and receive quotes from verified DMCs in Malaysia.'
              : `Connect directly with ${companyName} for your event needs.`
            }
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Inquiry Submitted!</h3>
            <p className="text-muted-foreground">
              {source === 'floating_button'
                ? "You'll receive quotes from multiple DMCs shortly via email."
                : `${companyName} will contact you soon with a detailed quote.`
              }
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Contact Information</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="john@company.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+60 12-345-6789"
                  />
                </div>

                <div>
                  <Label htmlFor="leadCompany">Your Company</Label>
                  <Input
                    id="leadCompany"
                    value={formData.leadCompany}
                    onChange={(e) => handleChange('leadCompany', e.target.value)}
                    placeholder="Company name"
                  />
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Event Details</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventType">Event Type</Label>
                  <Select value={formData.eventType} onValueChange={(value) => handleChange('eventType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="groupSize">Group Size</Label>
                  <Input
                    id="groupSize"
                    value={formData.groupSize}
                    onChange={(e) => handleChange('groupSize', e.target.value)}
                    placeholder="e.g., 50 people"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferredDestination">Preferred Destination</Label>
                  <Select value={formData.preferredDestination} onValueChange={(value) => handleChange('preferredDestination', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((dest) => (
                        <SelectItem key={dest.slug} value={dest.name}>
                          {dest.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Preferred Dates</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date)
                          handleChange('preferredDates', date ? format(date, 'PPP') : '')
                        }}
                        defaultMonth={selectedDate}
                        initialFocus
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="estimatedBudget">Estimated Budget</Label>
                <Select value={formData.estimatedBudget} onValueChange={(value) => handleChange('estimatedBudget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="specialRequirements">Special Requirements</Label>
                <Input
                  id="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={(e) => handleChange('specialRequirements', e.target.value)}
                  placeholder="Dietary restrictions, accessibility needs, etc."
                />
              </div>

              <div>
                <Label htmlFor="message">Additional Details</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={4}
                  placeholder="Tell us more about your event requirements..."
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting Inquiry...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Submit Inquiry
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By submitting, you agree to be contacted by {source === 'floating_button' ? 'verified DMCs' : companyName} regarding your inquiry.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
