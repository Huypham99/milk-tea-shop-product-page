import { Ref, ref, watch } from 'vue'
import { useMenu } from '@/composables/useMenu'

export function useToppingData(selectedToppings: Ref<string[]>) {
  const toppingPrices = ref<Record<string, number>>({})
  const toppingDetails = ref<Record<string, { name: string; price: number }>>({})

  const { getToppingById } = useMenu({ autoLoad: false })

  const loadToppingsData = async (toppings: string[]) => {
    const newToppingPrices: Record<string, number> = {}
    const newToppingDetails: Record<string, { name: string; price: number }> = {}

    for (const toppingId of toppings) {
      if (!toppingPrices.value[toppingId]) {
        try {
          const topping = await getToppingById(toppingId)
          if (!topping) return

          newToppingPrices[toppingId] = topping.price
          newToppingDetails[toppingId] = {
            name: topping.name,
            price: topping.price,
          }
        } catch (error) {
          console.error(`Error loading topping ${toppingId}:`, error)
        }
      } else {
        newToppingPrices[toppingId] = toppingPrices.value[toppingId]
        newToppingDetails[toppingId] = toppingDetails.value[toppingId]
      }
    }

    toppingPrices.value = newToppingPrices
    toppingDetails.value = newToppingDetails
  }

  const clearToppingsData = () => {
    toppingPrices.value = {}
    toppingDetails.value = {}
  }

  watch(
    selectedToppings,
    (newToppings) => {
      if (newToppings.length > 0) {
        loadToppingsData(newToppings)
      } else {
        clearToppingsData()
      }
    },
    { immediate: true },
  )

  return {
    toppingPrices,
    toppingDetails,
    clearToppingsData,
  }
}
