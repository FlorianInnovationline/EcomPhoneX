// Mock orders data - replace with real API calls later
import { Order, OrderStatus } from '../types'

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    userId: null,
    email: 'customer@example.com',
    status: 'PAID',
    currency: 'EUR',
    subtotal: 899.00,
    shipping: 0,
    tax: 206.77,
    total: 1105.77,
    stripePaymentIntentId: 'pi_mock_1',
    items: [],
    addresses: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'order-2',
    userId: null,
    email: 'customer2@example.com',
    status: 'FULFILLED',
    currency: 'EUR',
    subtotal: 1299.00,
    shipping: 0,
    tax: 298.77,
    total: 1597.77,
    stripePaymentIntentId: 'pi_mock_2',
    items: [],
    addresses: [],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
  },
]

export async function getOrders(): Promise<Order[]> {
  // TODO: Replace with real API call
  return mockOrders
}

export async function getOrderById(id: string): Promise<Order | null> {
  // TODO: Replace with real API call
  return mockOrders.find(o => o.id === id) || null
}
