"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { LifestyleProductCard } from "./lifestyle-product-card"
import { Product } from "@/lib/types"
import { ChevronRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LifestyleSection {
  slug: string
  name: string
  description?: string | null
  products: Product[]
}

const NAV_HEIGHT = 56

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
  const [activeSlug, setActiveSlug] = useState<string>(sections[0]?.slug ?? "")
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  useEffect(() => {
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const slug = entry.target.getAttribute("data-section-slug")
          if (slug) setActiveSlug(slug)
        }
      },
      { rootMargin: `-${NAV_HEIGHT + 40}px 0px -55% 0px`, threshold: 0 }
    )
    sectionRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [sections.length])

  const scrollToSection = (slug: string) => {
    const el = sectionRefs.current.get(slug)
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" })
    }
  }

  const totalProducts = sections.reduce((acc, s) => acc + s.products.length, 0)

  return (
    <div ref={containerRef} className="min-h-screen min-w-0 w-full overflow-x-hidden">
      {/* Hero — compact, clean, dynamic (responsive) */}
      <section className="relative pt-12 sm:pt-14 md:pt-16 pb-6 sm:pb-8 md:pb-10 overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-transparent pointer-events-none" />
        <div className="container relative px-4 sm:px-6 lg:px-8 max-w-[100vw]">
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-6 md:gap-8"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[11px] sm:text-xs font-medium text-primary/80 uppercase tracking-widest mb-1 sm:mb-1.5 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 shrink-0" />
                <span className="truncate">{t("breadcrumb")}</span>
              </p>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground truncate">
                {t("title")}
              </h1>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-muted-foreground/80 font-light max-w-xl line-clamp-2 sm:line-clamp-none">
                {t("subtitle")}
              </p>
            </div>
            <div className="flex shrink-0 gap-3 sm:gap-4 text-[11px] sm:text-xs md:text-sm text-muted-foreground/70 font-light">
              <span>{t("categoriesCount", { count: sections.length })}</span>
              <span className="text-muted-foreground/40">·</span>
              <span>{t("productsCount", { count: totalProducts })}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky category nav — no horizontal page scroll */}
      {sections.length > 1 && (
        <nav
          className="sticky top-14 sm:top-16 z-30 border-b border-border/40 bg-background/80 backdrop-blur-md overflow-hidden"
          style={{ height: NAV_HEIGHT }}
        >
          <div className="container h-full max-w-[100vw] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide h-full -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 min-w-0">
              {sections.map((sec) => (
                <button
                  key={sec.slug}
                  onClick={() => scrollToSection(sec.slug)}
                  className={cn(
                    "shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                    activeSlug === sec.slug
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  {categoryKeys[sec.slug] ?? sec.name}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Category sections — dynamic blocks */}
      {sections.map((sec, index) => (
        <CategoryBlock
          key={sec.slug}
          section={sec}
          categoryLabel={categoryKeys[sec.slug] ?? sec.name}
          viewAllLabel={t("viewAll")}
          productsCountLabel={t("productsCount", { count: sec.products.length })}
          sectionRef={(el) => {
            if (el) sectionRefs.current.set(sec.slug, el)
          }}
          index={index}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  )
}

function CategoryBlock({
  section,
  categoryLabel,
  viewAllLabel,
  productsCountLabel,
  sectionRef,
  index,
  reducedMotion,
}: {
  section: LifestyleSection
  categoryLabel: string
  viewAllLabel: string
  productsCountLabel: string
  sectionRef: (el: HTMLDivElement | null) => void
  index: number
  reducedMotion: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div
      ref={(el) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
        sectionRef(el)
      }}
      id={`category-${section.slug}`}
      data-section-slug={section.slug}
      className={cn(
        "scroll-mt-24 py-10 sm:py-14 md:py-16 lg:py-20 overflow-hidden",
        index % 2 === 0 ? "bg-background" : "bg-muted/20"
      )}
    >
      <div className="container px-4 sm:px-6 lg:px-8 max-w-[100vw] min-w-0">
        {/* Section header — responsive */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col sm:flex-row flex-wrap items-start sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10"
        >
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground truncate">
              {categoryLabel}
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground/80 font-light">
              {productsCountLabel}
            </p>
          </div>
          <Link
            href={`/shop?category=${encodeURIComponent(section.slug)}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground/80 hover:text-primary transition-colors shrink-0"
          >
            {viewAllLabel}
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Product grid — no overflow on any screen */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 min-w-0">
          {section.products.slice(0, 8).map((product, i) => (
            <div key={product.id} className="min-w-0">
              <LifestyleProductCard
                product={product}
                priority={index === 0 && i < 4}
                index={i}
                reducedMotion={reducedMotion}
              />
            </div>
          ))}
          {/* Explore all card */}
          <Link
            href={`/shop?category=${encodeURIComponent(section.slug)}`}
            className="group flex flex-col min-h-[240px] sm:min-h-[280px] bg-card border border-border/50 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 p-4 sm:p-6 md:p-8 justify-center items-center text-foreground min-w-0"
          >
            <span className="text-base sm:text-lg font-semibold tracking-tight">
              {viewAllLabel}
            </span>
            <ChevronRight className="h-8 w-8 mt-3 text-primary group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
