"use client"

import { motion } from "framer-motion"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import { ProductTile } from "@/components/storefront/product-tile"
import { Product } from "@/lib/types"

interface CollectionCardProps {
  collection: {
    id: string
    slug: string
    name: string
    description: string | null
    imageUrl: string | null
  }
  products: Product[]
  index: number
}

export function CollectionCard({ collection, products, index }: CollectionCardProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="space-y-8"
    >
      <Link href={`/collections/${collection.slug}`}>
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/50 group flex items-center justify-center p-8 sm:p-12">
          <Image
            src={collection.imageUrl || '/images/placeholders/phone1.png'}
            alt={collection.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-3">
              {collection.name}
            </h2>
            {collection.description && (
              <p className="text-lg text-muted-foreground/80 font-light max-w-2xl">
                {collection.description}
              </p>
            )}
          </div>
        </div>
      </Link>

      {products.length > 0 && (
        <div className="grid gap-8 md:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductTile key={product.id} product={product} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
