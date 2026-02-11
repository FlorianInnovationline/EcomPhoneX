import { getProducts } from "@/lib/data"
import { ShopClient } from "./shop-client"

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const params = await searchParams
  const products = await getProducts({
    active: true,
    search: params.search,
  })

  return <ShopClient products={products} searchQuery={params.search} />
}
