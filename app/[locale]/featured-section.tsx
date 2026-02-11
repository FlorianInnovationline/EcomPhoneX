import { getProducts } from "@/lib/data"
import { getTranslations } from "next-intl/server"
import { Section, SectionHeader } from "@/components/storefront/section"
import { FeaturedProductCard } from "./featured-product-card"

export async function FeaturedSection() {
  const t = await getTranslations("home.featured")
  const products = await getProducts({ active: true })
  const featuredProducts = products.slice(0, 3)

  return (
    <Section>
      <div className="container px-4">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div className="grid gap-8 md:gap-12 lg:gap-16 md:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <FeaturedProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </Section>
  )
}
