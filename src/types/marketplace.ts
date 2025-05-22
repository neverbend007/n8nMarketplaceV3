export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: 'user' | 'creator' | 'admin'
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parent_id?: string
  created_at: string
}

export interface Item {
  id: string
  creator_id: string
  title: string
  description?: string
  price: number
  category_id?: string
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
  // Joined data
  creator?: User
  category?: Category
}

export interface Order {
  id: string
  user_id: string
  item_id: string
  status: 'pending' | 'completed' | 'cancelled'
  amount: number
  created_at: string
  updated_at: string
  // Joined data
  item?: Item
  user?: User
}

export interface MarketplaceFilters {
  search?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'newest' | 'oldest' | 'price_asc' | 'price_desc'
  page?: number
  limit?: number
}

export interface MarketplaceResponse {
  items: Item[]
  totalCount: number
  hasNextPage: boolean
  currentPage: number
}

export interface PurchaseRequest {
  itemId: string
}

export interface PurchaseResponse {
  success: boolean
  orderId?: string
  message?: string
} 