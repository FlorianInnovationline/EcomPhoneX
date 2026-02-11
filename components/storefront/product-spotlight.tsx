"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useRouter } from "@/i18n/routing"

interface ProductSpotlightProps {
  product: Product
  specs?: string[]
  className?: string
}

export function ProductSpotlight({ product, specs = [], className }: ProductSpotlightProps) {
  const router = useRouter()
  const mainImage = product.images[0]
  const lowestPrice = Math.min(...product.variants.map(v => v.price))
  const hasDiscount = product.variants.some(v => v.compareAtPrice && v.compareAtPrice > v.price)

  // Use phone1.png as the default image for all products
  const imageSrc = mainImage?.url || '/images/placeholders/phone1.png'

  // Extract 3 key specs from product.specs or use provided
  const displaySpecs = specs.length > 0 
    ? specs.slice(0, 3)
    : product.specs 
      ? Object.entries(product.specs).slice(0, 3).map(([key, value]) => `${key}: ${value}`)
      : []

  return (
    <section className={className}>
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full aspect-[3/4] sm:aspect-[2/3] lg:aspect-[9/16] overflow-hidden rounded-3xl bg-gradient-to-br from-muted/30 to-muted/50 flex items-center justify-center p-8 sm:p-12"
          >
            <Image
              src={imageSrc}
              alt={mainImage?.alt || product.name}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground/60 font-light uppercase tracking-wider">
                {product.brand}
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
                {product.name}
              </h2>
              {product.description && (
                <p className="text-lg text-muted-foreground/80 font-light leading-relaxed max-w-lg">
                  {product.description}
                </p>
              )}
            </div>

            {/* Specs */}
            {displaySpecs.length > 0 && (
              <div className="space-y-3">
                {displaySpecs.map((spec, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
                    <span className="text-base font-light text-foreground/80">{spec}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Price & CTA */}
            <div className="flex items-center gap-6 pt-4">
              <div className="space-y-1">
                <div className="text-3xl font-light">{formatPrice(lowestPrice)}</div>
                {hasDiscount && (
                  <div className="text-sm text-muted-foreground line-through">
                    {formatPrice(Math.max(...product.variants.map(v => v.compareAtPrice || v.price)))}
                  </div>
                )}
              </div>
              <Button
                size="lg"
                onClick={() => router.push(`/shop/${product.slug}`)}
                className="rounded-full px-8 py-6 text-base font-light"
              >
                Shop Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
