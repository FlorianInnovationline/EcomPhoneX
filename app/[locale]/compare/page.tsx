"use client"

import { useState, useEffect } from "react"
import { getProducts, getProductById } from "@/lib/data"
import { CompareTable } from "@/components/storefront/compare-table"
import { Section, SectionHeader } from "@/components/storefront/section"
import { ProductTile } from "@/components/storefront/product-tile"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/types"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"

const MAX_PRODUCTS = 3

export default function ComparePage() {
  const t = useTranslations("compare")
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      const products = await getProducts({ active: true })
      setAllProducts(products)
      setLoading(false)
    }
    loadProducts()
  }, [])

  const handleAddProduct = (product: Product) => {
    if (selectedProducts.length >= MAX_PRODUCTS) return
    if (selectedProducts.find(p => p.id === product.id)) return
    setSelectedProducts([...selectedProducts, product])
  }

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId))
  }

  return (
    <div>
      <Section className="pt-24 pb-16">
        <div className="container px-4">
          <SectionHeader 
            title={t("title")} 
            subtitle={t("subtitle")}
          />
        </div>
      </Section>

      {selectedProducts.length > 0 && (
        <Section variant="muted">
          <div className="container px-4">
            <div className="mb-8">
              <h3 className="text-xl font-light mb-4">{t("selectedProducts")}</h3>
              <div className="flex flex-wrap gap-4">
                {selectedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-background"
                  >
                    <span className="text-sm font-light">{product.name}</span>
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="w-5 h-5 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <CompareTable
              products={selectedProducts}
              onRemove={handleRemoveProduct}
              maxProducts={MAX_PRODUCTS}
            />
          </div>
        </Section>
      )}

      <Section>
        <div className="container px-4">
          <h3 className="text-xl font-light mb-8">
            {selectedProducts.length >= MAX_PRODUCTS 
              ? t("maximumReached")
              : t("selectMore", {
                  count: MAX_PRODUCTS - selectedProducts.length
                })
            }
          </h3>
          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground/80 font-light">{t("loading")}</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
              {allProducts.map((product) => {
                const isSelected = selectedProducts.find(p => p.id === product.id)
                const isDisabled = selectedProducts.length >= MAX_PRODUCTS && !isSelected
                
                return (
                  <div key={product.id} className="relative">
                    <ProductTile product={product} />
                    <div className="mt-4">
                      {isSelected ? (
                        <Button
                          variant="outline"
                          className="w-full rounded-full"
                          disabled
                        >
                          {t("selected")}
                        </Button>
                      ) : (
                        <Button
                          variant="default"
                          className="w-full rounded-full"
                          onClick={() => handleAddProduct(product)}
                          disabled={isDisabled}
                        >
                          {isDisabled ? t("maximumReachedButton") : t("addToCompare")}
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </Section>
    </div>
  )
}
