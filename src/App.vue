<script setup lang="ts">
import { computed, ref, watch } from "vue"
import CartSidebar from "./components/cart/CartSidebar.vue";
import BaseLayout from './components/layout/BaseLayout.vue';
import CategorySidebar from './components/menu/CategorySidebar.vue';
import ProductGrid from './components/menu/ProductGrid.vue';
import ProductDetailModal from './components/menu/ProductDetailModal.vue';
import { Product } from './types/menu';
import { useMenu } from "./composables/useMenu";
import { useCartStore } from '@/stores/cartStore'

const {
  state,
  isLoading,
  hasError,
  selectCategory,
  updateToppingsFilter,
  // searchProducts,
  // sortProducts,
} = useMenu({
  autoLoad: true,
  defaultFilters: {},
  defaultPagination: { page: 1, limit: 12 }
})

const cartStore = useCartStore()

// const searchQuery = ref('')
// const selectedSort = ref('name-asc')
const selectedProduct = ref<Product | null>(null)
const showProductModal = ref(false)

// Methods
const handleCategorySelect = async (categoryId: number | undefined) => {
  await selectCategory(categoryId)
}

const handleToppingsFilter = async (toppings: string[]) => {
  await updateToppingsFilter(toppings)
}

// const handleSearch = async () => {
//   await searchProducts(searchQuery.value)
// }

// const handleSortChange = async () => {
//   const [sortBy, sortOrder] = selectedSort.value.split('-')
//   await sortProducts(sortBy as any, sortOrder as any)
// }

const handleProductClick = (product: Product) => {
  selectedProduct.value = product
  showProductModal.value = true
}

const handleCloseModal = () => {
  showProductModal.value = false
  setTimeout(() => {
    selectedProduct.value = null
  }, 300)
}

// Error handling
const handleError = (error: string) => {
  console.error('Menu error:', error)
}

watch(
  () => hasError.value,
  (hasError) => {
    if (hasError) {
      const errorMessage = state.error.categories || state.error.products || state.error.toppings
      if (errorMessage) {
        handleError(errorMessage)
      }
    }
  }
)
</script>

<template>
  <header>
    <div class="wrapper">
      <BaseLayout :cartItemCount="cartStore.itemCount">
        <template #categories>
          <CategorySidebar :categories="state.categories" :toppings="state.toppings"
            :selected-category-id="state.selectedCategory" @category-select="handleCategorySelect"
            @topping-filter="handleToppingsFilter" />
        </template>
        <template #products>
          <ProductGrid :products="state.products" :loading="isLoading" @product-click="handleProductClick" />
        </template>
        <template #cart>
          <CartSidebar />
        </template>
      </BaseLayout>
    </div>
  </header>

  <ProductDetailModal :product="selectedProduct" :show="showProductModal" @close="handleCloseModal" />

  <RouterView />
</template>
