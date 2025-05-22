'use client'

import React from 'react'
import Link from 'next/link'
import { Item } from '@/types/marketplace'
import { formatPrice, formatRelativeTime } from '@/lib/marketplace'

interface ItemCardProps {
  item: Item
  showCreator?: boolean
  className?: string
}

const ItemCard: React.FC<ItemCardProps> = ({ 
  item, 
  showCreator = true, 
  className = '' 
}) => {
  return (
    <Link href={`/item/${item.id}`} className={`group ${className}`}>
      <div className="card group-hover:border-purple-primary/60 transition-all duration-200 group-hover:transform group-hover:scale-105">
        {/* Item Image Placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-purple-900/20 to-purple-600/20 rounded-lg mb-4 flex items-center justify-center">
          <div className="text-purple-300">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>

        {/* Item Details */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-purple-200 group-hover:text-purple-100 transition-colors line-clamp-2">
            {item.title}
          </h3>
          
          {item.description && (
            <p className="text-gray-400 text-sm line-clamp-3">
              {item.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-purple-primary">
              {formatPrice(item.price)}
            </span>
            
            {item.category && (
              <span className="text-xs bg-purple-900/40 text-purple-300 px-2 py-1 rounded-full">
                {item.category.name}
              </span>
            )}
          </div>

          {showCreator && item.creator && (
            <div className="flex items-center justify-between pt-2 border-t border-purple-900/30">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-primary to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {(item.creator.full_name || item.creator.email)[0].toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-400">
                  {item.creator.full_name || item.creator.email.split('@')[0]}
                </span>
              </div>
              
              <span className="text-xs text-gray-500">
                {formatRelativeTime(item.created_at)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ItemCard 