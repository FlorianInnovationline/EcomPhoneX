export interface Collection {
  id: string
  slug: string
  name: string
  description: string | null
  imageUrl: string | null
  productIds: string[]
  active: boolean
}

export const mockCollections: Collection[] = [
  {
    id: 'flagship',
    slug: 'flagship',
    name: 'Flagship Series',
    description: 'Our premium flagship devices with cutting-edge technology',
    imageUrl: 'https://via.placeholder.com/1200x600?text=Flagship+Series',
    productIds: ['1', '2', '4'], // Xiaomi 13 Pro, 13, 12T Pro
    active: true,
  },
  {
    id: 'mid-range',
    slug: 'mid-range',
    name: 'Mid-Range Excellence',
    description: 'Perfect balance of performance and value',
    imageUrl: 'https://via.placeholder.com/1200x600?text=Mid-Range',
    productIds: ['3', '5'], // 12T, Redmi Note 12 Pro
    active: true,
  },
  {
    id: 'budget',
    slug: 'budget',
    name: 'Budget Friendly',
    description: 'Great performance at an affordable price',
    imageUrl: 'https://via.placeholder.com/1200x600?text=Budget+Friendly',
    productIds: ['6'], // POCO X5 Pro
    active: true,
  },
]
