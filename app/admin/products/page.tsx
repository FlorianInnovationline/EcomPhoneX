import { requireAdmin } from "@/lib/auth-helpers"
import { getProducts } from "@/lib/db/products"
import { ProductsList } from "./products-list"

export default async function AdminProductsPage() {
  await requireAdmin()
  const products = await getProducts({}) // Get all products including drafts

  return <ProductsList products={products} />
}
