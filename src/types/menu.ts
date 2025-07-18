export interface Category {
  id: number
  name: string
  description: string
  productCount?: number
}

export interface VariantOption {
  id: string
  name: string
  priceModifier: number
  available: boolean
}

export interface ProductVariant {
  type: 'size' | 'sugar' | 'ice' | 'temperature'
  name: string
  options: VariantOption[]
  required: boolean
  multiSelect: boolean
}

export interface Topping {
  id: string
  name: string
  price: number
  available: boolean
  category?: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  categoryId: number
  image: string
  images?: string[]
  isNew?: boolean
  isPopular?: boolean
  variants: ProductVariant[]
  availableToppings: string[]
  inventory: {
    quantity: number
    status: 'in_stock' | 'low_stock' | 'out_of_stock'
    lowStockThreshold?: number
  }
  details?: {
    calories?: number
    caffeine?: boolean
    allergens?: string[]
    preparationTime?: number
  }
  tags?: string[]
  searchKeywords?: string[]
}

export interface MenuFilters {
  categoryId?: number
  toppings?: string[]
  priceRange?: {
    min: number
    max: number
  }
  searchQuery?: string
  sortBy?: 'name' | 'price' | 'popularity'
  sortOrder?: 'asc' | 'desc'
}
