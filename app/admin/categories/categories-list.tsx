"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { deleteCategoryAction } from "./actions"
import { CategoryModal, type CategoryForModal } from "./category-modal"

interface CategoryFlat {
  id: string
  name: string
  slug: string
  description: string | null
  parentId: string | null
  isActive: boolean
  sortOrder: number
}

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  parentId: string | null
  parent: CategoryFlat | null
  children: CategoryFlat[]
  isActive: boolean
  sortOrder: number
  _count?: { products: number }
}

interface CategoriesListProps {
  categories: Category[]
}

export function CategoriesList({ categories: initialCategories }: CategoriesListProps) {
  const router = useRouter()
  const [categories, setCategories] = useState(initialCategories)
  useEffect(() => {
    setCategories(initialCategories)
  }, [initialCategories])
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CategoryForModal | null>(null)

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete category "${name}"? Products in this category will be unlinked.`)) return
    setDeletingId(id)
    try {
      await deleteCategoryAction(id)
      setCategories((prev) => prev.filter((c) => c.id !== id))
      router.refresh()
    } finally {
      setDeletingId(null)
    }
  }

  function openCreate() {
    setEditingCategory(null)
    setModalOpen(true)
  }

  function openEdit(c: Category) {
    setEditingCategory({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      isActive: c.isActive,
    })
    setModalOpen(true)
  }

  return (
    <>
      <Card className="border-border/50">
        <CardHeader className="pb-4 px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base sm:text-lg font-light tracking-tight">All Categories</CardTitle>
            <Button
              className="rounded-full font-light h-9 px-4 w-full sm:w-auto"
              onClick={openCreate}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-6">
          <div className="space-y-2">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl bg-muted/30 border border-border/30 hover:bg-muted/50 hover:border-border/50 transition-all duration-200"
              >
                <div className="min-w-0">
                  <h3 className="font-light text-sm sm:text-base mb-0.5 sm:mb-1 truncate">{category.name}</h3>
                  <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-xs sm:text-sm text-muted-foreground/70 font-light">
                    <span>{category.slug}</span>
                    {category._count != null && (
                      <>
                        <span className="text-muted-foreground/40 hidden sm:inline">•</span>
                        <span>{category._count.products} products</span>
                      </>
                    )}
                    {!category.isActive && (
                      <>
                        <span className="text-muted-foreground/40 hidden sm:inline">•</span>
                        <span className="text-amber-600 text-xs">Inactive</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl font-light h-9 px-3 sm:px-4 flex-1 sm:flex-initial"
                    onClick={() => openEdit(category)}
                  >
                    <Edit className="mr-1.5 sm:mr-2 h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-xl font-light h-9 px-3 sm:px-4 flex-1 sm:flex-initial"
                    disabled={deletingId === category.id}
                    onClick={() => handleDelete(category.id, category.name)}
                  >
                    <Trash2 className="mr-1.5 sm:mr-2 h-3.5 w-3.5" />
                    {deletingId === category.id ? "…" : "Delete"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CategoryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        category={editingCategory}
        onSuccess={() => router.refresh()}
      />
    </>
  )
}
