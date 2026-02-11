"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface ProductTileProps {
  product: Product
  className?: string
  priority?: boolean
}

export function ProductTile({ product, className, priority = false }: ProductTileProps) {
  const mainImage = product.images[0]
  const lowestPrice = Math.min(...product.variants.map(v => v.price))
  const hasDiscount = product.variants.some(v => v.compareAtPrice && v.compareAtPrice > v.price)
  
  // Use phone1.png as fallback for all products
  const imageSrc = mainImage?.url || '/images/placeholders/phone1.png'
  const imageAlt = mainImage?.alt || product.name

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{ y: -4 }}
      className={cn("group", className)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-gradient-to-br from-muted/30 to-muted/50 mb-4 flex items-center justify-center p-8 sm:p-10">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {hasDiscount && (
            <div className="absolute top-4 right-4 bg-foreground text-background px-3 py-1 rounded-full text-xs font-light">
              Sale
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground/60 font-light uppercase tracking-wider">
            {product.brand}
          </div>
          <h3 className="text-xl font-light tracking-tight group-hover:text-foreground/80 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-lg font-light">{formatPrice(lowestPrice)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(Math.max(...product.variants.map(v => v.compareAtPrice || v.price)))}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
