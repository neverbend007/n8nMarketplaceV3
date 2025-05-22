'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSupabase } from '@/contexts/SupabaseContext'
import { Item, MarketplaceFilters, MarketplaceResponse } from '@/types/marketplace'
import { getSortConfig, getPaginationOffset } from '@/lib/marketplace'

const DEFAULT_LIMIT = 12

export const useMarketplaceItems = (filters: MarketplaceFilters = {}) => {
  const [data, setData] = useState<MarketplaceResponse>({
    items: [],
    totalCount: 0,
    hasNextPage: false,
    currentPage: 1
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = useSupabase()

  // Memoize filters to prevent unnecessary re-fetches
  const stableFilters = useMemo(() => filters, [
    filters.search,
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.sortBy,
    filters.page,
    filters.limit
  ])

  const fetchItems = useCallback(async () => {
    // Don't fetch if supabase client is not available (build time)
    if (!supabase) {
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const { 
        search, 
        category, 
        minPrice, 
        maxPrice, 
        sortBy = 'newest', 
        page = 1, 
        limit = DEFAULT_LIMIT 
      } = stableFilters
      
      // Build the query
      let query = supabase
        .from('items')
        .select(`
          *,
          creator:users!items_creator_id_fkey(id, full_name, email),
          category:categories!items_category_id_fkey(id, name, slug)
        `, { count: 'exact' })
        .eq('status', 'published')
      
      // Apply search filter
      if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
      }
      
      // Apply category filter
      if (category) {
        query = query.eq('category_id', category)
      }
      
      // Apply price filters
      if (minPrice !== undefined) {
        query = query.gte('price', minPrice)
      }
      if (maxPrice !== undefined) {
        query = query.lte('price', maxPrice)
      }
      
      // Apply sorting
      const { column, ascending } = getSortConfig(sortBy)
      query = query.order(column, { ascending })
      
      // Apply pagination
      const offset = getPaginationOffset(page, limit)
      query = query.range(offset, offset + limit - 1)
      
      const { data: items, error: fetchError, count } = await query
      
      if (fetchError) throw fetchError
      
      const totalCount = count || 0
      const totalPages = Math.ceil(totalCount / limit)
      
      setData({
        items: items || [],
        totalCount,
        hasNextPage: page < totalPages,
        currentPage: page
      })
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch items')
    } finally {
      setLoading(false)
    }
  }, [stableFilters, supabase])

  useEffect(() => {
    // Only fetch when explicitly needed - prevents database spam
    const shouldFetch = stableFilters.search || 
                       stableFilters.category || 
                       (stableFilters.page && stableFilters.page > 1)
    
    if (shouldFetch) {
      fetchItems()
    }
  }, [fetchItems, stableFilters.search, stableFilters.category, stableFilters.page])

  return { 
    ...data, 
    loading, 
    error, 
    refetch: fetchItems 
  }
} 