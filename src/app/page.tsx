import React from 'react'
import Header from '@/components/Header'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-black via-black to-purple-900/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-purple-primary to-purple-600 text-transparent bg-clip-text mb-6">
            Welcome to N8N Marketplace
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your one-stop destination for automation workflows, tools, and integrations.
            Discover, share, and monetize your automation solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/marketplace" className="btn-primary text-lg px-8 py-3">
              Explore Marketplace
            </Link>
            <Link href="/signup" className="btn-secondary text-lg px-8 py-3">
              Start Creating
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black via-purple-900/10 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* For Users */}
            <div className="card backdrop-blur-sm bg-black/50">
              <div className="h-10 w-10 bg-purple-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-200">For Users</h3>
              <p className="text-gray-400">
                Browse through our marketplace, find the perfect automation solutions,
                and integrate them into your workflow instantly.
              </p>
            </div>

            {/* For Creators */}
            <div className="card backdrop-blur-sm bg-black/50">
              <div className="h-10 w-10 bg-purple-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-200">For Creators</h3>
              <p className="text-gray-400">
                Share your automation expertise, build a following, and earn revenue
                from your custom workflows and integrations.
              </p>
            </div>

            {/* For Business */}
            <div className="card backdrop-blur-sm bg-black/50">
              <div className="h-10 w-10 bg-purple-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-200">For Business</h3>
              <p className="text-gray-400">
                Find enterprise-grade automation solutions, custom integrations,
                and expert support for your business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black via-purple-900/10 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card backdrop-blur-sm bg-black/50">
              <h3 className="text-xl font-semibold mb-4 text-purple-200">Secure Transactions</h3>
              <p className="text-gray-400">
                All transactions are handled through secure payment gateways,
                ensuring your financial information stays safe.
              </p>
            </div>
            <div className="card backdrop-blur-sm bg-black/50">
              <h3 className="text-xl font-semibold mb-4 text-purple-200">Quality Assurance</h3>
              <p className="text-gray-400">
                Every workflow and integration is thoroughly tested and verified
                before being listed on our marketplace.
              </p>
            </div>
            <div className="card backdrop-blur-sm bg-black/50">
              <h3 className="text-xl font-semibold mb-4 text-purple-200">Community Support</h3>
              <p className="text-gray-400">
                Get help from our active community of automation experts and
                fellow users.
              </p>
            </div>
            <div className="card backdrop-blur-sm bg-black/50">
              <h3 className="text-xl font-semibold mb-4 text-purple-200">Regular Updates</h3>
              <p className="text-gray-400">
                Stay up to date with the latest automation trends and feature
                updates from our creators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black via-purple-900/10 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of automation enthusiasts and start exploring
            the possibilities today.
          </p>
          <Link href="/signup" className="btn-primary text-lg px-8 py-3">
            Create Your Account
          </Link>
        </div>
      </section>
    </main>
  )
} 