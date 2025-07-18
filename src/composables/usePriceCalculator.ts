// composables/usePriceCalculator.ts
import { computed, Ref } from 'vue'
import type { Product } from '@/types/menu'

type PriceCalculatorParams = {
  product: Ref<Product | null>
  selectedVariants: Ref<Record<string, string>>
  toppingPrices: Ref<Record<string, number>>
  selectedToppings: Ref<string[]>
  quantity: Ref<number>
}

export function usePriceCalculator({
  product,
  quantity,
  toppingPrices,
  selectedVariants,
  selectedToppings,
}: PriceCalculatorParams) {
  const basePrice = computed(() => {
    if (!product.value) return 0

    let price = product.value.price

    // Add price modifiers from selected variants
    if (!product.value.variants) return price

    for (const variant of product.value.variants) {
      const selectedOptionId = selectedVariants.value[variant.type]
      if (!selectedOptionId) return price
      const selectedOption = variant.options.find((opt) => opt.id === selectedOptionId)
      if (!selectedOption) return price
      price += selectedOption.priceModifier
    }

    return price
  })

  const toppingsTotal = computed(() => {
    let total = 0
    for (const toppingId of selectedToppings.value) {
      const toppingPrice = toppingPrices.value[toppingId]
      if (toppingPrice) {
        total += toppingPrice
      }
    }
    return total
  })

  const itemSubtotal = computed(() => {
    return basePrice.value * quantity.value
  })

  const itemTotal = computed(() => {
    return (basePrice.value + toppingsTotal.value) * quantity.value
  })

  const totalPrice = computed(() => {
    return itemTotal.value
  })

  return {
    basePrice,
    toppingsTotal,
    itemSubtotal,
    itemTotal,
    totalPrice,
  }
}
