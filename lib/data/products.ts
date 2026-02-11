// Data access layer - replace with real API calls later
// This abstraction allows easy backend integration without refactoring

import { Product } from '../types'
import { mockProducts } from './mock-data'

export interface ProductFilters {
  active?: boolean
  brand?: string
  search?: string
}

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  // TODO: Replace with real API call
  // const response = await fetch('/api/products', { ... })
  // return response.json()

  let products = [...mockProducts]

  if (filters?.active !== undefined) {
    products = products.filter(p => p.active === filters.active)
  }

  if (filters?.brand) {
    products = products.filter(p => p.brand === filters.brand)
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase()
    products = products.filter(
      p =>
        p.name.toLowerCase().includes(searchLower) ||
        (p.description?.toLowerCase().includes(searchLower) ?? false)
    )
  }

  return products
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // TODO: Replace with real API call
  // const response = await fetch(`/api/products/${slug}`)
  // return response.json()

  return mockProducts.find(p => p.slug === slug && p.active) || null
}

export async function getProductById(id: string): Promise<Product | null> {
  // TODO: Replace with real API call
  return mockProducts.find(p => p.id === id) || null
}
