import { getFeaturedProduct, getBestSellers } from "@/lib/data"
import { HeroSection } from "./hero-section"
import { FeaturedDropSection } from "./featured-drop-section"
import { FeaturedSection } from "./featured-section"
import { BestSellersSection } from "./best-sellers-section"
import { TrustStripSection } from "./trust-strip-section"
import { WhyBuySection } from "./why-buy-section"
import { HorizontalScrollPins } from "@/components/storefront/HorizontalScrollPins"

export default async function HomePage() {
  const featuredProduct = await getFeaturedProduct()
  const bestSellers = await getBestSellers(3)

  return (
    <div className="relative">
      <HeroSection />
      {featuredProduct && <FeaturedDropSection product={featuredProduct} />}
      <FeaturedSection />
      <HorizontalScrollPins />
      <BestSellersSection products={bestSellers} />
      <TrustStripSection />
      <WhyBuySection />
    </div>
  )
}
