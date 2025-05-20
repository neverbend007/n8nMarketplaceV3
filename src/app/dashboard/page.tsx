'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="card">
        <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
          Welcome back, {user?.email?.split('@')[0]}!
        </h1>
        <p className="text-gray-400">
          Manage your workflows, check analytics, and explore new automation possibilities.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="text-lg font-semibold text-purple-200 mb-2">Active Workflows</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-purple-200 mb-2">Total Executions</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-purple-200 mb-2">Success Rate</h3>
          <p className="text-3xl font-bold">0%</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-purple-200">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/dashboard/workflows/new" className="btn-primary text-center">
            Create New Workflow
          </Link>
          <Link href="/marketplace" className="btn-secondary text-center">
            Browse Marketplace
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-purple-200">Recent Activity</h2>
        <div className="text-gray-400 text-center py-8">
          No recent activity to display.
        </div>
      </div>
    </div>
  )
} 