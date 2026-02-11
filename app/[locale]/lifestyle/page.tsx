import { getCategoriesFlat, getProductsWithPrimaryCategory } from "@/lib/data"
import { LifestyleClient } from "./lifestyle-client"
import { getTranslations } from "next-intl/server"
import { Product } from "@/lib/types"

function findRootCategoryId(
  categoryId: string,
  map: Map<string, { id: string; parentId: string | null }>
): string | null {
  const c = map.get(categoryId)
  if (!c) return null
  if (!c.parentId) return c.id
  return findRootCategoryId(c.parentId, map)
}

export default async function LifestylePage() {
  const [categories, productsWithCat] = await Promise.all([
    getCategoriesFlat(),
    getProductsWithPrimaryCategory(),
  ])

  const categoryMap = new Map(categories.map((c) => [c.id, { id: c.id, parentId: c.parentId }]))
  const rootCategories = categories.filter((c) => !c.parentId).sort((a, b) => a.sortOrder - b.sortOrder)

  const byRootId = new Map<string, Product[]>()
  for (const p of productsWithCat) {
    const product: Product = {
      id: p.id,
      slug: p.slug,
      brand: p.brand,
      name: p.name,
      description: p.description,
      specs: p.specs,
      active: p.active,
      variants: p.variants,
      images: p.images,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }
    const rootId = p.primaryCategory ? findRootCategoryId(p.primaryCategory.id, categoryMap) : null
    if (!rootId) continue
    if (!byRootId.has(rootId)) byRootId.set(rootId, [])
    byRootId.get(rootId)!.push(product)
  }

  const sections = rootCategories
    .filter((root) => (byRootId.get(root.id)?.length ?? 0) > 0)
    .map((root) => ({
      slug: root.slug,
      name: root.name,
      description: root.slug === "phones" ? null : null,
      products: byRootId.get(root.id) ?? [],
    }))

  const t = await getTranslations("lifestyle")
  const categoryKeys: Record<string, string> = {}
  for (const sec of sections) {
    const key = `category_${sec.slug.replace(/-/g, "_")}`
    const label = t(key)
    categoryKeys[sec.slug] = label === key ? sec.name : label
  }

  return (
    <LifestyleClient
      sections={sections}
      categoryKeys={categoryKeys}
    />
  )
}
