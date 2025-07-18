import { CartItem } from '@/types/cart'
import type { Product } from '@/types/menu'

type CartItemBuilderParams = {
  product: Product
  selectedVariants: Record<string, string>
  selectedToppings: string[]
  toppingDetails: Record<string, { name: string; price: number }>
  quantity: number
  basePrice: number
  toppingsTotal: number
  itemSubtotal: number
  itemTotal: number
}

export function useCartItemBuilder() {
  const createCartItem = (params: CartItemBuilderParams): CartItem => {
    const {
      product,
      selectedVariants,
      selectedToppings,
      toppingDetails,
      quantity,
      basePrice,
      toppingsTotal,
      itemSubtotal,
      itemTotal,
    } = params

    // Create a unique cart item ID
    const cartItemId = `${product.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Format selected toppings according to CartItem structure
    const formattedToppings = selectedToppings.map((toppingId) => ({
      toppingId,
      name: toppingDetails[toppingId]?.name || '',
      price: toppingDetails[toppingId]?.price || 0,
      quantity: 1,
    }))

    // Create the cart item payload
    const cartItem: CartItem = {
      id: cartItemId,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      basePrice,
      quantity,
      selectedVariants,
      selectedToppings: formattedToppings,
      toppingsTotal,
      itemSubtotal,
      itemTotal,
      lineTotal: itemTotal,
    }

    return cartItem
  }

  return {
    createCartItem,
  }
}
