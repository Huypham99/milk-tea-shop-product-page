<template>
  <div v-if="product" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click="handleOverlayClick">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black opacity-50 transition-opacity"
      :class="{ 'opacity-50': showModal, 'opacity-0': !showModal }" />

    <!-- Modal Content -->
    <div
      class="relative bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden transform transition-all rounded-xl w-[40vw]"
      :class="{ 'scale-100 opacity-100': showModal, 'scale-95 opacity-0': !showModal }">
      <!-- Close Button -->
      <button @click="$emit('close')"
        class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition-colors cursor-pointer">
        <X class="w-5 h-5 text-gray-600" />
      </button>

      <!-- Modal Body with Fixed Header and Footer -->
      <div class="flex flex-col h-full max-h-[90vh]">
        <!-- Fixed Header - Product Info -->
        <div class="flex-shrink-0 p-6 border-b border-gray-200 bg-white rounded-t-2xl">
          <!-- Title and Price -->
          <div class="flex flex-col items-start gap-4">
            <div class="flex gap-2">
              <h2 class="text-2xl font-bold text-gray-900">{{ product.name }}</h2>
              <div class="flex items-center gap-1">
                <span v-if="product.isNew"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 w-fit">
                  Mới
                </span>
                <span v-if="product.isPopular"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 w-fit">
                  Phổ biến
                </span>
                <span v-if="product.originalPrice && product.originalPrice > product.price"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 w-fit">
                  Giảm giá
                </span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div class="text-xl font-semibold text-violet-600">
                {{ formatPrice(totalPrice) }}
              </div>
              <div v-if="product.originalPrice && product.originalPrice > product.price"
                class="text-lg font-regular text-gray-500 line-through">
                {{ formatPrice(product.originalPrice) }}
              </div>
              <div v-if="quantity > 1" class="text-sm text-gray-500">
                ({{ formatPrice(basePrice) }} × {{ quantity }})
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-600 italic font-regular">{{ product.description }}</p>

            <!-- Quantity Control -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-3">Số lượng</h3>
              <div class="flex items-center gap-3">
                <button @click="decreaseQuantity" :disabled="quantity <= 1"
                  class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 hover:border-violet-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer">
                  <Minus class="w-4 h-4 text-gray-600" />
                </button>

                <div class="flex items-center">
                  <input v-model.number="quantity" @blur="validateQuantity" @keyup.enter="validateQuantity" type="number"
                    min="1" :max="maxQuantity"
                    class="w-16 text-center border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
                </div>

                <button @click="increaseQuantity" :disabled="quantity >= maxQuantity"
                  class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 hover:border-violet-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer">
                  <Plus class="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div v-if="maxQuantity < 10" class="text-xs text-gray-500 mt-1">
                Tối đa {{ maxQuantity }} sản phẩm
              </div>
            </div>

            <!-- Product Details -->
            <div v-if="product.details">
              <h3 class="font-semibold text-gray-900 mb-3">Thông tin chi tiết</h3>
              <div class="grid grid-cols-3 gap-2 text-sm">
                <div v-if="product.details.calories" class="flex items-center">
                  <Flame class="w-4 h-4 text-orange-500 mr-2" />
                  <span>{{ product.details.calories * quantity }} calories</span>
                </div>
                <div class="flex items-center">
                  <Package class="w-4 h-4 text-green-500 mr-2" />
                  <span>{{ getInventoryStatus(product.inventory.status) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scrollable Middle Section - Variants and Toppings -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
          <!-- Product Variants Selection -->
          <ProductVariantSelect :variants="product.variants" :selectedVariants="selectedVariants"
            @variant-selected="selectVariantOption" />

          <!-- Product Toppings Selection -->
          <ProductToppingSelect v-if="product.availableToppings && product.availableToppings.length > 0"
            :availableToppingIds="product.availableToppings" :selectedToppings="selectedToppings"
            @topping-selected="handleToppingSelected" />
        </div>

        <!-- Fixed Footer - Action Buttons -->
        <div class="flex-shrink-0 p-6 border-t border-gray-200 bg-white rounded-b-2xl">
          <button @click="handleAddToCart" :disabled="!canAddToCart"
            class="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500 cursor-pointer">
            <ShoppingCart class="w-4 h-4 mr-2" />
            {{ product.inventory.status === 'out_of_stock' ? 'Hết hàng' : `Thêm ${quantity} sản phẩm vào giỏ` }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, toRef } from 'vue'
import { X, Package, Flame, Minus, Plus, ShoppingCart } from 'lucide-vue-next'
import ProductVariantSelect from './ProductVariantSelect.vue'
import ProductToppingSelect from './ProductToppingSelect.vue'
import type { Product } from '@/types/menu'
import { useProductSelection } from '@/composables/useProductSelection'
import { useToppingData } from '@/composables/useToppingData'
import { usePriceCalculator } from '@/composables/usePriceCalculator'
import { useCartItemBuilder } from '@/composables/useCartItemBuilder'
import { useCartStore } from '@/stores/cartStore'
import { useProductValidation } from '@/composables/useProductValidation'
import { CartItem } from '@/types/cart'

interface Props {
  product: Product | null
  show: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'add-to-cart', cartItem: CartItem): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Modal state
const showModal = ref(false)

// Convert props.product to ref for composables
const productRef = toRef(props, 'product')

// Use composables
const {
  selectedVariants,
  selectedToppings,
  quantity,
  selectVariantOption,
  handleToppingSelected: onToppingSelected,
  increaseQuantity: increaseQty,
  decreaseQuantity,
  validateQuantity: validateQty
} = useProductSelection(productRef)

const { toppingPrices, toppingDetails } = useToppingData(selectedToppings)

const { basePrice, toppingsTotal, itemSubtotal, itemTotal, totalPrice } = usePriceCalculator({
  product: productRef,
  selectedVariants,
  toppingPrices,
  selectedToppings,
  quantity
})

const { maxQuantity, canAddToCart } = useProductValidation({
  product: productRef,
  selectedVariants,
  quantity
})

const { createCartItem } = useCartItemBuilder()
const cartStore = useCartStore()

// Methods
const handleToppingSelected = (toppings: string[]) => {
  onToppingSelected(toppings)
}

const increaseQuantity = () => {
  increaseQty(maxQuantity.value)
}

const validateQuantity = () => {
  validateQty(maxQuantity.value)
}

const handleAddToCart = () => {
  if (!props.product || !canAddToCart.value) return

  const cartItem = createCartItem({
    product: props.product,
    selectedVariants: selectedVariants.value,
    selectedToppings: selectedToppings.value,
    toppingDetails: toppingDetails.value,
    quantity: quantity.value,
    basePrice: basePrice.value,
    toppingsTotal: toppingsTotal.value,
    itemSubtotal: itemSubtotal.value,
    itemTotal: itemTotal.value
  })

  // Add to cart store
  cartStore.addItem(cartItem)

  // Emit for any parent component logic (optional)
  emit('add-to-cart', cartItem)

  // Close modal after adding to cart
  emit('close')
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const getInventoryStatus = (status: string): string => {
  const statusMap = {
    'in_stock': 'Còn hàng',
    'low_stock': 'Sắp hết',
    'out_of_stock': 'Hết hàng'
  }
  return statusMap[status as keyof typeof statusMap] || status
}

const handleOverlayClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
})

// Watch for show prop changes
watch(
  () => props.show,
  (newShow) => {
    if (newShow) {
      setTimeout(() => {
        showModal.value = true
      }, 10)
      document.body.style.overflow = 'hidden'
    } else {
      showModal.value = false
      document.body.style.overflow = 'auto'
    }
  },
  { immediate: true }
)

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>
