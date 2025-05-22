'use client'

// Force dynamic rendering since we use Supabase
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import ItemCard from '@/components/shared/ItemCard'
import Spinner from '@/components/Spinner'
import { useItemDetail } from '@/hooks/useItemDetail'
import { useMarketplaceItems } from '@/hooks/useMarketplaceItems'
import { usePurchaseItem } from '@/hooks/usePurchaseItem'
import { useAuth } from '@/contexts/AuthContext'
import { formatPrice, formatRelativeTime } from '@/lib/marketplace'

const ItemDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const itemId = params.id as string
  const { user } = useAuth()
  
  const { item, loading, error } = useItemDetail(itemId)
  const { purchaseItem, checkOwnership, loading: purchaseLoading, error: purchaseError } = usePurchaseItem()
  const [isOwned, setIsOwned] = useState(false)
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)

  // Fetch related items (same category)
  const { items: relatedItems } = useMarketplaceItems({
    category: item?.category_id,
    limit: 4,
    sortBy: 'newest'
  })

  // Check if user owns this item
  useEffect(() => {
    const checkUserOwnership = async () => {
      if (user && item) {
        const owned = await checkOwnership(item.id)
        setIsOwned(owned)
      }
    }
    checkUserOwnership()
  }, [user, item, checkOwnership])

  const handlePurchase = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    if (!item) return

    const result = await purchaseItem(item.id)
    if (result?.success) {
      setPurchaseSuccess(true)
      setIsOwned(true)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black">
        <Header />
        <div className="pt-20 px-4">
          <div className="max-w-7xl mx-auto">
            <Spinner />
          </div>
        </div>
      </main>
    )
  }

  if (error || !item) {
    return (
      <main className="min-h-screen bg-black">
        <Header />
        <div className="pt-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="card text-center py-12">
              <h1 className="text-2xl font-bold text-red-400 mb-4">
                {error || 'Item not found'}
              </h1>
              <p className="text-gray-400 mb-6">
                This item may have been removed or doesn't exist.
              </p>
              <Link href="/marketplace" className="btn-primary">
                Back to Marketplace
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const filteredRelatedItems = relatedItems.filter(relatedItem => relatedItem.id !== item.id)

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <div className="flex items-center space-x-2 text-gray-400">
              <Link href="/marketplace" className="hover:text-purple-200 transition-colors">
                Marketplace
              </Link>
              <span>→</span>
              {item.category && (
                <>
                  <Link 
                    href={`/marketplace?category=${item.category.id}`}
                    className="hover:text-purple-200 transition-colors"
                  >
                    {item.category.name}
                  </Link>
                  <span>→</span>
                </>
              )}
              <span className="text-purple-200">{item.title}</span>
            </div>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Item Image */}
            <div className="space-y-4">
              <div className="w-full h-96 bg-gradient-to-br from-purple-900/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                <div className="text-purple-300">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Item Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-purple-200 mb-4">
                  {item.title}
                </h1>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-purple-primary">
                    {formatPrice(item.price)}
                  </span>
                  
                  {item.category && (
                    <span className="bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full text-sm">
                      {item.category.name}
                    </span>
                  )}
                </div>

                {item.description && (
                  <div className="prose prose-invert max-w-none mb-6">
                    <p className="text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Creator Info */}
              {item.creator && (
                <div className="card">
                  <h3 className="text-lg font-semibold text-purple-200 mb-3">Created by</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-primary to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {(item.creator.full_name || item.creator.email)[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-purple-200">
                        {item.creator.full_name || item.creator.email.split('@')[0]}
                      </p>
                      <p className="text-sm text-gray-400">
                        Created {formatRelativeTime(item.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Purchase Section */}
              <div className="card">
                {purchaseSuccess && (
                  <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 mb-4">
                    <p className="text-green-400 font-medium">Purchase successful! 🎉</p>
                    <p className="text-green-300 text-sm">You now own this item.</p>
                  </div>
                )}

                {purchaseError && (
                  <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 mb-4">
                    <p className="text-red-400 font-medium">Purchase failed</p>
                    <p className="text-red-300 text-sm">{purchaseError}</p>
                  </div>
                )}

                {isOwned ? (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center space-x-2 text-green-400 mb-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium">You own this item</span>
                    </div>
                    <p className="text-gray-400 text-sm">Access your purchased items in your dashboard</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button
                      onClick={handlePurchase}
                      disabled={purchaseLoading}
                      className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={`Purchase ${item.title} for ${formatPrice(item.price)}`}
                    >
                      {purchaseLoading ? 'Processing...' : `Buy Now - ${formatPrice(item.price)}`}
                    </button>
                    
                    {!user && (
                      <p className="text-sm text-gray-400 text-center">
                        <Link href="/login" className="text-purple-200 hover:text-purple-100">
                          Sign in
                        </Link> to purchase this item
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Items */}
          {filteredRelatedItems.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-purple-200 mb-8">Related Items</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredRelatedItems.slice(0, 4).map((relatedItem) => (
                  <ItemCard key={relatedItem.id} item={relatedItem} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}

export default ItemDetailPage 