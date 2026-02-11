import { prisma } from '../prisma'

export async function getCategories(includeInactive = false) {
  return prisma.category.findMany({
    where: includeInactive ? undefined : { isActive: true },
    include: {
      parent: true,
      children: {
        where: includeInactive ? undefined : { isActive: true },
        orderBy: { sortOrder: 'asc' },
      },
      _count: {
        select: { products: true },
      },
    },
    orderBy: { sortOrder: 'asc' },
  })
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      parent: true,
      children: {
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
  })
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({
    where: { id },
    include: {
      parent: true,
      children: true,
      _count: {
        select: { products: true },
      },
    },
  })
}

export async function getCategoryBySlugForAdmin(slug: string) {
  return prisma.category.findUnique({ where: { slug } })
}

export interface CreateCategoryInput {
  name: string
  slug: string
  description?: string | null
  parentId?: string | null
  sortOrder?: number
  isActive?: boolean
}

export async function createCategory(input: CreateCategoryInput) {
  return prisma.category.create({
    data: {
      name: input.name,
      slug: input.slug,
      description: input.description ?? null,
      parentId: input.parentId ?? null,
      sortOrder: input.sortOrder ?? 0,
      isActive: input.isActive ?? true,
    },
  })
}

export interface UpdateCategoryInput {
  name?: string
  slug?: string
  description?: string | null
  parentId?: string | null
  sortOrder?: number
  isActive?: boolean
}

export async function updateCategory(id: string, input: UpdateCategoryInput) {
  return prisma.category.update({
    where: { id },
    data: {
      ...(input.name != null && { name: input.name }),
      ...(input.slug != null && { slug: input.slug }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.parentId !== undefined && { parentId: input.parentId }),
      ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
    },
  })
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({
    where: { id },
  })
}
