'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useSupabase } from '@/contexts/SupabaseContext'
import { PurchaseRequest, PurchaseResponse } from '@/types/marketplace'

export const usePurchaseItem = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const supabase = useSupabase()

  const purchaseItem = async (itemId: string): Promise<PurchaseResponse | null> => {
    if (!user) {
      setError('You must be logged in to purchase items')
      return null
    }

    try {
      setLoading(true)
      setError(null)

      // Get the current session for auth token
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.access_token) {
        setError('Authentication required')
        return null
      }

      // Call the checkout edge function
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ itemId } as PurchaseRequest)
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Purchase failed')
      }

      const result = await response.json()
      return { success: true, orderId: result.id, message: 'Purchase successful!' }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Purchase failed'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const checkOwnership = async (itemId: string): Promise<boolean> => {
    if (!user) return false

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', user.id)
        .eq('item_id', itemId)
        .eq('status', 'completed')
        .limit(1)

      if (error) throw error
      return data && data.length > 0
    } catch (err) {
      console.error('Error checking ownership:', err)
      return false
    }
  }

  return {
    purchaseItem,
    checkOwnership,
    loading,
    error
  }
}