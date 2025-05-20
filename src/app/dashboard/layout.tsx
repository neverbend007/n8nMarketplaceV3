'use client'

import React from 'react'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      {/* Dashboard Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-b border-purple-primary/20 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-primary to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-white">N8N</span>
                </div>
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link href="/dashboard" className="nav-link">
                  Overview
                </Link>
                <Link href="/dashboard/workflows" className="nav-link">
                  My Workflows
                </Link>
                <Link href="/dashboard/settings" className="nav-link">
                  Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
} 