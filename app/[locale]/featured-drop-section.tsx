import { ProductSpotlight } from "@/components/storefront/product-spotlight"
import { Section } from "@/components/storefront/section"
import { Product } from "@/lib/types"

export function FeaturedDropSection({ product }: { product: Product }) {
  const specs = product.specs ? [
    product.specs.display,
    product.specs.processor,
    product.specs.camera,
  ].filter(Boolean) : []

  return (
    <Section variant="gradient">
      <ProductSpotlight product={product} specs={specs} />
    </Section>
  )
}
