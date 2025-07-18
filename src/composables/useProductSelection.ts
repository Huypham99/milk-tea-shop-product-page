// composables/useProductSelection.ts
import { Ref, ref, watch } from 'vue'
import type { Product } from '@/types/menu'

export function useProductSelection(product: Ref<Product | null>) {
  const selectedVariants = ref<Record<string, string>>({})
  const selectedToppings = ref<string[]>([])
  const quantity = ref(1)

  // Methods
  const selectVariantOption = (variantType: string, optionId: string) => {
    selectedVariants.value[variantType] = optionId
  }

  const handleToppingSelected = (toppings: string[]) => {
    selectedToppings.value = toppings
  }

  const increaseQuantity = (maxQuantity: number) => {
    if (quantity.value < maxQuantity) {
      quantity.value += 1
    }
  }

  const decreaseQuantity = () => {
    if (quantity.value > 1) {
      quantity.value -= 1
    }
  }

  const validateQuantity = (maxQuantity: number) => {
    if (quantity.value < 1) {
      quantity.value = 1
    } else if (quantity.value > maxQuantity) {
      quantity.value = maxQuantity
    }
  }

  const resetSelection = () => {
    selectedVariants.value = {}
    selectedToppings.value = []
    quantity.value = 1
  }

  const setDefaultVariants = (newProduct: Product) => {
    if (newProduct?.variants) {
      for (const variant of newProduct.variants) {
        if (variant.required) {
          const firstAvailableOption = variant.options.find((opt) => opt.available)
          if (firstAvailableOption) {
            selectedVariants.value[variant.type] = firstAvailableOption.id
          }
        }
      }
    }
  }

  watch(
    product,
    (newProduct) => {
      resetSelection()
      if (newProduct) {
        setDefaultVariants(newProduct)
      }
    },
    { immediate: true },
  )

  return {
    selectedVariants,
    selectedToppings,
    quantity,
    selectVariantOption,
    handleToppingSelected,
    increaseQuantity,
    decreaseQuantity,
    validateQuantity,
    resetSelection,
  }
}
