import { requireAdmin } from "@/lib/auth-helpers"
import { getCollections } from "@/lib/db/collections"
import { CollectionsList } from "./collections-list"

export default async function AdminCollectionsPage() {
  await requireAdmin()
  const collections = await getCollections(true) // Include inactive

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light tracking-tight">Collections</h1>
          <p className="text-muted-foreground/80 font-light">
            Manage product collections
          </p>
        </div>
      </div>

      <CollectionsList collections={collections} />
    </div>
  )
}
