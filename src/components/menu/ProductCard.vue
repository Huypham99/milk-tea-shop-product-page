<template>
  <div
    class="bg-white rounded-xl shadow-card overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1 border-2 border-gray-200 group"
    @click="handleProductClick"
  >
    <!-- Product Image -->
    <div class="relative overflow-hidden bg-gray-100 rounded-t-xl">
      <div class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 bg-gray-100">
        <!-- Image placeholder - you can replace this with actual image -->
      </div>

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col space-y-1">
        <span
          v-if="product.isNew"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 w-fit"
        >
          Mới
        </span>
        <span
          v-if="product.isPopular"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 w-fit"
        >
          Phổ biến
        </span>
        <span
          v-if="product.originalPrice && product.originalPrice > product.price"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 w-fit"
        >
          Giảm giá
        </span>
      </div>

      <!-- Stock Status -->
      <div
        v-if="product.inventory.status === 'out_of_stock'"
        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <span class="text-white font-medium">Hết hàng</span>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <!-- Product Name -->
      <h3 class="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
        {{ product.name }}
      </h3>

      <!-- Price -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="text-lsm font-semibold text-gray-600">
            {{ formatPrice(product.price) }}
          </span>
          <span
            v-if="product.originalPrice && product.originalPrice > product.price"
            class="text-sm text-gray-500 line-through"
          >
            {{ formatPrice(product.originalPrice) }}
          </span>
        </div>
      </div>

      <!-- Stock Status -->
      <div class="flex items-center space-x-1 my-3">
        <div
          class="w-2 h-2 rounded-full"
          :class="getStockStatusClass(product.inventory.status)"
        ></div>
        <span class="text-xs text-gray-500">
          {{ getStockStatusText(product.inventory.status) }}
        </span>
      </div>

      <!-- Product Details -->
      <div v-if="showDetails" class="flex items-center justify-between text-xs text-gray-500">
        <span v-if="product.details?.preparationTime">
          <Clock class="w-3 h-3 inline mr-1" />
          {{ product.details.preparationTime }}p
        </span>
        <span v-if="product.details?.calories">
          <Zap class="w-3 h-3 inline mr-1" />
          {{ product.details.calories }} cal
        </span>
        <span v-if="product.details?.caffeine">
          <Coffee class="w-3 h-3 inline mr-1" />
          Caffeine
        </span>
      </div>

      <!-- Action Button -->
      <button
        @click.stop="handleProductClick"
        class="w-full mt-4 py-2 px-4 bg-violet-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        :disabled="product.inventory.status === 'out_of_stock'"
      >
        {{ product.inventory.status === 'out_of_stock' ? 'Hết hàng' : 'Chọn món' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Clock, Zap, Coffee } from 'lucide-vue-next'
import type { Product } from '@/types/menu'
import { formatPrice } from '@/utils/formatters'

interface Props {
  product: Product
  showDetails?: boolean
}

interface Emits {
  (e: 'click', product: Product): void
}

const props = withDefaults(defineProps<Props>(), {
  showDetails: true
})

const emit = defineEmits<Emits>()

// Methods
const handleProductClick = () => {
  if (props.product.inventory.status !== 'out_of_stock') {
    emit('click', props.product)
  }
}

const getStockStatusClass = (status: string) => {
  switch (status) {
    case 'in_stock':
      return 'bg-green-500'
    case 'low_stock':
      return 'bg-yellow-500'
    case 'out_of_stock':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

const getStockStatusText = (status: string) => {
  switch (status) {
    case 'in_stock':
      return 'Còn hàng'
    case 'low_stock':
      return 'Sắp hết'
    case 'out_of_stock':
      return 'Hết hàng'
    default:
      return 'Không rõ'
  }
}
</script>
