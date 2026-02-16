import { z } from 'zod'
import { malaysianStates, serviceCategories, destinations, eventTypes, budgetRanges, priceTiers } from '@/lib/config'

/**
 * Inquiry form validation schema
 * Used for both broadcast and company-specific inquiries
 */
export const inquirySchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  leadCompany: z.string().optional(),
  eventType: z.string().optional(),
  groupSize: z.string().optional(),
  preferredDestination: z.string().optional(),
  preferredDates: z.string().optional(),
  estimatedBudget: z.string().optional(),
  specialRequirements: z.string().optional(),
  message: z.string().optional()
})

export type InquiryFormData = z.infer<typeof inquirySchema>

/**
 * Company profile validation schema
 * Used for creating and editing company listings
 */
export const companyProfileSchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  slug: z.string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .optional(),
  tagline: z.string().max(200, 'Tagline must be 200 characters or less').optional(),
  description: z.string()
    .min(50, 'Description must be at least 50 characters')
    .max(5000, 'Description must be 5000 characters or less'),
  state: z.string().min(1, 'State is required'),
  city: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
  phone: z.string().min(1, 'Phone number is required'),
  websiteUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  serviceCategories: z.array(z.string()).min(1, 'Select at least one service category'),
  destinationExpertise: z.array(z.string()).min(1, 'Select at least one destination'),
  minBudgetMyr: z.number().int().positive().optional(),
  maxBudgetMyr: z.number().int().positive().optional(),
  minGroupSize: z.number().int().positive().optional(),
  maxGroupSize: z.number().int().positive().optional(),
  priceTier: z.enum(['budget', 'mid-range', 'premium', 'luxury']).optional(),
  certifications: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  establishedYear: z.number()
    .int()
    .min(1900, 'Year must be 1900 or later')
    .max(new Date().getFullYear(), 'Year cannot be in the future')
    .optional()
})

export type CompanyProfileFormData = z.infer<typeof companyProfileSchema>

/**
 * Claim request validation schema
 */
export const claimRequestSchema = z.object({
  companyId: z.string().uuid('Invalid company ID'),
  requesterName: z.string().min(2, 'Name must be at least 2 characters'),
  requesterEmail: z.string().email('Invalid email'),
  requesterPhone: z.string().optional(),
  position: z.string().optional(),
  verificationNotes: z.string()
    .min(20, 'Please provide at least 20 characters explaining why you should be able to claim this listing')
    .max(1000, 'Notes must be 1000 characters or less')
})

export type ClaimRequestFormData = z.infer<typeof claimRequestSchema>

/**
 * Submit listing schema (public form for vendors to add themselves)
 */
export const submitListingSchema = z.object({
  name: z.string().min(2, 'Company name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone number is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().optional(),
  websiteUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  description: z.string()
    .min(50, 'Please provide at least 50 characters describing your company')
    .max(2000, 'Description must be 2000 characters or less'),
  serviceCategories: z.array(z.string()).min(1, 'Select at least one service'),
  destinationExpertise: z.array(z.string()).min(1, 'Select at least one destination')
})

export type SubmitListingFormData = z.infer<typeof submitListingSchema>

/**
 * Search query validation
 */
export const searchQuerySchema = z.object({
  query: z.string().min(2, 'Search query must be at least 2 characters').max(100),
  state: z.string().optional(),
  service: z.string().optional(),
  destination: z.string().optional(),
  priceTier: z.enum(['budget', 'mid-range', 'premium', 'luxury']).optional(),
  page: z.number().int().positive().default(1)
})

export type SearchQueryData = z.infer<typeof searchQuerySchema>

/**
 * Helper function to generate slug from company name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
}

/**
 * Helper function to validate Malaysian phone number format
 */
export function isValidMalaysianPhone(phone: string): boolean {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '')

  // Malaysian numbers:
  // Mobile: 01X-XXXX-XXXX (10-11 digits)
  // Landline: 0X-XXXX-XXXX (9-10 digits)
  return digits.length >= 9 && digits.length <= 11 && digits.startsWith('0')
}
