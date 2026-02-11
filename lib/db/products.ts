import { prisma } from '../prisma'
import { ProductStatus } from '@prisma/client'

// Input type for creating a product (used by admin API and CLI script)
export interface CreateProductInput {
  title: string
  slug: string
  brand: string
  shortDescription?: string | null
  description?: string | null
  status?: ProductStatus
  isFeatured?: boolean
  primaryCategoryId?: string | null
  categoryIds?: string[]
  variants: {
    sku: string
    price: number
    compareAtPrice?: number | null
    cost?: number | null
    currency?: string
    inventoryQty?: number
    trackInventory?: boolean
    attributes?: Record<string, string> | null
    barcode?: string | null
    weight?: number | null
    active?: boolean
  }[]
  images?: {
    url: string
    alt?: string | null
    sortOrder?: number
  }[]
  specs?: {
    key: string
    value: string
    group?: string | null
    sortOrder?: number
  }[]
}

export interface ProductFilters {
  status?: ProductStatus
  categoryId?: string
  categoryIds?: string[]
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

  const searchClause =
    filters?.search
      ? [
          { title: { contains: filters.search, mode: 'insensitive' as const } },
          { slug: { contains: filters.search, mode: 'insensitive' as const } },
          { brand: { contains: filters.search, mode: 'insensitive' as const } },
        ]
      : null

  const categoryClause =
    filters?.categoryIds?.length
      ? [
          { primaryCategoryId: { in: filters.categoryIds } },
          { categories: { some: { categoryId: { in: filters.categoryIds } } } },
        ]
      : filters?.categoryId
        ? [
            { primaryCategoryId: filters.categoryId },
            { categories: { some: { categoryId: filters.categoryId } } },
          ]
        : null

  if (searchClause && categoryClause) {
    where.AND = [
      { OR: searchClause },
      { OR: categoryClause },
    ]
  } else if (searchClause) {
    where.OR = searchClause
  } else if (categoryClause) {
    where.OR = categoryClause
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

export async function createProduct(input: CreateProductInput) {
  if (input.variants.length === 0) {
    throw new Error('At least one variant is required')
  }
  const categoryIds = input.categoryIds ?? (input.primaryCategoryId ? [input.primaryCategoryId] : [])
  return prisma.product.create({
    data: {
      title: input.title,
      slug: input.slug,
      brand: input.brand,
      shortDescription: input.shortDescription ?? null,
      description: input.description ?? null,
      status: input.status ?? 'PUBLISHED',
      isFeatured: input.isFeatured ?? false,
      primaryCategoryId: input.primaryCategoryId ?? null,
      categories:
        categoryIds.length > 0
          ? {
              create: categoryIds.map((categoryId) => ({ categoryId })),
            }
          : undefined,
      variants: {
        create: input.variants.map((v) => ({
          sku: v.sku,
          price: v.price,
          compareAtPrice: v.compareAtPrice ?? null,
          cost: v.cost ?? null,
          currency: v.currency ?? 'EUR',
          inventoryQty: v.inventoryQty ?? 0,
          trackInventory: v.trackInventory ?? true,
          attributes: v.attributes ?? null,
          barcode: v.barcode ?? null,
          weight: v.weight ?? null,
          active: v.active ?? true,
        })),
      },
      images:
        (input.images?.length ?? 0) > 0
          ? {
              create: (input.images ?? []).map((img, i) => ({
                url: img.url,
                alt: img.alt ?? null,
                sortOrder: img.sortOrder ?? i,
              })),
            }
          : {
              create: [
                {
                  url: '/images/placeholders/phone1.png',
                  alt: input.title,
                  sortOrder: 0,
                },
              ],
            },
      specs:
        (input.specs?.length ?? 0) > 0
          ? {
              create: (input.specs ?? []).map((s, i) => ({
                key: s.key,
                value: s.value,
                group: s.group ?? null,
                sortOrder: s.sortOrder ?? i,
              })),
            }
          : undefined,
    },
    include: {
      primaryCategory: true,
      categories: { include: { category: true } },
      variants: true,
      images: { orderBy: { sortOrder: 'asc' } },
      specs: { orderBy: [{ group: 'asc' }, { sortOrder: 'asc' }] },
    },
  })
}

export interface UpdateProductInput {
  title?: string
  slug?: string
  brand?: string
  shortDescription?: string | null
  description?: string | null
  status?: ProductStatus
  isFeatured?: boolean
  primaryCategoryId?: string | null
  categoryIds?: string[]
  /** Remove these image IDs (delete from DB) */
  imageIdsToRemove?: string[]
  /** Add new images (create ProductImage records) */
  newImages?: { url: string; alt?: string | null }[]
}

export async function updateProduct(id: string, input: UpdateProductInput) {
  const categoryIds = input.categoryIds
  if (input.imageIdsToRemove?.length) {
    await prisma.productImage.deleteMany({
      where: { productId: id, id: { in: input.imageIdsToRemove } },
    })
  }
  if (input.newImages?.length) {
    const nextOrder =
      (await prisma.productImage.findMany({ where: { productId: id }, select: { sortOrder: true }, orderBy: { sortOrder: 'desc' }, take: 1 }))[0]?.sortOrder ?? -1
    await prisma.productImage.createMany({
      data: input.newImages.map((img, i) => ({
        productId: id,
        url: img.url,
        alt: img.alt ?? null,
        sortOrder: nextOrder + 1 + i,
      })),
    })
  }
  const data: Record<string, unknown> = {
    ...(input.title != null && { title: input.title }),
    ...(input.slug != null && { slug: input.slug }),
    ...(input.brand != null && { brand: input.brand }),
    ...(input.shortDescription !== undefined && { shortDescription: input.shortDescription }),
    ...(input.description !== undefined && { description: input.description }),
    ...(input.status != null && { status: input.status }),
    ...(input.isFeatured !== undefined && { isFeatured: input.isFeatured }),
    ...(input.primaryCategoryId !== undefined && { primaryCategoryId: input.primaryCategoryId }),
  }
  if (categoryIds !== undefined) {
    await prisma.productCategory.deleteMany({ where: { productId: id } })
    data.categories = {
      create: categoryIds.map((categoryId) => ({ categoryId })),
    }
  }
  return prisma.product.update({
    where: { id },
    data,
    include: {
      primaryCategory: true,
      categories: { include: { category: true } },
      variants: true,
      images: { orderBy: { sortOrder: 'asc' } },
      specs: { orderBy: [{ group: 'asc' }, { sortOrder: 'asc' }] },
    },
  })
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id },
  })
}
