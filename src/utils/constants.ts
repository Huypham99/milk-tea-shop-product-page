export const APP_CONFIG = {
  name: 'Milk Tea Shop',
  version: '1.0.0',
  author: 'Your Name',
  description: 'Modern milk tea ordering system',
} as const

export const STORAGE_KEYS = {
  CART: 'milktea_cart',
  FAVORITES: 'milktea_favorites',
  RECENTLY_VIEWED: 'milktea_recently_viewed',
  UI_PREFERENCES: 'milktea_ui_preferences',
  USER_PREFERENCES: 'milktea_user_preferences',
} as const

export const API_ENDPOINTS = {
  CATEGORIES: '/api/categories',
  PRODUCTS: '/api/products',
  TOPPINGS: '/api/toppings',
  CART: '/api/cart',
  ORDERS: '/api/orders',
} as const

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const

export const CART_CONFIG = {
  MAX_QUANTITY_PER_ITEM: 99,
  MIN_QUANTITY_PER_ITEM: 1,
  MAX_ITEMS_IN_CART: 50,
  AUTO_SAVE_DELAY: 1000,
} as const

export const TOAST_CONFIG = {
  DEFAULT_DURATION: 3000,
  SUCCESS_DURATION: 2000,
  ERROR_DURATION: 5000,
  MAX_TOASTS: 5,
} as const
