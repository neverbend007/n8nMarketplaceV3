'use client'

import React from 'react'
import Link from 'next/link'
import { useCategories } from '@/hooks/useCategories'

interface CategoryChipsProps {
  selectedCategory?: string
  onCategorySelect?: (categoryId: string | null) => void
  showAsLinks?: boolean
  linkPrefix?: string
}

const CategoryChips: React.FC<CategoryChipsProps> = ({
  selectedCategory,
  onCategorySelect,
  showAsLinks = false,
  linkPrefix = '/marketplace'
}) => {
  const { categories, loading, error } = useCategories()

  const handleCategoryClick = (categoryId: string | null) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId)
    }
  }

  if (loading) {
    return (
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-shrink-0 h-8 w-24 bg-purple-900/20 rounded-full animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    console.warn('Failed to load categories:', error)
    // Just show the "All" chip if categories fail to load
    return (
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium bg-purple-primary text-white">
          All
        </div>
      </div>
    )
  }

  const renderChip = (id: string | null, name: string, isSelected: boolean) => {
    const chipClasses = `
      flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
      ${isSelected 
        ? 'bg-purple-primary text-white' 
        : 'bg-purple-900/30 text-purple-200 hover:bg-purple-900/50 hover:text-purple-100'
      }
    `

    if (showAsLinks) {
      const href = id ? `${linkPrefix}?category=${id}` : linkPrefix
      return (
        <Link 
          key={id || 'all'} 
          href={href}
          className={chipClasses}
        >
          {name}
        </Link>
      )
    }

    return (
      <button
        key={id || 'all'}
        onClick={() => handleCategoryClick(id)}
        className={chipClasses}
        tabIndex={0}
        aria-label={`Filter by ${name}`}
      >
        {name}
      </button>
    )
  }

  return (
    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
      {/* All Categories chip */}
      {renderChip(null, 'All', !selectedCategory)}
      
      {/* Individual category chips */}
      {categories.map((category) => 
        renderChip(
          category.id, 
          category.name, 
          selectedCategory === category.id
        )
      )}
    </div>
  )
}

export default CategoryChips