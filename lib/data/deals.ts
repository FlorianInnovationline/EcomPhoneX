import { Product } from '../types'
import { mockProducts } from './mock-data'

export interface Deal {
  id: string
  productId: string
  product: Product
  discountPercent: number
  validFrom: Date
  validUntil: Date
  active: boolean
}

const now = new Date()
const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

export const mockDeals: Deal[] = [
  {
    id: 'deal-1',
    productId: '1',
    product: mockProducts[0], // Xiaomi 13 Pro
    discountPercent: 15,
    validFrom: now,
    validUntil: nextWeek,
    active: true,
  },
  {
    id: 'deal-2',
    productId: '3',
    product: mockProducts[2], // Xiaomi 12T
    discountPercent: 20,
    validFrom: now,
    validUntil: nextWeek,
    active: true,
  },
  {
    id: 'deal-3',
    productId: '6',
    product: mockProducts[5], // POCO X5 Pro
    discountPercent: 25,
    validFrom: now,
    validUntil: nextMonth,
    active: true,
  },
]
