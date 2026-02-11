import { notFound } from "next/navigation"
import { ProductPageClient } from "./client"
import { getProductBySlug } from "@/lib/data"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // Transform to component format
  const productData = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description || "",
    price: product.variants[0]?.price || 0,
    variants: product.variants
      .filter(v => v.active)
      .map((v) => ({
        id: v.id,
        storage: v.storage || "",
        color: v.color || "",
        price: v.price,
        inventory: v.inventory,
      })),
    specs: (product.specs as Record<string, string>) || {},
    images: product.images.map((img) => ({
      url: img.url,
      alt: img.alt || product.name,
    })),
  }

  return <ProductPageClient product={productData} />
}
