"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/store/cart-store"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface ProductPageClientProps {
  product: {
    id: string
    slug: string
    name: string
    description: string
    price: number
    variants: Array<{
      id: string
      storage: string
      color: string
      price: number
      inventory: number
    }>
    specs: Record<string, string>
    images: Array<{
      url: string
      alt: string
    }>
  }
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const t = useTranslations("product")
  const router = useRouter()
  const { toast } = useToast()
  const addItem = useCartStore((state) => state.addItem)
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])

  const handleAddToCart = () => {
    if (!selectedVariant) return

    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productName: product.name,
      variantName: `${selectedVariant.storage} ${selectedVariant.color}`,
      price: selectedVariant.price,
      imageUrl: product.images[0]?.url,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="container py-12">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-gradient-to-br from-muted/30 to-muted/50 rounded-2xl overflow-hidden flex items-center justify-center p-8 sm:p-12">
            <Image
              src={product.images[0]?.url || '/images/placeholders/phone1.png'}
              alt={product.images[0]?.alt || product.name}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {product.name}
            </h1>
            <p className="text-muted-foreground text-lg">
              {product.description}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-3xl font-bold">{formatPrice(selectedVariant.price)}</p>
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t("storage")}
                </label>
                <div className="flex gap-2">
                  {product.variants
                    .filter((v) => v.color === selectedVariant.color)
                    .map((variant) => (
                      <Button
                        key={variant.id}
                        variant={
                          selectedVariant.storage === variant.storage
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setSelectedVariant(
                            product.variants.find(
                              (v) => v.storage === variant.storage && v.color === selectedVariant.color
                            ) || variant
                          )
                        }
                      >
                        {variant.storage}
                      </Button>
                    ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t("color")}
                </label>
                <div className="flex gap-2">
                  {Array.from(new Set(product.variants.map((v) => v.color))).map(
                    (color) => (
                      <Button
                        key={color}
                        variant={
                          selectedVariant.color === color ? "default" : "outline"
                        }
                        onClick={() =>
                          setSelectedVariant(
                            product.variants.find(
                              (v) => v.color === color && v.storage === selectedVariant.storage
                            ) || product.variants[0]
                          )
                        }
                      >
                        {color}
                      </Button>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant={selectedVariant && selectedVariant.inventory > 0 ? "default" : "destructive"}>
                {selectedVariant && selectedVariant.inventory > 0 ? t("inStock") : t("outOfStock")}
              </Badge>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.inventory === 0}
            >
              Add to Cart
            </Button>
          </div>

          {/* Specs */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">{t("specs")}</h3>
              <dl className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <dt className="text-muted-foreground capitalize">{key}:</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
