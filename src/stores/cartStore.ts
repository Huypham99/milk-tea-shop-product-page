// stores/useCartStore.ts
import { CartItem } from '@/types/cart'
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([])
  const isLoading = ref(false)

  // Computed
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + item.lineTotal, 0)
  })

  const toppingsTotal = computed(() => {
    return items.value.reduce((total, item) => total + item.toppingsTotal, 0)
  })

  const deliveryFee = computed(() => {
    // You can customize delivery fee logic here
    return subtotal.value > 100000 ? 0 : 15000 // Free delivery over 100k VND
  })

  const tax = computed(() => {
    // You can customize tax calculation here
    return Math.round(subtotal.value * 0.1) // 10% tax
  })

  const total = computed(() => {
    return subtotal.value + deliveryFee.value + tax.value
  })

  const isEmpty = computed(() => {
    return items.value.length === 0
  })

  // Actions
  const addItem = (newItem: CartItem) => {
    // Check if item with same configuration already exists
    const existingItemIndex = items.value.findIndex((item) => isSameConfiguration(item, newItem))

    if (existingItemIndex > -1) {
      // Update quantity of existing item
      const existingItem = items.value[existingItemIndex]
      existingItem.quantity += newItem.quantity
      existingItem.itemSubtotal = existingItem.basePrice * existingItem.quantity
      existingItem.itemTotal =
        (existingItem.basePrice + existingItem.toppingsTotal) * existingItem.quantity
      existingItem.lineTotal = existingItem.itemTotal
    } else {
      // Add new item
      items.value.push(newItem)
    }

    saveToLocalStorage()
  }

  const removeItem = (itemId: string) => {
    const index = items.value.findIndex((item) => item.id === itemId)
    if (index > -1) {
      items.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const updateItemQuantity = (itemId: string, quantity: number) => {
    const item = items.value.find((item) => item.id === itemId)
    if (item && quantity > 0) {
      item.quantity = quantity
      item.itemSubtotal = item.basePrice * quantity
      item.itemTotal = (item.basePrice + item.toppingsTotal) * quantity
      item.lineTotal = item.itemTotal
      saveToLocalStorage()
    }
  }

  const clearCart = () => {
    items.value = []
    saveToLocalStorage()
  }

  // Helper function to check if two items have the same configuration
  const isSameConfiguration = (item1: CartItem, item2: CartItem): boolean => {
    if (item1.productId !== item2.productId) return false

    // Compare variants
    const variants1Keys = Object.keys(item1.selectedVariants).sort()
    const variants2Keys = Object.keys(item2.selectedVariants).sort()

    if (variants1Keys.length !== variants2Keys.length) return false

    for (const key of variants1Keys) {
      if (item1.selectedVariants[key] !== item2.selectedVariants[key]) return false
    }

    // Compare toppings
    const toppings1 = item1.selectedToppings.map((t) => t.toppingId).sort()
    const toppings2 = item2.selectedToppings.map((t) => t.toppingId).sort()

    if (toppings1.length !== toppings2.length) return false

    return toppings1.every((toppingId, index) => toppingId === toppings2[index])
  }

  const CART_STORAGE_KEY = 'cart_items'

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items.value))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
  }

  const loadFromLocalStorage = () => {
    try {
      isLoading.value = true
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsedItems = JSON.parse(stored) as CartItem[]
        items.value = parsedItems
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
      items.value = []
    } finally {
      isLoading.value = false
    }
  }

  // Initialize store
  const initialize = () => {
    loadFromLocalStorage()
  }

  // Watch for items changes to auto-save (backup mechanism)
  watch(
    items,
    () => {
      if (!isLoading.value) {
        saveToLocalStorage()
      }
    },
    { deep: true },
  )

  return {
    // State
    items,
    isLoading,

    // Computed
    itemCount,
    subtotal,
    toppingsTotal,
    deliveryFee,
    tax,
    total,
    isEmpty,

    // Actions
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    initialize,
  }
})
