import { getDeals } from "@/lib/data"
import { Section, SectionHeader } from "@/components/storefront/section"
import { ProductTile } from "@/components/storefront/product-tile"
import { formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default async function DealsPage() {
  const deals = await getDeals()

  return (
    <div>
      <Section className="pt-24 pb-16">
        <div className="container px-4">
          <SectionHeader 
            title="Special Deals" 
            subtitle="Limited time offers on premium devices"
          />
        </div>
      </Section>

      <Section>
        <div className="container px-4">
          {deals.length > 0 ? (
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {deals.map((deal) => {
                const discountedPrice = deal.product.variants[0].price * (1 - deal.discountPercent / 100)
                return (
                  <div key={deal.id} className="relative">
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-foreground text-background text-sm px-4 py-1 rounded-full">
                        -{deal.discountPercent}%
                      </Badge>
                    </div>
                    <ProductTile product={deal.product} />
                    <div className="mt-4 text-center">
                      <div className="text-sm text-muted-foreground/60 line-through mb-1">
                        {formatPrice(deal.product.variants[0].price)}
                      </div>
                      <div className="text-2xl font-light">
                        {formatPrice(discountedPrice)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground/80 text-lg font-light">
                No deals available at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </Section>
    </div>
  )
}
