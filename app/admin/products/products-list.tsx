"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Plus, Package, Edit, Trash2 } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { motion } from "framer-motion"
import { deleteProductAction } from "./actions"
import { ProductEditModal } from "./product-edit-modal"

interface Product {
  id: string
  title: string
  slug: string
  brand: string
  status: string
  variants: Array<{
    id: string
    price: unknown
    inventoryQty: number
  }>
}

interface ProductsListProps {
  products: Product[]
}

export function ProductsList({ products: initialProducts }: ProductsListProps) {
  const router = useRouter()
  const [products, setProducts] = useState(initialProducts)
  useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts])
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete product "${title}"? This cannot be undone.`)) return
    setDeletingId(id)
    try {
      await deleteProductAction(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
      router.refresh()
    } finally {
      setDeletingId(null)
    }
  }

  function openEdit(id: string) {
    setEditingProductId(id)
    setEditModalOpen(true)
  }

  return (
    <div className="space-y-6 sm:space-y-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-1 sm:mb-2">Products</h1>
          <p className="text-muted-foreground/70 font-light text-sm sm:text-lg">
            Manage your product catalog
          </p>
        </div>
        <Button className="rounded-xl font-light h-10 sm:h-11 px-4 sm:px-6 w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </motion.div>

      <Card className="border-border/50 bg-gradient-to-br from-background to-muted/20">
        <CardTitle className="sr-only">All Products</CardTitle>
        <CardContent className="p-4 sm:pt-6 sm:p-6">
          <div className="space-y-3">
            {products.map((product, index) => {
              const totalStock = product.variants.reduce((sum, v) => sum + v.inventoryQty, 0)
              const lowestPrice = product.variants[0] ? Number(product.variants[0].price) : 0

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 sm:p-5 rounded-xl bg-muted/30 border border-border/30 hover:bg-muted/50 hover:border-border/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                      <Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5 sm:mb-1">
                        <h3 className="font-light text-sm sm:text-base truncate">{product.title}</h3>
                        {product.status === "DRAFT" && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 font-light shrink-0">
                            Draft
                          </span>
                        )}
                        {product.status === "ARCHIVED" && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-500/10 text-gray-600 border border-gray-500/20 font-light shrink-0">
                            Archived
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm text-muted-foreground/70 font-light">
                        <span>{formatPrice(lowestPrice)}</span>
                        <span className="text-muted-foreground/40 hidden sm:inline">•</span>
                        <span>{totalStock} in stock</span>
                        <span className="text-muted-foreground/40 hidden sm:inline">•</span>
                        <span>{product.brand}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl font-light h-9 px-3 sm:px-4 border-border/50 hover:bg-muted flex-1 sm:flex-initial"
                      onClick={() => openEdit(product.id)}
                    >
                      <Edit className="mr-1.5 sm:mr-2 h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="rounded-xl font-light h-9 px-3 sm:px-4 flex-1 sm:flex-initial"
                      disabled={deletingId === product.id}
                      onClick={() => handleDelete(product.id, product.title)}
                    >
                      <Trash2 className="mr-1.5 sm:mr-2 h-3.5 w-3.5" />
                      {deletingId === product.id ? "…" : "Delete"}
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <ProductEditModal
        productId={editingProductId}
        open={editModalOpen}
        onOpenChange={(open) => {
          setEditModalOpen(open)
          if (!open) setEditingProductId(null)
        }}
        onSuccess={() => router.refresh()}
      />
    </div>
  )
}
