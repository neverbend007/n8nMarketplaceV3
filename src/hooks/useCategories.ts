'use client'

import { useState, useEffect } from 'react'
import { useSupabase } from '@/contexts/SupabaseContext'
import { Category } from '@/types/marketplace'

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = useSupabase()

  useEffect(() => {
    // Don't fetch if supabase client is not available (build time)
    if (!supabase) {
      return
    }

    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const { data, error: fetchError } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true })
        
        if (fetchError) throw fetchError
        
        setCategories(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [supabase])

  return { categories, loading, error }
} 