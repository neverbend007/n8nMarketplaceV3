'use client'
export const dynamic = 'force-dynamic'
import nextDynamic from 'next/dynamic'

const DashboardContent = nextDynamic(() => import('./DashboardContent'), { ssr: false })

export default function DashboardPage() {
  return <DashboardContent />
} 