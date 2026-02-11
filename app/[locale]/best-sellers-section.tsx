"use client"

import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { Section, SectionHeader } from "@/components/storefront/section"
import { ProductTile } from "@/components/storefront/product-tile"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/types"

export function BestSellersSection({ products }: { products: Product[] }) {
  const t = useTranslations("home.bestSellers")
  const router = useRouter()

  return (
    <Section>
      <div className="container px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <SectionHeader 
            title={t("title") || "Best Sellers"} 
            subtitle={t("subtitle")} 
            align="left" 
            className="mb-0" 
          />
          <Button
            variant="ghost"
            onClick={() => router.push("/shop")}
            className="rounded-full font-light w-full sm:w-auto min-h-[44px]"
          >
            View All →
          </Button>
        </div>
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product, index) => (
            <ProductTile key={product.id} product={product} priority={index === 0} />
          ))}
        </div>
      </div>
    </Section>
  )
}
