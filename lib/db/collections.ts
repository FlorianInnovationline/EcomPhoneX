import { prisma } from '../prisma'

export async function getCollections(includeInactive = false) {
  return prisma.collection.findMany({
    where: includeInactive ? undefined : { isActive: true },
    include: {
      products: {
        include: {
          product: {
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
          },
        },
        orderBy: { sortOrder: 'asc' },
      },
      _count: {
        select: { products: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getCollectionBySlug(slug: string) {
  return prisma.collection.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          product: {
            include: {
              variants: {
                where: { active: true },
                orderBy: { price: 'asc' },
              },
              images: {
                orderBy: { sortOrder: 'asc' },
              },
            },
          },
        },
        orderBy: { sortOrder: 'asc' },
      },
    },
  })
}

export async function getCollectionById(id: string) {
  return prisma.collection.findUnique({
    where: { id },
    include: {
      products: {
        include: {
          product: {
            include: {
              variants: true,
              images: true,
            },
          },
        },
        orderBy: { sortOrder: 'asc' },
      },
    },
  })
}
