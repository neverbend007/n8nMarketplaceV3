import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export type Role = 'user' | 'creator' | 'admin'

export const useRole = (requiredRole?: Role) => {
  const { user, loading } = useAuth() as any & { loading: boolean }

  useEffect(() => {
    if (loading || !requiredRole) return
    if (!user) {
      redirect('/login')
      return
    }
    const userRole: Role = user.user_metadata?.role || 'user'
    const roleHierarchy: Role[] = ['user', 'creator', 'admin']
    const allowed = roleHierarchy.indexOf(userRole) >= roleHierarchy.indexOf(requiredRole)

    if (!allowed) {
      redirect('/login')
    }
  }, [loading, requiredRole, user])

  return { user }
} 