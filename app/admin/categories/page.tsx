import { requireAdmin } from "@/lib/auth-helpers"
import { getCategories } from "@/lib/db/categories"
import { CategoriesList } from "./categories-list"

export default async function AdminCategoriesPage() {
  await requireAdmin()
  const categories = await getCategories(true) // Include inactive

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light tracking-tight">Categories</h1>
          <p className="text-muted-foreground/80 font-light">
            Manage product categories
          </p>
        </div>
      </div>

      <CategoriesList categories={categories} />
    </div>
  )
}
