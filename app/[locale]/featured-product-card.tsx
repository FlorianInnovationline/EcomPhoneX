"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { useRouter } from "@/i18n/routing"

interface FeaturedProductCardProps {
  product: Product
  index: number
}

export function FeaturedProductCard({ product, index }: FeaturedProductCardProps) {
  const router = useRouter()
  const lowestPrice = Math.min(...product.variants.map(v => v.price))
  const hasDiscount = product.variants.some(v => v.compareAtPrice && v.compareAtPrice > v.price)

  // Use the same image for all featured products
  const imageSrc = '/images/placeholders/phone1.png'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      className="group cursor-pointer"
      onClick={() => router.push(`/product/${product.slug}`)}
    >
      <div className="space-y-4">
        {/* Image Container - Square, Smaller */}
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-muted/30 to-muted/50">
          <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-contain"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/0 via-background/0 to-background/0 group-hover:from-background/5 group-hover:via-background/0 group-hover:to-background/5 transition-all duration-500" />
        </div>

        {/* Content - Clean, Minimal */}
        <div className="space-y-3 text-center">
          <div className="text-xs text-muted-foreground/60 font-light uppercase tracking-wider">
            {product.brand}
          </div>
          <h3 className="text-xl sm:text-2xl font-light tracking-tight group-hover:text-foreground/80 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg font-light">{formatPrice(lowestPrice)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground/60 line-through">
                {formatPrice(Math.max(...product.variants.map(v => v.compareAtPrice || v.price)))}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
