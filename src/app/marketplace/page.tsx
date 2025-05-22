'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import ItemCard from '@/components/shared/ItemCard'
import CategoryChips from '@/components/CategoryChips'
import Spinner from '@/components/Spinner'
import { useMarketplaceItems } from '@/hooks/useMarketplaceItems'
import { MarketplaceFilters } from '@/types/marketplace'

const MarketplacePage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '')
  const [debouncedSearch, setDebouncedSearch] = useState(searchInput)
  
  const [filters, setFilters] = useState<MarketplaceFilters>(() => ({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    sortBy: (searchParams.get('sortBy') as any) || 'newest',
    page: parseInt(searchParams.get('page') || '1'),
    limit: 12
  }))

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchInput])

  // Update filters when debounced search changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: debouncedSearch, page: 1 }))
  }, [debouncedSearch])

  // Memoize filters to prevent unnecessary re-renders
  const stableFilters = useMemo(() => filters, [
    filters.search,
    filters.category,
    filters.sortBy,
    filters.page,
    filters.limit
  ])

  const { items, loading, error, totalCount, hasNextPage, currentPage, refetch } = useMarketplaceItems(stableFilters)

  // Ensure we fetch items on marketplace page load
  useEffect(() => {
    refetch()
  }, [refetch])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    
    if (filters.search) params.set('search', filters.search)
    if (filters.category) params.set('category', filters.category)
    if (filters.sortBy && filters.sortBy !== 'newest') params.set('sortBy', filters.sortBy)
    if (filters.page && filters.page > 1) params.set('page', filters.page.toString())
    
    const queryString = params.toString()
    const newUrl = queryString ? `/marketplace?${queryString}` : '/marketplace'
    
    router.replace(newUrl, { scroll: false })
  }, [filters, router])

  const handleSearch = (searchTerm: string) => {
    setSearchInput(searchTerm)
  }

  const handleCategorySelect = (categoryId: string | null) => {
    setFilters(prev => ({ ...prev, category: categoryId || '', page: 1 }))
  }

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy: sortBy as any, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
              Marketplace
            </h1>
            <p className="text-gray-400 text-lg">
              Discover automation workflows, tools, and integrations from our community
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search items..."
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
                className="input w-full pl-10 pr-4"
                tabIndex={0}
                aria-label="Search marketplace items"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            {/* Category Filter */}
            <div className="flex-1">
              <CategoryChips 
                selectedCategory={filters.category}
                onCategorySelect={handleCategorySelect}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-400">Sort by:</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="input text-sm"
                aria-label="Sort items"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Info */}
          {!loading && (
            <div className="mb-6">
              <p className="text-gray-400 text-sm">
                {totalCount} {totalCount === 1 ? 'item' : 'items'} found
                {filters.search && ` for "${filters.search}"`}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && <Spinner />}

          {/* Error State - handle gracefully for empty database */}
          {error && (
            <div className="card text-center py-8">
              <p className="text-gray-300 mb-2">Welcome to the marketplace!</p>
              <p className="text-gray-400">No items have been added yet. Be the first to create something amazing!</p>
            </div>
          )}

          {/* Items Grid */}
          {!loading && !error && (
            <>
              {items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="card text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">No items found</h3>
                  <p className="text-gray-400">
                    {filters.search || filters.category 
                      ? 'Try adjusting your search or filters'
                      : 'Be the first to add an item to the marketplace!'
                    }
                  </p>
                </div>
              )}

              {/* Pagination */}
              {items.length > 0 && (
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  
                  <span className="text-gray-400">
                    Page {currentPage}
                  </span>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasNextPage}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default MarketplacePage