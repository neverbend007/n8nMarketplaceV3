import { MarketplaceFilters } from '@/types/marketplace'

/**
 * Format price to currency string
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

/**
 * Generate URL-friendly slug from title
 */
export const generateItemSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Build Supabase query string from filters
 */
export const buildMarketplaceQuery = (filters: MarketplaceFilters) => {
  const { search, category, minPrice, maxPrice, sortBy } = filters
  
  let query = `status.eq.published`
  
  if (search) {
    query += `,or(title.ilike.%${search}%,description.ilike.%${search}%)`
  }
  
  if (category) {
    query += `,category_id.eq.${category}`
  }
  
  if (minPrice !== undefined) {
    query += `,price.gte.${minPrice}`
  }
  
  if (maxPrice !== undefined) {
    query += `,price.lte.${maxPrice}`
  }
  
  return query
}

/**
 * Get sort column and order from sortBy value
 */
export const getSortConfig = (sortBy?: string) => {
  switch (sortBy) {
    case 'oldest':
      return { column: 'created_at', ascending: true }
    case 'price_asc':
      return { column: 'price', ascending: true }
    case 'price_desc':
      return { column: 'price', ascending: false }
    case 'newest':
    default:
      return { column: 'created_at', ascending: false }
  }
}

/**
 * Calculate pagination offset
 */
export const getPaginationOffset = (page: number, limit: number): number => {
  return (page - 1) * limit
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  
  return date.toLocaleDateString()
}

/**
 * Validate price input
 */
export const validatePrice = (price: string): { isValid: boolean; value?: number } => {
  const numericPrice = parseFloat(price)
  
  if (isNaN(numericPrice) || numericPrice < 0) {
    return { isValid: false }
  }
  
  return { isValid: true, value: numericPrice }
} 