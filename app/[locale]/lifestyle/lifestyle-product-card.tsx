"use client"

import Image from "next/image"
import { Link } from "@/i18n/routing"
import { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LifestyleProductCardProps {
  product: Product
  priority?: boolean
  index?: number
  reducedMotion?: boolean
}

export function LifestyleProductCard({
  product,
  priority = false,
  index = 0,
  reducedMotion = false,
}: LifestyleProductCardProps) {
  const t = useTranslations("lifestyle")
  const tCommon = useTranslations("common")
  const mainImage = product.images[0]
  const lowestPrice = Math.min(...product.variants.map((v) => v.price))
  const hasDiscount = product.variants.some(
    (v) => v.compareAtPrice != null && v.compareAtPrice > v.price
  )
  const comparePrice = hasDiscount
    ? Math.max(...product.variants.map((v) => v.compareAtPrice || v.price))
    : null
  const discountPercent =
    hasDiscount && comparePrice
      ? Math.round((1 - lowestPrice / comparePrice) * 100)
      : 0

  const imageSrc = mainImage?.url || "/images/placeholders/phone1.png"
  const imageAlt = mainImage?.alt || product.name

  return (
    <motion.article
      initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.19, 1, 0.22, 1] }}
      className="group flex flex-col h-full bg-card border border-border/50 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative flex flex-col flex-1 p-4 sm:p-5">
        {/* Discount badge - top left, orange-style */}
        {hasDiscount && discountPercent > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground px-2.5 py-1 rounded-md text-xs font-medium">
            {discountPercent}% off
          </div>
        )}

        {/* Product name - bold, prominent */}
        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground line-clamp-2 mb-2 pr-2">
          {product.name}
        </h3>

        {/* Price row */}
        <div className="flex items-baseline gap-2 flex-wrap mb-4">
          <span className="text-lg font-semibold text-foreground">
            {formatPrice(lowestPrice)}
          </span>
          {comparePrice != null && comparePrice > lowestPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(comparePrice)}
            </span>
          )}
        </div>

        {/* CTAs: Buy now + Learn more */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Link
            href={`/product/${product.slug}`}
            className="inline-flex items-center justify-center rounded-lg bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            {tCommon("buyNow")}
          </Link>
          <Link
            href={`/product/${product.slug}`}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
          >
            {t("learnMore")}
          </Link>
        </div>

        {/* Product image - clean, centered */}
        <div className="relative w-full aspect-[4/5] sm:aspect-square mt-auto rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center min-h-[180px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={cn("object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]")}
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </div>
    </motion.article>
  )
}
