<template>
  <div v-if="!isLoading && availableToppings.length > 0" class="mb-6">
    <h3 class="font-semibold text-gray-900 mb-3">Topping</h3>

    <!-- Loading state -->
    <div v-if="isLoading" class="space-y-2">
      <div v-for="n in 3" :key="n" class="animate-pulse">
        <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div class="h-4 bg-gray-300 rounded w-24"></div>
          <div class="h-4 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>

    <!-- Toppings list -->
    <div v-else class="space-y-2">
      <div
        v-for="topping in availableToppings"
        :key="topping.id"
        @click="toggleTopping(topping.id)"
        class="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer transition-all hover:border-violet-300"
        :class="{
          'border-violet-500 bg-violet-50': selectedToppings.includes(topping.id),
          'border-gray-200': !selectedToppings.includes(topping.id)
        }"
      >
        <div class="flex items-center flex-1">
          <span class="text-gray-900 font-medium">{{ topping.name }}</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-green-600 font-medium">
            +{{ formatPrice(topping.price) }}
          </span>
          <div
            class="w-4 h-4 rounded-full flex items-center justify-center transition-all"
            :class="{
              'bg-violet-500': selectedToppings.includes(topping.id),
              'border-2 border-gray-300': !selectedToppings.includes(topping.id)
            }"
          >
            <Check
              v-if="selectedToppings.includes(topping.id)"
              class="w-3 h-3 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Check } from 'lucide-vue-next'
import { useMenu } from '@/composables/useMenu'
import type { Topping } from '@/types/menu'

interface Props {
  availableToppingIds: string[]
  selectedToppings: string[]
}

interface Emits {
  (e: 'topping-selected', toppings: string[]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const {
  getToppingById,
} = useMenu({
  autoLoad: false
})

// Reactive state
const availableToppings = ref<Topping[]>([])
const isLoading = ref(false)

// Methods
const loadToppings = async () => {
  if (props.availableToppingIds.length === 0) {
    availableToppings.value = []
    return
  }

  isLoading.value = true

  try {
    const toppingPromises = props.availableToppingIds.map(id => getToppingById(id))
    const toppings = await Promise.all(toppingPromises)

    // Filter out null results and unavailable toppings
    availableToppings.value = toppings
      .filter((topping): topping is Topping => topping !== null && topping.available)
  } catch (error) {
    console.error('Error loading toppings:', error)
    availableToppings.value = []
  } finally {
    isLoading.value = false
  }
}

const toggleTopping = (toppingId: string) => {
  const currentToppings = [...props.selectedToppings]
  const index = currentToppings.indexOf(toppingId)

  if (index > -1) {
    // Remove topping
    currentToppings.splice(index, 1)
  } else {
    // Add topping
    currentToppings.push(toppingId)
  }

  emit('topping-selected', currentToppings)
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

// Watch for changes in available topping IDs and reload
watch(
  () => props.availableToppingIds,
  async (newIds) => {
    await loadToppings()

    // Remove any selected toppings that are no longer available
    const availableIds = availableToppings.value.map(t => t.id)
    const filteredSelected = props.selectedToppings.filter(id => availableIds.includes(id))

    if (filteredSelected.length !== props.selectedToppings.length) {
      emit('topping-selected', filteredSelected)
    }
  },
  { immediate: true }
)

// Load toppings on component mount
onMounted(() => {
  loadToppings()
})
</script>
