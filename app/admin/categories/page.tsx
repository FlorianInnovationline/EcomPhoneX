import { requireAdmin } from "@/lib/auth-helpers"
import { getCategories } from "@/lib/db/categories"
import { CategoriesList } from "./categories-list"

export default async function AdminCategoriesPage() {
  await requireAdmin()
  const categories = await getCategories(true) // Include inactive

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-1 sm:mb-2">Categories</h1>
        <p className="text-muted-foreground/80 font-light text-sm sm:text-base">
          Manage product categories
        </p>
      </div>

      <CategoriesList categories={categories} />
    </div>
  )
}
