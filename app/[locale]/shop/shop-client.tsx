"use client"

import { Link, useRouter } from "@/i18n/routing"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import { Product } from "@/lib/types"
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { useTransition, useState, useEffect } from "react"
import { useTranslations } from "next-intl"

interface ShopClientProps {
  products: Product[]
  searchQuery?: string
  categorySlug?: string
}

export function ShopClient({ products, searchQuery, categorySlug }: ShopClientProps) {
  const t = useTranslations("shop")
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [searchValue, setSearchValue] = useState(searchQuery || "")

  const handleSearch = (value: string) => {
    setSearchValue(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }

    startTransition(() => {
      router.push(`?${params.toString()}`)
    })
  }

  useEffect(() => {
    setSearchValue(searchQuery || "")
  }, [searchQuery])
  return (
    <div className="min-h-screen">
      {/* Compact Header Section */}
      <div className="border-b border-border/20">
        <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-2">
              {t("title")}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground/60 font-light">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/20">
        <div className="container px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
              <Input
                placeholder={t("search")}
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                disabled={isPending}
                className="pl-9 h-10 rounded-full border-border/30 bg-muted/20 font-light text-sm focus:bg-background transition-colors disabled:opacity-50"
              />
              {isPending && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="h-3 w-3 border-2 border-muted-foreground/20 border-t-foreground rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Filter & Sort Buttons */}
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full h-10 px-4 font-light text-sm text-muted-foreground/70 hover:text-foreground hover:bg-muted/30"
              >
                <SlidersHorizontal className="mr-2 h-3.5 w-3.5" />
                {t("filters")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full h-10 px-4 font-light text-sm text-muted-foreground/70 hover:text-foreground hover:bg-muted/30"
              >
                <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
                {t("sort")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground/50 text-sm font-light">
              {t("noProducts")}
            </p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-xs text-muted-foreground/50 font-light">
                {products.length} {products.length === 1 ? t("product") : t("products")}
              </p>
            </div>

            {/* Grid - Optimized for performance */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, index) => {
                const lowestPrice = product.variants[0]?.price || 0
                const hasDiscount = product.variants.some(
                  v => v.compareAtPrice && v.compareAtPrice > v.price
                )
                const imageUrl = '/images/placeholders/phone1.png'

                return (
                  <Link 
                    key={product.id} 
                    href={`/product/${product.slug}`} 
                    className="block group"
                    style={{ 
                      willChange: 'transform',
                      transform: 'translateZ(0)' 
                    }}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-border/10 hover:border-border/30 transition-all duration-300 hover:shadow-md bg-background">
                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden bg-muted/20 flex items-center justify-center p-6 sm:p-8">
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          loading={index < 8 ? "eager" : "lazy"}
                        />
                        
                        {/* Sale Badge */}
                        {hasDiscount && (
                          <div className="absolute top-3 right-3 bg-foreground text-background px-2.5 py-1 rounded-full text-[10px] font-light z-10">
                            {t("sale")}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5 space-y-2">
                        <div className="text-[10px] text-muted-foreground/40 font-light uppercase tracking-wider">
                          {product.brand}
                        </div>
                        <h3 className="text-base sm:text-lg font-light tracking-tight group-hover:text-foreground/70 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-baseline gap-2 pt-0.5">
                          <span className="text-lg font-light">
                            {formatPrice(Number(lowestPrice))}
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-muted-foreground/40 line-through font-light">
                              {formatPrice(
                                Math.max(...product.variants.map(v => v.compareAtPrice || v.price))
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
