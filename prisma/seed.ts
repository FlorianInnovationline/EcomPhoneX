import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  const adminEmail = 'admin@xenomobile.com'
  const adminPassword = await hash('admin123', 10)

  // Check if admin exists
  let admin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (!admin) {
    admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Admin User',
        role: 'ADMIN',
      },
    })
    console.log('✅ Created admin user:', adminEmail)
  } else {
    console.log('ℹ️  Admin user already exists')
  }

  // Create categories
  const phonesCategory = await prisma.category.upsert({
    where: { slug: 'phones' },
    update: {},
    create: {
      name: 'Phones',
      slug: 'phones',
      description: 'Premium smartphones',
      isActive: true,
      sortOrder: 1,
    },
  })

  const androidCategory = await prisma.category.upsert({
    where: { slug: 'android' },
    update: {},
    create: {
      name: 'Android',
      slug: 'android',
      description: 'Android smartphones',
      parentId: phonesCategory.id,
      isActive: true,
      sortOrder: 1,
    },
  })

  const xiaomiCategory = await prisma.category.upsert({
    where: { slug: 'xiaomi' },
    update: {},
    create: {
      name: 'Xiaomi',
      slug: 'xiaomi',
      description: 'Xiaomi smartphones',
      parentId: androidCategory.id,
      isActive: true,
      sortOrder: 1,
    },
  })

  const watchesCategory = await prisma.category.upsert({
    where: { slug: 'watches' },
    update: {},
    create: {
      name: 'Watches',
      slug: 'watches',
      description: 'Smartwatches and wearables',
      isActive: true,
      sortOrder: 2,
    },
  })

  const vrCategory = await prisma.category.upsert({
    where: { slug: 'vr-glasses' },
    update: {},
    create: {
      name: 'VR Glasses',
      slug: 'vr-glasses',
      description: 'Virtual reality headsets',
      isActive: true,
      sortOrder: 3,
    },
  })

  const earbudsCategory = await prisma.category.upsert({
    where: { slug: 'earbuds' },
    update: {},
    create: {
      name: 'Earbuds',
      slug: 'earbuds',
      description: 'True wireless earbuds and audio',
      isActive: true,
      sortOrder: 4,
    },
  })

  const lifestyleCategory = await prisma.category.upsert({
    where: { slug: 'lifestyle' },
    update: {},
    create: {
      name: 'Lifestyle',
      slug: 'lifestyle',
      description: 'Personal care & home: shavers, hair dryers, blenders, speakers',
      isActive: true,
      sortOrder: 5,
    },
  })

  console.log('✅ Created categories')

  // Create sample products
  const xiaomi13Pro = await prisma.product.upsert({
    where: { slug: 'xiaomi-13-pro' },
    update: {},
    create: {
      title: 'Xiaomi 13 Pro',
      slug: 'xiaomi-13-pro',
      brand: 'Xiaomi',
      shortDescription: 'Flagship smartphone with Leica cameras',
      description: 'The Xiaomi 13 Pro features a premium design with Leica-tuned cameras, Snapdragon 8 Gen 2, and a stunning display.',
      status: 'PUBLISHED',
      isFeatured: true,
      primaryCategoryId: xiaomiCategory.id,
      categories: {
        create: {
          categoryId: xiaomiCategory.id,
        },
      },
      variants: {
        create: [
          {
            sku: 'XIA-13P-256-BLK',
            price: 899.99,
            compareAtPrice: 1099.99,
            cost: 650.00,
            currency: 'EUR',
            inventoryQty: 50,
            trackInventory: true,
            attributes: { color: 'Black', storage: '256GB' },
            active: true,
          },
          {
            sku: 'XIA-13P-512-BLK',
            price: 1099.99,
            compareAtPrice: 1299.99,
            cost: 800.00,
            currency: 'EUR',
            inventoryQty: 30,
            trackInventory: true,
            attributes: { color: 'Black', storage: '512GB' },
            active: true,
          },
        ],
      },
      images: {
        create: [
          {
            url: '/images/placeholders/phone1.png',
            alt: 'Xiaomi 13 Pro',
            sortOrder: 0,
          },
        ],
      },
      specs: {
        create: [
          { key: 'Display', value: '6.73" AMOLED, 120Hz', group: 'Display', sortOrder: 1 },
          { key: 'Processor', value: 'Snapdragon 8 Gen 2', group: 'Performance', sortOrder: 1 },
          { key: 'RAM', value: '12GB', group: 'Performance', sortOrder: 2 },
          { key: 'Camera', value: '50MP Leica Triple Camera', group: 'Camera', sortOrder: 1 },
          { key: 'Battery', value: '4820mAh, 120W Fast Charging', group: 'Battery', sortOrder: 1 },
        ],
      },
    },
  })

  const xiaomi14 = await prisma.product.upsert({
    where: { slug: 'xiaomi-14' },
    update: {},
    create: {
      title: 'Xiaomi 14',
      slug: 'xiaomi-14',
      brand: 'Xiaomi',
      shortDescription: 'Latest flagship with advanced photography',
      description: 'The Xiaomi 14 delivers cutting-edge performance with the latest Snapdragon processor and professional-grade cameras.',
      status: 'PUBLISHED',
      isFeatured: false,
      primaryCategoryId: xiaomiCategory.id,
      categories: {
        create: {
          categoryId: xiaomiCategory.id,
        },
      },
      variants: {
        create: [
          {
            sku: 'XIA-14-256-BLU',
            price: 799.99,
            compareAtPrice: 949.99,
            cost: 580.00,
            currency: 'EUR',
            inventoryQty: 40,
            trackInventory: true,
            attributes: { color: 'Blue', storage: '256GB' },
            active: true,
          },
        ],
      },
      images: {
        create: [
          {
            url: '/images/placeholders/xiaomi13pro.png',
            alt: 'Xiaomi 14',
            sortOrder: 0,
          },
        ],
      },
      specs: {
        create: [
          { key: 'Display', value: '6.36" AMOLED, 120Hz', group: 'Display', sortOrder: 1 },
          { key: 'Processor', value: 'Snapdragon 8 Gen 3', group: 'Performance', sortOrder: 1 },
          { key: 'RAM', value: '12GB', group: 'Performance', sortOrder: 2 },
          { key: 'Camera', value: '50MP Triple Camera System', group: 'Camera', sortOrder: 1 },
          { key: 'Battery', value: '4610mAh, 90W Fast Charging', group: 'Battery', sortOrder: 1 },
        ],
      },
    },
  })

  console.log('✅ Created sample products')

  // Create collection
  const featuredCollection = await prisma.collection.upsert({
    where: { slug: 'featured-xiaomi' },
    update: {},
    create: {
      name: 'Featured Xiaomi',
      slug: 'featured-xiaomi',
      description: 'Our top Xiaomi smartphones',
      isActive: true,
      products: {
        create: [
          { productId: xiaomi13Pro.id, sortOrder: 0 },
          { productId: xiaomi14.id, sortOrder: 1 },
        ],
      },
    },
  })

  console.log('✅ Created collections')

  // Create homepage sections
  await prisma.homepageSection.upsert({
    where: { id: 'featured-drop' },
    update: {},
    create: {
      id: 'featured-drop',
      type: 'featured',
      title: 'Featured Drop',
      subtitle: 'Discover our latest flagship',
      sortOrder: 1,
      isActive: true,
      payload: {
        productIds: [xiaomi13Pro.id],
      },
    },
  })

  await prisma.homepageSection.upsert({
    where: { id: 'featured-collection' },
    update: {},
    create: {
      id: 'featured-collection',
      type: 'collection',
      title: 'Featured Xiaomi',
      subtitle: 'Premium smartphones',
      sortOrder: 2,
      isActive: true,
      payload: {
        collectionId: featuredCollection.id,
      },
    },
  })

  console.log('✅ Created homepage sections')

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
