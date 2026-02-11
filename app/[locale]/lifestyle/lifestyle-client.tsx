"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { ProductTile } from "@/components/storefront/product-tile"
import { Section } from "@/components/storefront/section"
import { Product } from "@/lib/types"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LifestyleSection {
  slug: string
  name: string
  description?: string | null
  products: Product[]
}

const NAV_HEIGHT = 64 // h-14 sm:h-16

export function LifestyleClient({
  sections,
  categoryKeys,
}: {
  sections: LifestyleSection[]
  categoryKeys: Record<string, string>
}) {
  const t = useTranslations("lifestyle")
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const [activeSlug, setActiveSlug] = useState<string>("all")
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  // Observe which section is in view for tab highlight
  useEffect(() => {
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = entry.target.getAttribute("data-section-slug")
          if (id) setActiveSlug(id)
        }
      },
      { rootMargin: `-${NAV_HEIGHT + 80}px 0px -60% 0px`, threshold: 0 }
    )
    sectionRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [sections.length])

  const scrollToSection = (slug: string) => {
    if (slug === "all") {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })
      return
    }
    const el = sectionRefs.current.get(slug)
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" })
    }
  }

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <Section className="pt-20 sm:pt-24 pb-12 sm:pb-16" noPadding>
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

      {/* Sticky category tabs */}
      <div
        className="sticky z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
        style={{ top: NAV_HEIGHT }}
      >
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => scrollToSection("all")}
              className={cn(
                "shrink-0 px-4 py-2 rounded-full text-sm font-light transition-colors whitespace-nowrap",
                activeSlug === "all"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {t("all")}
            </button>
            {sections.map((sec) => (
              <button
                key={sec.slug}
                onClick={() => scrollToSection(sec.slug)}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-full text-sm font-light transition-colors whitespace-nowrap",
                  activeSlug === sec.slug
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {categoryKeys[sec.slug] ?? sec.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category sections */}
      {sections.map((sec, index) => (
        <div
          key={sec.slug}
          ref={(el) => {
            if (el) sectionRefs.current.set(sec.slug, el)
          }}
          data-section-slug={sec.slug}
          className="scroll-mt-[120px]"
        >
        <Section
          variant={index % 2 === 0 ? "default" : "muted"}
        >
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground">
                  {categoryKeys[sec.slug] ?? sec.name}
                </h2>
                {sec.description && (
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground/80 font-light max-w-xl">
                    {sec.description}
                  </p>
                )}
              </div>
              <Link
                href={`/shop?category=${encodeURIComponent(sec.slug)}`}
                className="inline-flex items-center gap-1.5 text-sm font-light text-foreground/70 hover:text-foreground transition-colors shrink-0"
              >
                {t("viewAll")}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Product row - horizontal scroll on mobile, grid on larger */}
            <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 sm:overflow-visible">
              {sec.products.slice(0, 6).map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.19, 1, 0.22, 1] }}
                  className="min-w-[260px] sm:min-w-0"
                >
                  <ProductTile product={product} priority={index === 0 && i < 3} />
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
        </div>
      ))}
    </div>
  )
}
