'use client'
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRole } from '@/hooks/useRole'
import Link from 'next/link'

const DashboardContentInner = () => {
  useRole('user')
  const { user } = useAuth()
  return (
    <div className="space-y-8">
      <div className="card">
        <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
          Welcome back, {user?.email?.split('@')[0]}!
        </h1>
        <p className="text-gray-400">
          Manage your workflows, check analytics, and explore new automation possibilities.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="text-lg font-semibold text-purple-200 mb-2">Active Workflows</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-purple-200 mb-2">Revenue</h3>
          <p className="text-3xl font-bold">$0</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-purple-200 mb-2">Integrations</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  )
}

export default function DashboardContent() {
  return <DashboardContentInner />
} 