export interface SelectedToppings {
  [toppingId: string]: number
}

export interface CartItem {
  id: string
  productId: number
  productName: string
  productImage: string
  basePrice: number
  quantity: number
  selectedVariants: Record<string, any>
  selectedToppings: {
    toppingId: string
    name: string
    price: number
    quantity: number
  }[]
  itemSubtotal: number
  toppingsTotal: number
  itemTotal: number
  lineTotal: number
}

export interface Cart {
  items: CartItem[]
  itemCount: number
  subtotal: number
  tax?: number
  discount?: number
  total: number
  updatedAt: Date
}
