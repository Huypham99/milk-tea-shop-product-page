import { Category, MenuFilters, Product, Topping } from '@/types/menu'
import { computed, reactive, watch, readonly } from 'vue'
import { mockMenuService, PaginationOptions, ApiResponse } from '../services/api/menuService'

type UseMenuOptions = {
  autoLoad?: boolean
  defaultFilters?: MenuFilters
  defaultPagination?: PaginationOptions
}

type UseMenuState = {
  categories: Category[]
  products: Product[]
  toppings: Topping[]
  selectedCategory: number | undefined
  filters: MenuFilters
  pagination: PaginationOptions
  loading: {
    categories: boolean
    products: boolean
    toppings: boolean
  }
  error: {
    categories: string | null
    products: string | null
    toppings: string | null
  }
  meta: {
    totalProducts: number
    totalPages: number
    currentPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

export function useMenu(options: UseMenuOptions = {}) {
  const {
    autoLoad = true,
    defaultFilters = {},
    defaultPagination = { page: 1, limit: 50 },
  } = options

  // Reactive state
  const state = reactive<UseMenuState>({
    categories: [],
    products: [],
    toppings: [],
    selectedCategory: 1,
    filters: { ...defaultFilters },
    pagination: { ...defaultPagination },
    loading: {
      categories: false,
      products: false,
      toppings: false,
    },
    error: {
      categories: null,
      products: null,
      toppings: null,
    },
    meta: {
      totalProducts: 0,
      totalPages: 0,
      currentPage: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  })

  // Computed properties
  const isLoadingProduct = computed(() => state.loading.products)

  const isLoadingCategory = computed(() => state.loading.categories)

  const isLoadingTopping = computed(() => state.loading.toppings)

  const hasError = computed(
    () => state.error.categories || state.error.products || state.error.toppings,
  )

  const filteredProductsCount = computed(() => state.products.length)

  const hasActiveFilters = computed(() => {
    return !!(
      state.filters.categoryId ||
      (state.filters.toppings && state.filters.toppings.length > 0) ||
      state.filters.priceRange ||
      state.filters.searchQuery
    )
  })

  // Methods
  const loadCategories = async (): Promise<void> => {
    state.loading.categories = true
    state.error.categories = null

    try {
      const response: ApiResponse<Category[]> = await mockMenuService.getCategories()

      if (response.success) {
        state.categories = response.data
      } else {
        state.error.categories = response.error || 'Failed to load categories'
      }
    } catch (error) {
      state.error.categories = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      state.loading.categories = false
    }
  }

  const loadProducts = async (refresh = false): Promise<void> => {
    state.loading.products = true
    state.error.products = null

    try {
      const response: ApiResponse<Product[]> = await mockMenuService.getProducts(
        state.filters,
        state.pagination,
      )

      if (response.success) {
        if (refresh || state.pagination.page === 1) {
          state.products = response.data
        } else {
          // Append for pagination
          state.products.push(...response.data)
        }

        // Update meta information
        state.meta.totalProducts = response.total || 0
        state.meta.currentPage = response.pagination?.currentPage || 1
        state.meta.totalPages = response.pagination?.totalPages || 0
        state.meta.hasNextPage = response.pagination?.hasNextPage || false
        state.meta.hasPreviousPage = response.pagination?.hasPreviousPage || false
      } else {
        state.error.products = response.error || 'Failed to load products'
      }
    } catch (error) {
      state.error.products = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      state.loading.products = false
    }
  }

  const loadToppings = async (): Promise<void> => {
    state.loading.toppings = true
    state.error.toppings = null

    try {
      const response: ApiResponse<Topping[]> = await mockMenuService.getToppings()

      if (response.success) {
        state.toppings = response.data
      } else {
        state.error.toppings = response.error || 'Failed to load toppings'
      }
    } catch (error) {
      state.error.toppings = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      state.loading.toppings = false
    }
  }

  const selectCategory = async (categoryId: number | undefined): Promise<void> => {
    state.filters.categoryId = categoryId
    state.pagination.page = 1

    // Update selected category
    state.selectedCategory = categoryId

    await loadProducts(true)
  }

  const updateFilters = async (newFilters: Partial<MenuFilters>): Promise<void> => {
    state.filters = { ...state.filters, ...newFilters }
    state.pagination.page = 1
    await loadProducts(true)
  }

  const updateToppingsFilter = async (toppings: string[]): Promise<void> => {
    state.filters.toppings = toppings
    state.pagination.page = 1
    await loadProducts(true)
  }

  const searchProducts = async (query: string): Promise<void> => {
    state.filters.searchQuery = query
    state.pagination.page = 1
    await loadProducts(true)
  }

  const sortProducts = async (
    sortBy: MenuFilters['sortBy'],
    sortOrder: MenuFilters['sortOrder'] = 'asc',
  ): Promise<void> => {
    state.filters.sortBy = sortBy
    state.filters.sortOrder = sortOrder
    state.pagination.page = 1
    await loadProducts(true)
  }

  const clearFilters = async (): Promise<void> => {
    state.filters = { ...defaultFilters }
    state.pagination.page = 1
    state.selectedCategory = undefined
    await loadProducts(true)
  }

  const loadMore = async (): Promise<void> => {
    if (state.meta.hasNextPage && !state.loading.products) {
      state.pagination.page = (state.pagination.page || 1) + 1
      await loadProducts(false)
    }
  }

  const refresh = async (): Promise<void> => {
    state.pagination.page = 1
    await Promise.all([loadCategories(), loadProducts(true), loadToppings()])
  }

  const getProductById = async (id: number): Promise<Product | null> => {
    try {
      const response: ApiResponse<Product | null> = await mockMenuService.getProductById(id)
      return response.success ? response.data : null
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  }

  const getCategoryById = async (id: number): Promise<Category | null> => {
    try {
      const response: ApiResponse<Category | null> = await mockMenuService.getCategoryById(id)
      return response.success ? response.data : null
    } catch (error) {
      console.error('Error fetching category:', error)
      return null
    }
  }

  const getToppingById = async (id: string): Promise<Topping | null> => {
    try {
      const response: ApiResponse<Topping | null> = await mockMenuService.getToppingById(id)
      return response.success ? response.data : null
    } catch (error) {
      console.error('Error fetching category:', error)
      return null
    }
  }

  // Watch for filter changes to update product count in categories
  watch(
    () => state.products,
    () => {
      // Update product count for each category based on current filters
      state.categories.forEach((category) => {
        const productCount = state.products.filter((p) => p.categoryId === category.id).length
        category.productCount = productCount
      })
    },
  )

  // Initialize data on composable creation
  if (autoLoad) {
    refresh()
  }

  return {
    state: readonly(state),

    // Computed
    isLoadingProduct,
    isLoadingCategory,
    isLoadingTopping,
    hasError,
    filteredProductsCount,
    hasActiveFilters,

    // Methods
    loadCategories,
    loadProducts,
    loadToppings,
    selectCategory,
    updateFilters,
    updateToppingsFilter,
    searchProducts,
    sortProducts,
    clearFilters,
    loadMore,
    refresh,
    getProductById,
    getToppingById,
    getCategoryById,
  }
}

export type { Category, Product, MenuFilters, PaginationOptions, UseMenuOptions, UseMenuState }
