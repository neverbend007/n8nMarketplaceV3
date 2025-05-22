import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ErrorBoundary from './ErrorBoundary'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
      <Footer />
    </div>
  </ErrorBoundary>
)

export default Layout; 