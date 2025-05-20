'use client'
export const dynamic = 'force-dynamic'
import nextDynamic from 'next/dynamic'

const LoginContent = nextDynamic(() => import('./LoginContent'), { ssr: false })

export default function LoginPage() {
  return <LoginContent />
} 