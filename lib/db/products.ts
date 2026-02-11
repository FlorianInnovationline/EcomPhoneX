import { prisma } from '../prisma'
import { ProductStatus } from '@prisma/client'

export interface ProductFilters {
  status?: ProductStatus
  categoryId?: string
  brand?: string
  search?: string
  isFeatured?: boolean
  inventoryLow?: boolean
  priceMin?: number
  priceMax?: number
}

export async function getProducts(filters?: ProductFilters) {
  const where: any = {}

  if (filters?.status) {
    where.status = filters.status
  }

  if (filters?.brand) {
    where.brand = filters.brand
  }

  if (filters?.isFeatured !== undefined) {
    where.isFeatured = filters.isFeatured
  }

  if (filters?.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { slug: { contains: filters.search, mode: 'insensitive' } },
      { brand: { contains: filters.search, mode: 'insensitive' } },
    ]
  }

  if (filters?.categoryId) {
    where.OR = [
      { primaryCategoryId: filters.categoryId },
      { categories: { some: { categoryId: filters.categoryId } } },
    ]
  }

  if (filters?.inventoryLow) {
    where.variants = {
      some: {
        inventoryQty: { lte: 10 },
        trackInventory: true,
      },
    }
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      primaryCategory: true,
      categories: { include: { category: true } },
      variants: {
        where: { active: true },
        orderBy: { price: 'asc' },
      },
      images: {
        orderBy: { sortOrder: 'asc' },
      },
      specs: {
        orderBy: [{ group: 'asc' }, { sortOrder: 'asc' }],
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  // Filter by price range if specified
  if (filters?.priceMin !== undefined || filters?.priceMax !== undefined) {
    return products.filter((product) => {
      const minPrice = Math.min(...product.variants.map((v) => Number(v.price)))
      if (filters.priceMin !== undefined && minPrice < filters.priceMin) return false
      if (filters.priceMax !== undefined && minPrice > filters.priceMax) return false
      return true
    })
  }

  return products
}

export async function getProductBySlug(slug: string, includeDrafts = false) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      primaryCategory: true,
      categories: { include: { category: true } },
      variants: {
        where: includeDrafts ? undefined : { active: true },
        orderBy: { price: 'asc' },
      },
      images: {
        orderBy: { sortOrder: 'asc' },
      },
      specs: {
        orderBy: [{ group: 'asc' }, { sortOrder: 'asc' }],
      },
      reviews: {
        include: { user: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!product) return null
  if (!includeDrafts && product.status !== 'PUBLISHED') return null

  return product
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      primaryCategory: true,
      categories: { include: { category: true } },
      variants: true,
      images: { orderBy: { sortOrder: 'asc' } },
      specs: { orderBy: [{ group: 'asc' }, { sortOrder: 'asc' }] },
    },
  })
}

export async function getBestSellers(limit = 3) {
  // For now, return featured products. Later, calculate from order data
  return prisma.product.findMany({
    where: {
      status: 'PUBLISHED',
      isFeatured: true,
    },
    include: {
      variants: {
        where: { active: true },
        orderBy: { price: 'asc' },
        take: 1,
      },
      images: {
        orderBy: { sortOrder: 'asc' },
        take: 1,
      },
    },
    take: limit,
    orderBy: { createdAt: 'desc' },
  })
}

export async function getFeaturedProduct() {
  return prisma.product.findFirst({
    where: {
      status: 'PUBLISHED',
      isFeatured: true,
    },
    include: {
      variants: {
        where: { active: true },
        orderBy: { price: 'asc' },
      },
      images: {
        orderBy: { sortOrder: 'asc' },
      },
      specs: {
        orderBy: [{ group: 'asc' }, { sortOrder: 'asc' }],
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}
