<template>
  <div class="bg-white rounded-lg border border-gray-200 p-4">
    <!-- Product Info -->
    <div class="flex gap-4">

      <!-- Product Details -->
      <div class="flex-1 min-w-0">
        <!-- Product Name and Remove Button -->
        <div class="flex items-start justify-between mb-2">
          <h3 class="font-semibold text-gray-900 text-sm leading-tight">
            {{ item.productName }}
          </h3>
          <button @click="$emit('remove')"
            class="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2 flex-shrink-0 cursor-pointer">
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Variants -->
        <div v-if="hasVariants" class="mb-2">
          <div class="flex flex-wrap gap-1">
            <span v-for="(value, key) in item.selectedVariants" :key="key"
              class="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
              {{ value }}
            </span>
          </div>
        </div>

        <!-- Toppings -->
        <div v-if="item.selectedToppings.length > 0" class="mb-2">
          <div class="text-xs text-gray-600 mb-1">Toppings:</div>
          <div class="flex flex-wrap gap-1">
            <span v-for="topping in item.selectedToppings" :key="topping.toppingId"
              class="inline-flex items-center px-2 py-1 rounded text-xs bg-orange-50 text-orange-700 border border-orange-200">
              {{ topping.name }} (+{{ formatPrice(topping.price) }})
            </span>
          </div>
        </div>

        <!-- Price and Quantity -->
        <div class="flex items-center justify-between">
          <!-- Quantity Controls -->
          <div class="flex items-center gap-2">
            <button @click="decreaseQuantity" :disabled="item.quantity <= 1"
              class="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-600">
              <Minus class="w-3 h-3" />
            </button>

            <span class="text-sm font-medium min-w-[2rem] text-center">
              {{ item.quantity }}
            </span>

            <button @click="increaseQuantity"
              class="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 transition-colors text-gray-600">
              <Plus class="w-3 h-3" />
            </button>
          </div>

          <!-- Price -->
          <div class="text-right">
            <div class="font-semibold text-violet-600">
              {{ formatPrice(item.lineTotal) }}
            </div>
            <div v-if="item.quantity > 1" class="text-xs text-gray-500">
              {{ formatPrice(item.itemTotal / item.quantity) }} × {{ item.quantity }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { X, Minus, Plus } from 'lucide-vue-next'
import { CartItem } from '@/types/cart';

interface Props {
  item: CartItem
}

interface Emits {
  (e: 'update-quantity', quantity: number): void
  (e: 'remove'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Computed
const hasVariants = computed(() => {
  return Object.keys(props.item.selectedVariants).length > 0
})

// Methods
const increaseQuantity = () => {
  emit('update-quantity', props.item.quantity + 1)
}

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    emit('update-quantity', props.item.quantity - 1)
  }
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

// const formatVariantText = (key: string, value: string): string => {
//   // You can customize this based on your variant types
//   const keyMappings: Record<string, string> = {
//     size: 'Size',
//     sugar: 'Đường',
//     ice: 'Đá',
//     milk: 'Sữa'
//   }

//   return `${keyMappings[key] || key}: ${value}`
// }
</script>
