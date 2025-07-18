<!-- src/components/layout/TwoColumnLayout.vue -->
<template>
  <div class="min-h-screen bg-warm-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div class="px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-primary-600 font-display">
              🧋 Ownego Tea
            </h1>
          </div>

          <!-- Search Bar -->
          <!-- <div class="flex-1 max-w-md mx-8">
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Tìm kiếm đồ uống..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                v-model="searchQuery" @input="$emit('search', searchQuery)" />
            </div>
          </div> -->

          <!-- Cart Toggle Button -->
          <button @click="toggleCart" class="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
            <ShoppingCart class="w-6 h-6 cursor-pointer" />
            <span v-if="cartItemCount > 0"
              class="absolute -top-1 -right-1 bg-violet-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ cartItemCount }}
            </span>
          </button>
        </div>
      </div>
    </header>

    <!-- Cart Overlay - Positioned above main content -->
    <div v-if="showCart" class="absolute fixed top-0 inset-x-0 bottom-0 bg-black opacity-50 z-40" @click="toggleCart" />

    <div
      class="absolute fixed top-0 right-0 w-[30vw] h-full bg-white border-l border-gray-200 z-50 transform transition-transform duration-300 ease-in-out"
      :class="{
        'translate-x-0': showCart,
        'translate-x-full': !showCart
      }">
      <div class="h-full flex flex-col">
        <!-- Cart Header -->
        <div class="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <h2 class="text-lg font-semibold text-gray-900">Giỏ hàng</h2>
          <button @click="toggleCart" class="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Cart Content - Scrollable -->
        <div class="flex-1 overflow-y-auto custom-scrollbar">
          <div class="p-4">
            <slot name="cart" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content - Two Column Layout -->
    <div class="flex" style="height: calc(100vh - 4rem);">
      <!-- Left Sidebar - Categories -->
      <aside class="w-70 bg-white border-r border-gray-200 flex-shrink-0"
        :class="{ 'hidden lg:block': !showCategorySidebar }">
        <div class="h-full flex flex-col">
          <!-- Categories Header -->
          <div class="px-4 h-16 flex-shrink-0 flex items-center">
            <h2 class="text-lg font-semibold text-gray-900">Danh Mục</h2>
          </div>

          <!-- Categories Content - Scrollable -->
          <div class="flex-1 overflow-y-auto custom-scrollbar">
            <div class="p-4 pt-0">
              <slot name="categories" />
            </div>
          </div>
        </div>
      </aside>

      <!-- Right Column - Products -->
      <main class="flex-1 min-w-0">
        <div class="h-full flex flex-col">
          <!-- Products Header -->
          <div class="border-b border-gray-200 flex-shrink-0">
            <div class="h-18 px-6 flex items-center justify-between">
              <div>
                <h2 class="text-xl font-semibold text-gray-900">
                  {{ selectedCategoryName || 'Sản phẩm' }}
                </h2>
              </div>

              <!-- View Options -->
              <div class="flex items-center space-x-4">
                <!-- Sort Dropdown -->
                <!-- <select v-model="sortBy" @change="$emit('sort-change', sortBy)"
                  class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="name">Tên A-Z</option>
                  <option value="price-asc">Giá thấp đến cao</option>
                  <option value="price-desc">Giá cao đến thấp</option>
                  <option value="popularity">Phổ biến</option>
                </select> -->
              </div>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto custom-scrollbar">
            <div class="p-6">
              <slot name="products" />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, ShoppingCart, X } from 'lucide-vue-next'

interface Props {
  selectedCategoryName?: string
  productCount?: number
  cartItemCount?: number
  currentGridSize?: number
}

interface Emits {
  (e: 'search', query: string): void
  (e: 'sort-change', sortBy: string): void
  (e: 'grid-change', gridSize: number): void
  (e: 'toggle-cart'): void
}

const props = withDefaults(defineProps<Props>(), {
  selectedCategoryName: '',
  productCount: 0,
  cartItemCount: 0,
  currentGridSize: 2
})

const emit = defineEmits<Emits>()

const searchQuery = ref('')
const sortBy = ref('name')
const showCategorySidebar = ref(true)
const showCart = ref(false)

// Methods
const toggleCart = () => {
  showCart.value = !showCart.value
  emit('toggle-cart')
}
</script>
