"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

/** Flat shape Prisma returns for parent/children (no nested relations) */
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
  const [categories] = useState(initialCategories)

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-light tracking-tight">All Categories</CardTitle>
          <Button className="rounded-full font-light h-9 px-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/30 hover:bg-muted/50 hover:border-border/50 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-light text-base mb-1">{category.name}</h3>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-muted-foreground/70 font-light">{category.slug}</span>
                    {category._count && (
                      <>
                        <span className="text-muted-foreground/40">•</span>
                        <span className="text-muted-foreground/70 font-light">
                          {category._count.products} products
                        </span>
                      </>
                    )}
                    {!category.isActive && (
                      <>
                        <span className="text-muted-foreground/40">•</span>
                        <span className="text-amber-600 font-light text-xs">Inactive</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-xl font-light h-9 px-4">
                  <Edit className="mr-2 h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="rounded-xl font-light h-9 px-4">
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
