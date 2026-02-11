import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const collectionId = searchParams.get('collectionId')
  const search = searchParams.get('search')
  const active = searchParams.get('active') !== 'false'

  try {
    const products = await getProducts({
      active,
      collectionId: collectionId || undefined,
      search: search || undefined,
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
