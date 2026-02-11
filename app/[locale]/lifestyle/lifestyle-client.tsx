"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { LifestyleProductCard } from "./lifestyle-product-card"
import { Section } from "@/components/storefront/section"
import { Product } from "@/lib/types"
import { ChevronRight } from "lucide-react"

export interface LifestyleSection {
  slug: string
  name: string
  description?: string | null
  products: Product[]
}

export function LifestyleClient({
  sections,
  categoryKeys,
}: {
  sections: LifestyleSection[]
  categoryKeys: Record<string, string>
}) {
  const t = useTranslations("lifestyle")
  const containerRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  return (
    <div ref={containerRef}>
      {/* Hero — clean title + subtitle */}
      <Section className="pt-20 sm:pt-24 pb-14 sm:pb-20" noPadding>
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs sm:text-sm font-light text-muted-foreground/70 uppercase tracking-wider mb-2">
              {t("breadcrumb")}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground">
              {t("title")}
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground/80 font-light max-w-xl">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Category sections — large centered title, then grid */}
      {sections.map((sec, index) => (
        <div key={sec.slug} id={`category-${sec.slug}`} className="scroll-mt-24">
          <Section variant={index % 2 === 0 ? "default" : "muted"}>
            <div className="container px-4 sm:px-6 lg:px-8">
              {/* Category title — large, bold, centered */}
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                  {categoryKeys[sec.slug] ?? sec.name}
                </h2>
                <Link
                  href={`/shop?category=${encodeURIComponent(sec.slug)}`}
                  className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {t("viewAll")}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Product grid — 2 cols mobile, 3 tablet, 4 desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {sec.products.slice(0, 7).map((product, i) => (
                  <LifestyleProductCard
                    key={product.id}
                    product={product}
                    priority={index === 0 && i < 4}
                    index={i}
                    reducedMotion={reducedMotion}
                  />
                ))}
                {/* "All Products" card — links to category shop */}
                <Link
                  href={`/shop?category=${encodeURIComponent(sec.slug)}`}
                  className="group flex flex-col h-full min-h-[280px] bg-card border border-border/50 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-5 justify-center items-center text-foreground"
                >
                  <span className="text-lg font-semibold tracking-tight">
                    {t("viewAll")}
                  </span>
                  <ChevronRight className="h-8 w-8 mt-2 text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </Section>
        </div>
      ))}
    </div>
  )
}
