/**
 * Ensures required categories exist, then assigns existing products to the correct category.
 * Run after add-products. Run db:seed first if you want the full category tree (phones > android > xiaomi).
 *
 * Usage: npm run assign-categories
 */

import { prisma } from '../lib/prisma'

const PRODUCT_TO_CATEGORY_SLUG: Record<string, string> = {
  'xiaomi-13-pro': 'phones',
  'xiaomi-14': 'phones',
  'xiaomi-14-ultra': 'phones',
  'redmi-note-13-pro': 'phones',
  'xiaomi-watch-s3': 'watches',
  'xiaomi-vr-glasses': 'vr-glasses',
  'xiaomi-buds-5': 'earbuds',
  'xiaomi-electric-shaver-s700': 'lifestyle',
  'xiaomi-hair-dryer-h500': 'lifestyle',
  'xiaomi-smart-blender': 'lifestyle',
  'xiaomi-smart-speaker': 'lifestyle',
}

const CATEGORIES_TO_ENSURE: { slug: string; name: string; description: string; parentSlug?: string }[] = [
  { slug: 'phones', name: 'Phones', description: 'Premium smartphones' },
  { slug: 'android', name: 'Android', description: 'Android smartphones', parentSlug: 'phones' },
  { slug: 'xiaomi', name: 'Xiaomi', description: 'Xiaomi smartphones', parentSlug: 'android' },
  { slug: 'watches', name: 'Watches', description: 'Smartwatches and wearables' },
  { slug: 'vr-glasses', name: 'VR Glasses', description: 'Virtual reality headsets' },
  { slug: 'earbuds', name: 'Earbuds', description: 'True wireless earbuds and audio' },
  { slug: 'lifestyle', name: 'Lifestyle', description: 'Personal care & home: shavers, hair dryers, blenders, speakers' },
]

async function ensureCategories() {
  const bySlug: Record<string, { id: string }> = {}
  for (const c of CATEGORIES_TO_ENSURE) {
    const parentId = c.parentSlug ? bySlug[c.parentSlug]?.id ?? null : null
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        name: c.name,
        slug: c.slug,
        description: c.description,
        parentId,
        isActive: true,
        sortOrder: CATEGORIES_TO_ENSURE.indexOf(c) + 1,
      },
    })
    bySlug[c.slug] = { id: cat.id }
  }
  return bySlug
}

async function main() {
  const env = process.env.DATABASE_URL
  if (!env) {
    console.error('❌ DATABASE_URL is not set.')
    process.exit(1)
  }

  console.log('Ensuring categories exist...')
  const bySlug = await ensureCategories()
  const categorySlugs = [...new Set(Object.values(PRODUCT_TO_CATEGORY_SLUG))]
  const categories = await prisma.category.findMany({
    where: { slug: { in: categorySlugs } },
    select: { id: true, slug: true, name: true },
  })
  const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))

  console.log('Assigning products to categories...\n')

  for (const [productSlug, categorySlug] of Object.entries(PRODUCT_TO_CATEGORY_SLUG)) {
    const product = await prisma.product.findUnique({
      where: { slug: productSlug },
      select: { id: true, title: true, primaryCategoryId: true },
    })
    if (!product) {
      console.log(`⏭️  Product not found: ${productSlug}, skipping.`)
      continue
    }

    const category = categoryBySlug[categorySlug]
    if (!category) continue

    if (product.primaryCategoryId === category.id) {
      console.log(`⏭️  "${product.title}" already in ${category.name}, skipping.`)
      continue
    }

    await prisma.$transaction([
      prisma.productCategory.deleteMany({ where: { productId: product.id } }),
      prisma.productCategory.create({
        data: { productId: product.id, categoryId: category.id },
      }),
      prisma.product.update({
        where: { id: product.id },
        data: { primaryCategoryId: category.id },
      }),
    ])
    console.log(`✅ ${product.title} → ${category.name}`)
  }

  console.log('\nDone.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
