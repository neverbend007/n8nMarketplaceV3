'use client'

import { useState, useEffect } from 'react'
import { useSupabase } from '@/contexts/SupabaseContext'
import { Item } from '@/types/marketplace'

export const useItemDetail = (itemId: string) => {
  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = useSupabase()

  useEffect(() => {
    const fetchItem = async () => {
      if (!itemId) return
      
      try {
        setLoading(true)
        setError(null)
        
        const { data, error: fetchError } = await supabase
          .from('items')
          .select(`
            *,
            creator:users!items_creator_id_fkey(id, full_name, email),
            category:categories!items_category_id_fkey(id, name, slug)
          `)
          .eq('id', itemId)
          .eq('status', 'published')
          .single()
        
        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            setError('Item not found')
          } else {
            throw fetchError
          }
        } else {
          setItem(data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch item')
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [itemId, supabase])

  return { item, loading, error }
} 