"use client"

import { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useRouter } from "@/i18n/routing"
import { cn } from "@/lib/utils"

interface CompareTableProps {
  products: Product[]
  onRemove: (productId: string) => void
  maxProducts?: number
}

export function CompareTable({ products, onRemove, maxProducts = 3 }: CompareTableProps) {
  const router = useRouter()

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground/80 text-lg font-light">
          Select up to {maxProducts} products to compare
        </p>
      </div>
    )
  }

  // Get all unique spec keys from all products
  const allSpecKeys = new Set<string>()
  products.forEach(product => {
    if (product.specs) {
      Object.keys(product.specs).forEach(key => allSpecKeys.add(key))
    }
  })
  const specKeys = Array.from(allSpecKeys)

  // Get price range
  const allPrices = products.flatMap(p => p.variants.map(v => v.price))
  const minPrice = Math.min(...allPrices)
  const maxPrice = Math.max(...allPrices)

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full" style={{ "--cols": products.length } as React.CSSProperties}>
        {/* Header Row */}
        <div className="grid grid-cols-[200px_repeat(var(--cols),1fr)] gap-4 pb-4 border-b border-border/50">
          <div className="font-light text-sm text-muted-foreground/60 uppercase tracking-wider">
            Specification
          </div>
          {products.map((product) => (
            <div key={product.id} className="relative">
              <button
                onClick={() => onRemove(product.id)}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Remove product"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="space-y-2">
                <h3 className="text-lg font-light">{product.name}</h3>
                <div className="text-sm text-muted-foreground/60">{product.brand}</div>
                <div className="text-xl font-light pt-2">
                  {minPrice === maxPrice ? formatPrice(minPrice) : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/product/${product.slug}`)}
                  className="mt-3 w-full rounded-full"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Spec Rows */}
        {specKeys.map((specKey) => (
          <div
            key={specKey}
            className="grid grid-cols-[200px_repeat(var(--cols),1fr)] gap-4 py-4 border-b border-border/30"
          >
            <div className="font-light text-sm text-muted-foreground/80 capitalize">
              {specKey.replace(/([A-Z])/g, " $1").trim()}
            </div>
            {products.map((product) => {
              const value = product.specs?.[specKey] || "—"
              return (
                <div key={product.id} className="font-light text-sm">
                  {typeof value === "string" ? value : String(value)}
                </div>
              )
            })}
          </div>
        ))}

        {/* Price Row */}
        <div className="grid grid-cols-[200px_repeat(var(--cols),1fr)] gap-4 py-4 border-b border-border/30">
          <div className="font-light text-sm text-muted-foreground/80">Price Range</div>
          {products.map((product) => {
            const prices = product.variants.map(v => v.price)
            const productMin = Math.min(...prices)
            const productMax = Math.max(...prices)
            return (
              <div key={product.id} className="font-light text-sm">
                {productMin === productMax 
                  ? formatPrice(productMin)
                  : `${formatPrice(productMin)} - ${formatPrice(productMax)}`
                }
              </div>
            )
          })}
        </div>

        {/* Storage Options */}
        <div className="grid grid-cols-[200px_repeat(var(--cols),1fr)] gap-4 py-4 border-b border-border/30">
          <div className="font-light text-sm text-muted-foreground/80">Storage Options</div>
          {products.map((product) => {
            const storages = [...new Set(product.variants.map(v => v.storage).filter(Boolean))]
            return (
              <div key={product.id} className="font-light text-sm">
                {storages.join(", ") || "—"}
              </div>
            )
          })}
        </div>

        {/* Color Options */}
        <div className="grid grid-cols-[200px_repeat(var(--cols),1fr)] gap-4 py-4">
          <div className="font-light text-sm text-muted-foreground/80">Color Options</div>
          {products.map((product) => {
            const colors = [...new Set(product.variants.map(v => v.color).filter(Boolean))]
            return (
              <div key={product.id} className="font-light text-sm">
                {colors.join(", ") || "—"}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
