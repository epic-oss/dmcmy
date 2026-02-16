'use server'

import { createInquiry } from '@/lib/services/inquiries'
import { inquirySchema } from '@/lib/utils/validators'

/**
 * Submit an inquiry (broadcast or company-specific)
 * Called from InquiryModal form
 */
export async function submitInquiry(
  formData: unknown,
  options: {
    source: 'floating_button' | 'company_specific_inquiry'
    companyId?: string
  }
) {
  try {
    // Validate form data
    const validated = inquirySchema.parse(formData)

    // Create inquiry in database and send to Make.com webhook
    const inquiry = await createInquiry({
      source: options.source,
      companyId: options.companyId,
      fullName: validated.fullName,
      email: validated.email,
      phone: validated.phone,
      leadCompany: validated.leadCompany,
      eventType: validated.eventType,
      groupSize: validated.groupSize,
      preferredDestination: validated.preferredDestination,
      preferredDates: validated.preferredDates,
      estimatedBudget: validated.estimatedBudget,
      specialRequirements: validated.specialRequirements,
      message: validated.message
    })

    return {
      success: true,
      inquiryId: inquiry.id
    }
  } catch (error) {
    console.error('Error submitting inquiry:', error)

    // Log full error details for debugging
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      })

      return {
        success: false,
        error: `Submission failed: ${error.message}`
      }
    }

    return {
      success: false,
      error: 'Failed to submit inquiry. Please try again.'
    }
  }
}
