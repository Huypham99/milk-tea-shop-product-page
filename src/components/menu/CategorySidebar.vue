<template>
  <div class="space-y-2">

    <!-- Category List -->
    <div class="space-y-1/2">
      <CategoryListSkeleton v-if="loadingCategory" />
      <button v-else v-for="category in categories" :key="category.id" @click="selectCategory(category.id)"
        class="w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 text-left mb-2 group"
        :class="selectedCategoryId === category.id
          ? 'bg-violet-50 text-primary-700 border-2 border-violet-200 shadow-sm'
          : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-transparent hover:border-gray-200'">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" :class="selectedCategoryId === category.id
            ? 'bg-violet-500 text-white'
            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'">
            <component :is="getCategoryIcon(category.id)" class="w-4 h-4" />
          </div>
          <div>
            <div class="font-medium">{{ category.name }}</div>
          </div>
        </div>
        <ChevronRight class="w-4 h-4 transition-transform duration-200"
          :class="selectedCategoryId === category.id ? 'rotate-90' : ''" />
      </button>
    </div>

    <!-- Filters Section -->
    <div class="mt-4 pt-6 border-t border-gray-200">
      <!-- Popular Toppings Filter -->
      <div class="mb-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Topping phổ biến</h2>
        <div class="space-y-2">
          <ToppingListSkeleton v-if="loadingTopping" />
          <label v-else v-for="topping in toppings" :key="topping.id"
            class="flex items-center space-x-2 cursor-pointer group">
            <input type="checkbox" :value="topping.id" v-model="selectedToppings" @change="updateToppings"
              class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
            <span class="text-sm text-gray-700 group-hover:text-gray-900">
              {{ topping.name }}
            </span>
          </label>
        </div>
      </div>

      <button v-if="hasActiveFilters" @click="clearFilters"
        class="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
        Xóa bộ lọc
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronRight, Coffee, Milk, Apple, Sparkles, Star } from 'lucide-vue-next'
import { Category, Topping } from '../../types/menu';
import CategoryListSkeleton from '../skeleton/CategoryListSkeleton.vue';
import ToppingListSkeleton from '../skeleton/ToppingListSkeleton.vue';

type Props = {
  categories: Category[]
  toppings: Topping[]
  selectedCategoryId?: number
  totalProducts?: number
  loadingCategory?: boolean
  loadingTopping?: boolean
}

type Emits = {
  (e: 'category-select', categoryId: number | undefined): void
  (e: 'topping-filter', toppings: string[]): void
}

const props = withDefaults(defineProps<Props>(), {
  selectedCategoryId: undefined,
  totalProducts: 0
})

const emit = defineEmits<Emits>()

const selectedToppings = ref<string[]>([])

// Computed
const hasActiveFilters = computed(() => {
  return selectedToppings.value.length > 0
})

// Methods
const selectCategory = (categoryId: number | undefined) => {
  emit('category-select', categoryId)
}
const updateToppings = () => {
  emit('topping-filter', selectedToppings.value)
}

const clearFilters = () => {
  selectedToppings.value = []
  emit('topping-filter', [])
}

const getCategoryIcon = (categoryId: number) => {
  const iconMap: { [key: number]: any } = {
    1: Star,
    2: Milk,
    3: Apple,
    4: Coffee,
    5: Sparkles
  }
  return iconMap[categoryId] || Coffee
}
</script>

<style scoped>
/* Custom checkbox styles */
input[type="checkbox"]:checked {
  background-color: #f0721a;
  border-color: #f0721a;
}

input[type="checkbox"]:focus {
  box-shadow: 0 0 0 3px rgba(240, 114, 26, 0.1);
}
</style>
