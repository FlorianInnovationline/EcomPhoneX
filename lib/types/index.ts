// Type definitions - these will be used when backend is added
// Keep these aligned with your future Prisma schema

export type Role = 'CUSTOMER' | 'ADMIN'

export type OrderStatus = 'PENDING' | 'PAID' | 'FULFILLED' | 'CANCELLED' | 'REFUNDED'

export type AddressType = 'SHIPPING' | 'BILLING'

export interface User {
  id: string
  email?: string | null
  name?: string | null
  image?: string | null
  role: Role
}

export interface Product {
  id: string
  slug: string
  brand: string
  name: string
  description: string | null
  specs: Record<string, any> | null
  active: boolean
  variants: Variant[]
  images: ProductImage[]
  createdAt: Date
  updatedAt: Date
}

export interface Variant {
  id: string
  productId: string
  sku: string
  color: string | null
  storage: string | null
  price: number
  compareAtPrice: number | null
  cost: number | null
  inventory: number
  weight: number | null
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductImage {
  id: string
  productId: string
  url: string
  alt: string | null
  sort: number
  createdAt: Date
}

export interface Order {
  id: string
  userId: string | null
  email: string
  status: OrderStatus
  currency: string
  subtotal: number
  shipping: number
  tax: number
  total: number
  stripePaymentIntentId: string | null
  items: OrderItem[]
  addresses: Address[]
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  variantId: string | null
  nameSnapshot: string
  skuSnapshot: string
  priceSnapshot: number
  costSnapshot: number | null
  quantity: number
  createdAt: Date
}

export interface Address {
  id: string
  orderId: string
  type: AddressType
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2: string | null
  city: string
  postalCode: string
  country: string
  createdAt: Date
}
