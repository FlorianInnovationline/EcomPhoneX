/**
 * Terminal script to add products to the database.
 * Products appear in the storefront and in the admin dashboard.
 *
 * Usage:
 *   npm run add-products
 *   npm run add-products -- scripts/my-products.json
 *
 * Default: scripts/products-to-add.json (falls back to products-to-add.example.json if missing).
 * Expects DATABASE_URL in .env or in the environment.
 */

import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { createProduct, type CreateProductInput } from '../lib/db/products'
import { prisma } from '../lib/prisma'

function loadJsonProducts(filePath: string): CreateProductInput[] {
  const raw = readFileSync(filePath, 'utf-8')
  const data = JSON.parse(raw)
  const list = Array.isArray(data) ? data : data.products ?? []
  return list as CreateProductInput[]
}

async function main() {
  const env = process.env.DATABASE_URL
  if (!env) {
    console.error('❌ DATABASE_URL is not set. Create a .env file or export DATABASE_URL.')
    process.exit(1)
  }

  const defaultPath = resolve(process.cwd(), 'scripts/products-to-add.json')
  const examplePath = resolve(process.cwd(), 'scripts/products-to-add.example.json')
  const rawArg = process.argv[2]
  const customPath = rawArg && typeof rawArg === 'string' && !rawArg.startsWith('#')
    ? resolve(process.cwd(), rawArg)
    : null
  const jsonPath = customPath && existsSync(customPath)
    ? customPath
    : existsSync(defaultPath)
      ? defaultPath
      : examplePath

  if (!existsSync(jsonPath)) {
    console.error('❌ File not found:', customPath || defaultPath)
    console.log('\nUsage: npm run add-products [path/to/products.json]')
    console.log('Default: scripts/products-to-add.json or scripts/products-to-add.example.json')
    process.exit(1)
  }

  if (jsonPath === examplePath) {
    console.log('ℹ️  Using example file: scripts/products-to-add.example.json\n')
  }

  const products = loadJsonProducts(jsonPath)
  if (products.length === 0) {
    console.log('No products in file. Exiting.')
    process.exit(0)
  }

  console.log(`Adding ${products.length} product(s)...\n`)

  for (let i = 0; i < products.length; i++) {
    const p = products[i]
    try {
      const existing = await prisma.product.findUnique({ where: { slug: p.slug } })
      if (existing) {
        console.log(`⏭️  "${p.title}" (slug: ${p.slug}) already exists, skipping.`)
        continue
      }
      await createProduct(p)
      console.log(`✅ Added: ${p.title} (${p.slug})`)
    } catch (e) {
      console.error(`❌ Failed to add "${p.title}" (${p.slug}):`, e)
    }
  }

  console.log('\nDone. Refresh the admin dashboard to see the new products.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
