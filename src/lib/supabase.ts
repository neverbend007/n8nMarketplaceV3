// This file contains type definitions for Supabase
// The actual client is now provided via SupabaseContext

export type Profile = {
  id: string
  email: string
  full_name: string
  avatar_url: string
  updated_at: string
}

export type Tables = {
  profiles: Profile
} 