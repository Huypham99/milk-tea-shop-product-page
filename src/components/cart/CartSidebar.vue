<template>
  <div class="px-2">

    <!-- Loading State -->
    <div v-if="cartStore.isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-full w-12 border-b-2 border-violet-600"></div>
    </div>

    <!-- Empty Cart -->
    <div v-else-if="cartStore.isEmpty" class="text-center py-12">
      <div class="max-w-md mx-auto">
        <ShoppingCart class="w-24 h-24 text-gray-300 mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Giỏ hàng trống</h2>
        <p class="text-gray-600 mb-6">Hãy thêm một số món yêu thích vào giỏ hàng!</p>
      </div>
    </div>

    <!-- Cart Content -->
    <div v-else class="flex flex-col gap-4">
      <CartItemCard v-for="item in cartStore.items" :key="item.id" :item="item"
        @update-quantity="(quantity: number) => updateQuantity(item.id, quantity)" @remove="removeItem(item.id)" />


      <!-- Cart Summary -->
      <div class="lg:col-span-1">
        <div class="sticky top-6">
          <CartSummary :item-count="cartStore.itemCount" :subtotal="cartStore.subtotal"
            :toppings-total="cartStore.toppingsTotal" :delivery-fee="cartStore.deliveryFee" :tax="cartStore.tax"
            :total="cartStore.total" :is-empty="cartStore.isEmpty" @checkout="handleCheckout"
            @clear-cart="handleClearCart" />
        </div>
      </div>
    </div>
  </div>

  <!-- Confirmation Modal -->
  <ConfirmationModal v-if="showConfirmModal" title="Xác nhận xóa giỏ hàng"
    message="Bạn có chắc chắn muốn xóa tất cả món trong giỏ hàng? Hành động này không thể hoàn tác."
    confirm-text="Xóa tất cả" cancel-text="Hủy" @confirm="confirmClearCart" @cancel="showConfirmModal = false" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cartStore'
import CartItemCard from '@/components/cart/CartItemCard.vue'
import CartSummary from '@/components/cart/CartSummary.vue'
import ConfirmationModal from '@/components/cart/ConfirmationModal.vue'

const router = useRouter()
const cartStore = useCartStore()
const showConfirmModal = ref(false)

// Methods
const updateQuantity = (itemId: string, quantity: number) => {
  cartStore.updateItemQuantity(itemId, quantity)
}

const removeItem = (itemId: string) => {
  cartStore.removeItem(itemId)
}

const handleClearCart = () => {
  showConfirmModal.value = true
}

const confirmClearCart = () => {
  cartStore.clearCart()
  showConfirmModal.value = false
}

const handleCheckout = () => {
  // Navigate to checkout page
  router.push('/checkout')
}

// Initialize cart on mount
onMounted(() => {
  cartStore.initialize()
})
</script>
