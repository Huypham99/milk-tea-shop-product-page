<template>
  <div class="bg-white rounded-lg border border-gray-200 p-4">
    <h3 class="font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>

    <!-- Order Summary Details -->
    <div class="space-y-3">
      <!-- Subtotal -->
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Tạm tính ({{ itemCount }} món)</span>
        <span class="font-medium">{{ formatPrice(subtotal) }}</span>
      </div>

      <!-- Toppings Total (if any) -->
      <div v-if="toppingsTotal > 0" class="flex justify-between text-sm">
        <span class="text-gray-600">Toppings</span>
        <span class="font-medium">{{ formatPrice(toppingsTotal) }}</span>
      </div>

      <!-- Delivery Fee -->
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Phí giao hàng</span>
        <span class="font-medium" :class="{ 'text-green-600': deliveryFee === 0 }">
          {{ deliveryFee === 0 ? 'Miễn phí' : formatPrice(deliveryFee) }}
        </span>
      </div>

      <!-- Tax -->
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Thuế VAT (10%)</span>
        <span class="font-medium">{{ formatPrice(tax) }}</span>
      </div>

      <!-- Delivery Fee Note -->
      <div v-if="deliveryFee > 0" class="text-xs text-gray-500 bg-blue-50 p-2 rounded">
        💡 Miễn phí giao hàng cho đơn từ {{ formatPrice(100000) }}
      </div>

      <!-- Divider -->
      <hr class="border-gray-200">

      <!-- Total -->
      <div class="flex justify-between items-center">
        <span class="font-semibold text-gray-900">Tổng cộng</span>
        <span class="font-bold text-lg text-violet-600">{{ formatPrice(total) }}</span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="mt-6 space-y-3">
      <button
        @click="$emit('checkout')"
        :disabled="isEmpty"
        class="w-full bg-violet-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
      >
        {{ isEmpty ? 'Giỏ hàng trống' : 'Thanh toán' }}
      </button>

      <button
        @click="$emit('clear-cart')"
        :disabled="isEmpty"
        class="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Xóa tất cả
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  itemCount: number
  subtotal: number
  toppingsTotal: number
  deliveryFee: number
  tax: number
  total: number
  isEmpty: boolean
}

interface Emits {
  (e: 'checkout'): void
  (e: 'clear-cart'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}
</script>
