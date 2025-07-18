import { computed, type Ref } from 'vue'
import type { Product } from '@/types/menu'

type ValidationParams = {
  product: Ref<Product | null>
  selectedVariants: Ref<Record<string, string>>
  quantity: Ref<number>
}

export function useProductValidation({ product, selectedVariants, quantity }: ValidationParams) {
  const maxQuantity = computed(() => {
    if (!product.value) return 1

    if (product.value.inventory.status === 'low_stock') {
      return 3
    } else if (product.value.inventory.status === 'out_of_stock') {
      return 0
    }

    return 99 // Default maximum
  })

  const canAddToCart = computed(() => {
    if (!product.value || product.value.inventory.status === 'out_of_stock') {
      return false
    }

    if (quantity.value < 1 || quantity.value > maxQuantity.value) {
      return false
    }

    // Check if all required variants are selected
    if (product.value.variants) {
      for (const variant of product.value.variants) {
        if (variant.required && !selectedVariants.value[variant.type]) {
          return false
        }
      }
    }

    return true
  })

  return {
    maxQuantity,
    canAddToCart,
  }
}
