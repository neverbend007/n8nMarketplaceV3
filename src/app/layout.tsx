import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SupabaseProvider } from '@/contexts/SupabaseContext'
import { AuthProvider } from '@/contexts/AuthContext'
import ClientProvider from '@/components/ClientProvider'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'N8N Marketplace',
  description: 'Your one-stop marketplace for automation workflows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <SupabaseProvider>
          <AuthProvider>
            <ClientProvider>
              <Layout>
                {children}
              </Layout>
            </ClientProvider>
          </AuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
} 