import { format, formatDistance, formatRelative } from 'date-fns'

/**
 * Format currency in Malaysian Ringgit
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Format budget range
 */
export function formatBudgetRange(min?: number | null, max?: number | null): string {
  if (!min && !max) return 'Budget varies'
  if (min && max) return `${formatCurrency(min)} - ${formatCurrency(max)}`
  if (min) return `From ${formatCurrency(min)}`
  if (max) return `Up to ${formatCurrency(max)}`
  return 'Budget varies'
}

/**
 * Format group size range
 */
export function formatGroupSize(min?: number | null, max?: number | null): string {
  if (!min && !max) return 'Any group size'
  if (min && max) return `${min}-${max} people`
  if (min) return `From ${min} people`
  if (max) return `Up to ${max} people`
  return 'Any group size'
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  return format(new Date(date), 'MMM d, yyyy')
}

/**
 * Format datetime to readable string
 */
export function formatDateTime(date: string | Date): string {
  return format(new Date(date), 'MMM d, yyyy h:mm a')
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
  return formatDistance(new Date(date), new Date(), { addSuffix: true })
}

/**
 * Format phone number to Malaysian format
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '')

  // Format as 01X-XXXX-XXXX for mobile or 0X-XXXX-XXXX for landline
  if (digits.length === 10) {
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`
  } else if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  }

  return phone // Return original if format doesn't match
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Format array as comma-separated list with "and" for last item
 */
export function formatList(items: string[]): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`

  const allButLast = items.slice(0, -1).join(', ')
  const last = items[items.length - 1]
  return `${allButLast}, and ${last}`
}

/**
 * Pluralize a word based on count
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return singular
  return plural || `${singular}s`
}

/**
 * Format count with label (e.g., "5 companies")
 */
export function formatCount(count: number, singular: string, plural?: string): string {
  return `${count} ${pluralize(count, singular, plural)}`
}

/**
 * Convert text to title case
 */
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Extract initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
