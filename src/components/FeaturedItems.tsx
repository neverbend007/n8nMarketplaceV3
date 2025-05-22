'use client'

import React from 'react'

interface FeaturedItemsProps {
  title?: string
  limit?: number
  sortBy?: 'newest' | 'oldest' | 'price_asc' | 'price_desc'
}

const FeaturedItems: React.FC<FeaturedItemsProps> = ({
  title = 'Featured Items'
}) => {
  // Don't show featured items by default to prevent database spam
  // This can be enabled later when there's actual data
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
        {title}
      </h2>
      <div className="card">
        <p className="text-gray-400 text-center py-8">
          Featured items will appear here once content is added to the marketplace.
        </p>
      </div>
    </div>
  )
}

export default FeaturedItems 