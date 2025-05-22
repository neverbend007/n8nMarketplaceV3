'use client'

import React, { createContext, useContext } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

type SupabaseContextType = {
  supabase: SupabaseClient
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

// Create client with proper build-time guards
const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // During build time, environment variables might not be available
  // Create a mock client or return null to prevent build failures
  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window === 'undefined') {
      // Server-side during build - return a mock client to prevent errors
      return null
    } else {
      // Client-side - this should have the env vars
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
    }
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Create client outside component to prevent recreating, but handle build-time safely
const supabaseClient = createSupabaseClient()

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const supabase = React.useMemo(() => {
    // If we don't have a client (build time), try to create one again
    if (!supabaseClient) {
      const client = createSupabaseClient()
      if (!client) {
        // Still no client - this means we're in build mode, return children without provider
        return null
      }
      return client
    }
    return supabaseClient
  }, [])

  // If no supabase client available (build time), render children without context
  if (!supabase) {
    return <>{children}</>
  }

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    // During build time, context might not be available
    if (typeof window === 'undefined') {
      // Return a mock/null client for server-side rendering
      return null as any
    }
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context.supabase
}
