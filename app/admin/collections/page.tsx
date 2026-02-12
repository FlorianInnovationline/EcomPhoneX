import { requireAdmin } from "@/lib/auth-helpers"
import { getCollections } from "@/lib/db/collections"
import { CollectionsList } from "./collections-list"

export default async function AdminCollectionsPage() {
  await requireAdmin()
  const collections = await getCollections(true) // Include inactive

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-1 sm:mb-2">Collections</h1>
        <p className="text-muted-foreground/80 font-light text-sm sm:text-base">
          Manage product collections
        </p>
      </div>

      <CollectionsList collections={collections} />
    </div>
  )
}
