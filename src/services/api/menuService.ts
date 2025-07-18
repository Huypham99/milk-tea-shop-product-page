import { mockData, mockToppings } from '@/data/mockData'
import { Category, MenuFilters, Product, Topping } from '@/types/menu'

export type ApiResponse<T> = {
  success: boolean
  data: T
  total?: number
  error?: string
  filters?: MenuFilters
  pagination?: {
    currentPage: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}
export type PaginationOptions = {
  page?: number
  limit?: number
}
export class MockMenuService {
  private categories: Category[] = []
  private products: Product[] = []
  private toppings: Topping[] = []
  private dataLoaded = false
  private readonly minDelay = 200
  private readonly maxDelay = 1000

  constructor() {
    this.init()
  }

  /**
   * Initialize the service by loading mock data
   */
  private async init(): Promise<void> {
    if (!this.dataLoaded) {
      try {
        this.categories = mockData.categories
        this.products = mockData.products
        this.toppings = mockToppings
        this.dataLoaded = true
      } catch (error) {
        console.error('Failed to load mock data:', error)
        throw new Error('Failed to initialize menu service')
      }
    }
  }

  /**
   * Ensure data is loaded before API calls
   */
  private async ensureDataLoaded(): Promise<void> {
    if (!this.dataLoaded) {
      await this.init()
    }
  }

  /**
   * Simulate network delay to mimic real API behavior
   */
  private simulateDelay(min = this.minDelay, max = this.maxDelay): Promise<void> {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min
    return new Promise((resolve) => setTimeout(resolve, delay))
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<ApiResponse<Category[]>> {
    await this.ensureDataLoaded()
    await this.simulateDelay()

    try {
      return {
        success: true,
        data: this.categories,
        total: this.categories.length,
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Get category by ID
   */
  async getCategoryById(id: number): Promise<ApiResponse<Category | null>> {
    await this.ensureDataLoaded()
    await this.simulateDelay(100, 300)

    try {
      const category = this.categories.find((c) => c.id === id) || null
      return {
        success: true,
        data: category,
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Get topping by ID
   */
  async getToppingById(id: string): Promise<ApiResponse<Topping | null>> {
    await this.ensureDataLoaded()
    await this.simulateDelay(100, 300)

    try {
      const topping = this.toppings.find((c) => c.id === id) || null
      return {
        success: true,
        data: topping,
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Get products with filtering, sorting, and pagination
   */
  async getProducts(
    filters: MenuFilters = {},
    pagination: PaginationOptions = {},
  ): Promise<ApiResponse<Product[]>> {
    await this.ensureDataLoaded()
    await this.simulateDelay()

    try {
      let filteredProducts = [...this.products]

      // Apply filters
      filteredProducts = this.applyFilters(filteredProducts, filters)

      // Apply sorting
      filteredProducts = this.applySorting(filteredProducts, filters)

      // Calculate pagination
      const { page = 1, limit = 50 } = pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

      // Add category information to products
      const productsWithCategory = paginatedProducts.map((product) => ({
        ...product,
        category: this.categories.find((c) => c.id === product.categoryId),
      }))

      return {
        success: true,
        data: productsWithCategory,
        total: filteredProducts.length,
        filters,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredProducts.length / limit),
          hasNextPage: endIndex < filteredProducts.length,
          hasPreviousPage: page > 1,
        },
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Get product by ID
   */
  async getProductById(id: number): Promise<ApiResponse<Product | null>> {
    await this.ensureDataLoaded()
    await this.simulateDelay(100, 300)

    try {
      const product = this.products.find((p) => p.id === id) || null
      return {
        success: true,
        data: product,
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Get all unique toppings from products
   */
  async getToppings(): Promise<ApiResponse<Topping[]>> {
    await this.ensureDataLoaded()
    await this.simulateDelay()

    try {
      return {
        success: true,
        data: this.toppings,
        total: this.toppings.length,
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Search products by query
   */
  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    await this.ensureDataLoaded()
    await this.simulateDelay()

    try {
      const filteredProducts = this.products.filter((product) => {
        const searchText = query.toLowerCase()

        return (
          product.name.toLowerCase().includes(searchText) ||
          product.description.toLowerCase().includes(searchText) ||
          product.searchKeywords?.some((keyword) => keyword.toLowerCase().includes(searchText)) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(searchText))
        )
      })

      return {
        success: true,
        data: filteredProducts,
        total: filteredProducts.length,
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Apply filters to products
   */
  private applyFilters(products: Product[], filters: MenuFilters): Product[] {
    let filtered = [...products]

    // Category filter
    if (filters.categoryId) {
      filtered = filtered.filter((product) => product.categoryId === filters.categoryId)
    }

    // Toppings filter
    if (filters.toppings && filters.toppings.length > 0) {
      filtered = filtered.filter((product) => {
        return filters.toppings!.some((topping) => product.availableToppings.includes(topping))
      })
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter((product) => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.searchKeywords?.some((keyword) => keyword.toLowerCase().includes(query)) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(query))
        )
      })
    }

    return filtered
  }

  /**
   * Apply sorting to products
   */
  private applySorting(products: Product[], filters: MenuFilters): Product[] {
    if (!filters.sortBy) return products

    const { sortBy, sortOrder = 'asc' } = filters

    return products.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'price':
          comparison = a.price - b.price
          break
        case 'popularity':
          // Sort by isPopular first, then by isNew
          if (a.isPopular && !b.isPopular) comparison = -1
          else if (!a.isPopular && b.isPopular) comparison = 1
          else if (a.isNew && !b.isNew) comparison = -1
          else if (!a.isNew && b.isNew) comparison = 1
          else comparison = 0
          break
      }

      return sortOrder === 'desc' ? -comparison : comparison
    })
  }
}

export const mockMenuService = new MockMenuService()
