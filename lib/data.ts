// Unified data access layer
// This is the ONLY entry point for data access
// Now uses Prisma to read from database

import { Order } from './types'
import type { Deal } from './data/deals'
import * as dbProducts from './db/products'
import * as dbCategories from './db/categories'
import * as dbCollections from './db/collections'
import { prisma } from './prisma'

// Re-export types
export type { Review } from './data/reviews'
export type { Collection } from './data/collections'

// ============================================================================
// PRODUCTS
// ============================================================================

export interface ProductFilters {
  active?: boolean
  brand?: string
  search?: string
  collectionId?: string
  categoryId?: string
  categorySlug?: string
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
}

export async function getProducts(filters?: ProductFilters) {
  const dbFilters: any = {
    status: filters?.active === false ? undefined : 'PUBLISHED', // Default to published unless explicitly inactive
  }

  if (filters?.brand) {
    dbFilters.brand = filters.brand
  }

  if (filters?.search) {
    dbFilters.search = filters.search
  }

  if (filters?.status) {
    dbFilters.status = filters.status
  }

  if (filters?.collectionId) {
    dbFilters.collectionId = filters.collectionId
  }

  if (filters?.categoryId) {
    dbFilters.categoryId = filters.categoryId
  } else if (filters?.categorySlug) {
    const cat = await dbCategories.getCategoryBySlug(filters.categorySlug)
    if (cat) {
      const all = await dbCategories.getCategories(true)
      const descendantIds = new Set<string>([cat.id])
      let added = true
      while (added) {
        added = false
        for (const c of all) {
          if (c.parentId && descendantIds.has(c.parentId) && !descendantIds.has(c.id)) {
            descendantIds.add(c.id)
            added = true
          }
        }
      }
      dbFilters.categoryIds = Array.from(descendantIds)
    }
  }

  const products = await dbProducts.getProducts(dbFilters)

  // Transform Prisma products to match existing Product type
  return products.map((p) => ({
    id: p.id,
    slug: p.slug,
    brand: p.brand,
    name: p.title,
    description: p.description,
    specs: p.specs.reduce((acc: any, spec: any) => {
      if (!acc[spec.group || 'General']) {
        acc[spec.group || 'General'] = {}
      }
      acc[spec.group || 'General'][spec.key] = spec.value
      return acc
    }, {}),
    active: p.status === 'PUBLISHED',
    variants: p.variants.map((v: any) => ({
      id: v.id,
      productId: v.productId,
      sku: v.sku,
      color: v.attributes?.color || null,
      storage: v.attributes?.storage || null,
      price: Number(v.price),
      compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : null,
      cost: v.cost ? Number(v.cost) : null,
      inventory: v.inventoryQty,
      weight: v.weight,
      active: v.active,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
    })),
    images: p.images.length > 0 
      ? p.images.map((img: any) => ({
          id: img.id,
          productId: img.productId,
          url: img.url || '/images/placeholders/phone1.png',
          alt: img.alt,
          sort: img.sortOrder,
          createdAt: img.createdAt,
        }))
      : [{
          id: 'placeholder',
          productId: p.id,
          url: '/images/placeholders/phone1.png',
          alt: p.title,
          sort: 0,
          createdAt: new Date(),
        }],
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }))
}

export async function getProductBySlug(slug: string) {
  const product = await dbProducts.getProductBySlug(slug, false)
  if (!product) return null

  return {
    id: product.id,
    slug: product.slug,
    brand: product.brand,
    name: product.title,
    description: product.description,
    specs: product.specs.reduce((acc: any, spec: any) => {
      if (!acc[spec.group || 'General']) {
        acc[spec.group || 'General'] = {}
      }
      acc[spec.group || 'General'][spec.key] = spec.value
      return acc
    }, {}),
    active: product.status === 'PUBLISHED',
    variants: product.variants.map((v: any) => ({
      id: v.id,
      productId: v.productId,
      sku: v.sku,
      color: v.attributes?.color || null,
      storage: v.attributes?.storage || null,
      price: Number(v.price),
      compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : null,
      cost: v.cost ? Number(v.cost) : null,
      inventory: v.inventoryQty,
      weight: v.weight,
      active: v.active,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
    })),
    images: product.images.map((img: any) => ({
      id: img.id,
      productId: img.productId,
      url: img.url,
      alt: img.alt,
      sort: img.sortOrder,
      createdAt: img.createdAt,
    })),
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }
}

export async function getProductById(id: string) {
  const product = await dbProducts.getProductById(id)
  if (!product) return null

  return {
    id: product.id,
    slug: product.slug,
    brand: product.brand,
    name: product.title,
    description: product.description,
    specs: product.specs.reduce((acc: any, spec: any) => {
      if (!acc[spec.group || 'General']) {
        acc[spec.group || 'General'] = {}
      }
      acc[spec.group || 'General'][spec.key] = spec.value
      return acc
    }, {}),
    active: product.status === 'PUBLISHED',
    variants: product.variants.map((v: any) => ({
      id: v.id,
      productId: v.productId,
      sku: v.sku,
      color: v.attributes?.color || null,
      storage: v.attributes?.storage || null,
      price: Number(v.price),
      compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : null,
      cost: v.cost ? Number(v.cost) : null,
      inventory: v.inventoryQty,
      weight: v.weight,
      active: v.active,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
    })),
    images: product.images.map((img: any) => ({
      id: img.id,
      productId: img.productId,
      url: img.url,
      alt: img.alt,
      sort: img.sortOrder,
      createdAt: img.createdAt,
    })),
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }
}

export async function getBestSellers(limit: number = 3) {
  const products = await dbProducts.getBestSellers(limit)
  return products.map((p: any) => ({
    id: p.id,
    slug: p.slug,
    brand: p.brand,
    name: p.title,
    description: p.description,
    specs: {},
    active: true,
    variants: p.variants.map((v: any) => ({
      id: v.id,
      productId: v.productId,
      sku: v.sku,
      color: v.attributes?.color || null,
      storage: v.attributes?.storage || null,
      price: Number(v.price),
      compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : null,
      cost: v.cost ? Number(v.cost) : null,
      inventory: v.inventoryQty,
      weight: v.weight,
      active: v.active,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
    })),
    images: p.images.length > 0 
      ? p.images.map((img: any) => ({
          id: img.id,
          productId: img.productId,
          url: img.url || '/images/placeholders/phone1.png',
          alt: img.alt,
          sort: img.sortOrder,
          createdAt: img.createdAt,
        }))
      : [{
          id: 'placeholder',
          productId: p.id,
          url: '/images/placeholders/phone1.png',
          alt: p.title,
          sort: 0,
          createdAt: new Date(),
        }],
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }))
}

export async function getFeaturedProduct() {
  const product = await dbProducts.getFeaturedProduct()
  if (!product) return null

  return {
    id: product.id,
    slug: product.slug,
    brand: product.brand,
    name: product.title,
    description: product.description,
    specs: product.specs.reduce((acc: any, spec: any) => {
      if (!acc[spec.group || 'General']) {
        acc[spec.group || 'General'] = {}
      }
      acc[spec.group || 'General'][spec.key] = spec.value
      return acc
    }, {}),
    active: true,
    variants: product.variants.map((v: any) => ({
      id: v.id,
      productId: v.productId,
      sku: v.sku,
      color: v.attributes?.color || null,
      storage: v.attributes?.storage || null,
      price: Number(v.price),
      compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : null,
      cost: v.cost ? Number(v.cost) : null,
      inventory: v.inventoryQty,
      weight: v.weight,
      active: v.active,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
    })),
    images: product.images.map((img: any) => ({
      id: img.id,
      productId: img.productId,
      url: img.url,
      alt: img.alt,
      sort: img.sortOrder,
      createdAt: img.createdAt,
    })),
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }
}

// ============================================================================
// COLLECTIONS
// ============================================================================

export async function getCollections() {
  const collections = await dbCollections.getCollections(false)
  return collections.map((c: any) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description,
    imageUrl: c.products[0]?.product?.images[0]?.url || '/images/placeholders/phone1.png',
    active: c.isActive,
    productIds: c.products.map((cp: any) => cp.product.id),
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
  }))
}

export async function getCollectionBySlug(slug: string) {
  const collection = await dbCollections.getCollectionBySlug(slug)
  if (!collection) return null

  return {
    id: collection.id,
    slug: collection.slug,
    name: collection.name,
    description: collection.description,
    imageUrl: collection.products[0]?.product?.images[0]?.url || null,
    active: collection.isActive,
    productIds: collection.products.map((cp: any) => cp.product.id),
    createdAt: collection.createdAt,
    updatedAt: collection.updatedAt,
  }
}

// ============================================================================
// CATEGORIES (for Lifestyle / grouping)
// ============================================================================

export interface CategoryFlat {
  id: string
  name: string
  slug: string
  parentId: string | null
  sortOrder: number
}

export async function getCategoriesFlat(): Promise<CategoryFlat[]> {
  const list = await dbCategories.getCategories(true)
  return list.map((c: { id: string; name: string; slug: string; parentId: string | null; sortOrder: number }) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    parentId: c.parentId,
    sortOrder: c.sortOrder ?? 0,
  }))
}

export interface ProductWithCategory {
  id: string
  slug: string
  brand: string
  name: string
  description: string | null
  specs: Record<string, unknown>
  active: boolean
  variants: Array<{
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
  }>
  images: Array<{
    id: string
    productId: string
    url: string
    alt: string | null
    sort: number
    createdAt: Date
  }>
  createdAt: Date
  updatedAt: Date
  primaryCategory: { id: string; name: string; slug: string; parentId: string | null } | null
}

export async function getProductsWithPrimaryCategory(): Promise<ProductWithCategory[]> {
  const products = await dbProducts.getProducts({ status: 'PUBLISHED' })
  return products.map((p: any) => ({
    id: p.id,
    slug: p.slug,
    brand: p.brand,
    name: p.title,
    description: p.description,
    specs: p.specs.reduce((acc: any, spec: any) => {
      if (!acc[spec.group || 'General']) acc[spec.group || 'General'] = {}
      acc[spec.group || 'General'][spec.key] = spec.value
      return acc
    }, {}),
    active: p.status === 'PUBLISHED',
    variants: p.variants.map((v: any) => ({
      id: v.id,
      productId: v.productId,
      sku: v.sku,
      color: v.attributes?.color ?? null,
      storage: v.attributes?.storage ?? null,
      price: Number(v.price),
      compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : null,
      cost: v.cost ? Number(v.cost) : null,
      inventory: v.inventoryQty,
      weight: v.weight,
      active: v.active,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
    })),
    images: p.images?.length > 0
      ? p.images.map((img: any) => ({
          id: img.id,
          productId: img.productId,
          url: img.url || '/images/placeholders/phone1.png',
          alt: img.alt,
          sort: img.sortOrder,
          createdAt: img.createdAt,
        }))
      : [{ id: 'placeholder', productId: p.id, url: '/images/placeholders/phone1.png', alt: p.title, sort: 0, createdAt: new Date() }],
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    primaryCategory: p.primaryCategory
      ? { id: p.primaryCategory.id, name: p.primaryCategory.name, slug: p.primaryCategory.slug, parentId: p.primaryCategory.parentId }
      : null,
  }))
}

// ============================================================================
// DEALS (Mock for now)
// ============================================================================

export async function getDeals(): Promise<Deal[]> {
  // TODO: Implement deals in database
  return []
}

// ============================================================================
// REVIEWS
// ============================================================================

export async function getReviews(productId: string) {
  const reviews = await prisma.review.findMany({
    where: { productId },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  })

  return reviews.map((r) => ({
    id: r.id,
    productId: r.productId,
    userId: r.userId,
    userName: r.userName || r.user?.name || 'Anonymous',
    rating: r.rating,
    comment: r.comment,
    createdAt: r.createdAt,
  }))
}

export async function getAverageRating(productId: string): Promise<number> {
  const reviews = await getReviews(productId)
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  return sum / reviews.length
}

// ============================================================================
// ORDERS
// ============================================================================

export async function getOrders(): Promise<Order[]> {
  const orders = await prisma.order.findMany({
    include: {
      items: true,
      addresses: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return orders.map((o) => ({
    id: o.id,
    userId: o.userId,
    email: o.email,
    status: o.status,
    currency: o.currency,
    subtotal: Number(o.subtotal),
    shipping: Number(o.shipping),
    tax: Number(o.tax),
    total: Number(o.total),
    stripePaymentIntentId: o.stripePaymentIntentId,
    items: o.items.map((item) => ({
      id: item.id,
      orderId: item.orderId,
      variantId: item.variantId,
      nameSnapshot: item.nameSnapshot,
      skuSnapshot: item.skuSnapshot,
      priceSnapshot: Number(item.priceSnapshot),
      costSnapshot: item.costSnapshot ? Number(item.costSnapshot) : null,
      quantity: item.qty,
      createdAt: item.createdAt,
    })),
    addresses: o.addresses.map((addr) => ({
      id: addr.id,
      orderId: addr.orderId,
      type: addr.type,
      firstName: addr.firstName,
      lastName: addr.lastName,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2,
      city: addr.city,
      postalCode: addr.postalCode,
      country: addr.country,
      createdAt: addr.createdAt,
    })),
    createdAt: o.createdAt,
    updatedAt: o.updatedAt,
  }))
}

export async function getOrderById(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
      addresses: true,
    },
  })

  if (!order) return null

  return {
    id: order.id,
    userId: order.userId,
    email: order.email,
    status: order.status,
    currency: order.currency,
    subtotal: Number(order.subtotal),
    shipping: Number(order.shipping),
    tax: Number(order.tax),
    total: Number(order.total),
    stripePaymentIntentId: order.stripePaymentIntentId,
    items: order.items.map((item) => ({
      id: item.id,
      orderId: item.orderId,
      variantId: item.variantId,
      nameSnapshot: item.nameSnapshot,
      skuSnapshot: item.skuSnapshot,
      priceSnapshot: Number(item.priceSnapshot),
      costSnapshot: item.costSnapshot ? Number(item.costSnapshot) : null,
      quantity: item.qty,
      createdAt: item.createdAt,
    })),
    addresses: order.addresses.map((addr) => ({
      id: addr.id,
      orderId: addr.orderId,
      type: addr.type,
      firstName: addr.firstName,
      lastName: addr.lastName,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2,
      city: addr.city,
      postalCode: addr.postalCode,
      country: addr.country,
      createdAt: addr.createdAt,
    })),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  }
}

export async function getOrderByTrackingNumber(trackingNumber: string) {
  // TODO: Implement tracking number lookup
  return null
}

