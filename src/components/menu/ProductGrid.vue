<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="loading" class="grid gap-6" :class="gridClasses">
      <ProductCardSkeleton v-for="i in skeletonCount" :key="i" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle class="w-8 h-8 text-red-500" />
      </div>
      <p class="text-gray-700 font-medium mb-2">Có lỗi xảy ra</p>
      <p class="text-gray-500 text-sm mb-4">{{ error }}</p>
      <button @click="$emit('retry')"
        class="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm">
        Thử lại
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="products.length === 0" class="text-center py-12">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Coffee class="w-8 h-8 text-gray-400" />
      </div>
      <p class="text-gray-700 font-medium mb-2">Không tìm thấy sản phẩm</p>
      <p class="text-gray-500 text-sm mb-4">{{ emptyMessage || 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm' }}</p>
    </div>

    <!-- Products Grid -->
    <div v-else class="grid gap-6" :class="gridClasses">
      <ProductCard v-for="product in products" :key="product.id" :product="product" :show-details="showDetails"
        @click="handleProductClick(product)" />
    </div>

    <!-- Load More Button -->
    <div v-if="hasMore" class="text-center pt-8">
      <button @click="$emit('load-more')" :disabled="loadingMore"
        class="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500">
        <template v-if="loadingMore">
          <Loader2 class="w-4 h-4 mr-2 animate-spin" />
          Đang tải...
        </template>
        <template v-else>
          Xem thêm sản phẩm
        </template>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  AlertTriangle,
  Coffee,
  Loader2
} from 'lucide-vue-next'
import type { Product } from '@/types/menu'
import ProductCard from './ProductCard.vue'
import ProductCardSkeleton from '../skeleton/ProductCardSkeleton.vue'

type Props = {
  products: Product[]
  loading?: boolean
  error?: string
  emptyMessage?: string
  showDescription?: boolean
  showDetails?: boolean
  gridColumns?: 2 | 3 | 4
  hasMore?: boolean
  loadingMore?: boolean
  skeletonCount?: number
}

interface Emits {
  (e: 'product-click', product: Product): void
  (e: 'retry'): void
  (e: 'clear-filters'): void
  (e: 'load-more'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: '',
  emptyMessage: '',
  showDescription: true,
  showDetails: true,
  gridColumns: 4,
  hasMore: false,
  loadingMore: false,
  skeletonCount: 8
})

const emit = defineEmits<Emits>()

// Computed
const gridClasses = computed(() => {
  const baseClasses = 'grid gap-6'
  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return `${baseClasses} ${columnClasses[props.gridColumns]}`
})

// Methods
const handleProductClick = (product: Product) => {
  emit('product-click', product)
}
</script>
