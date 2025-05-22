'use client'

import React, { createContext, useContext } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

type SupabaseContextType = {
  supabase: SupabaseClient
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

// Create client outside component to prevent recreating
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}
if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const supabase = React.useMemo(() => supabaseClient, [])

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context.supabase
}
