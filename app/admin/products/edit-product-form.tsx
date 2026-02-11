"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateProductAction } from "./actions"

interface Category {
  id: string
  name: string
  slug: string
}

interface EditProductFormProps {
  productId: string
  defaultTitle: string
  defaultSlug: string
  defaultBrand: string
  defaultStatus: string
  defaultPrimaryCategoryId: string
  categoryIds: string[]
  categories: Category[]
}

export function EditProductForm({
  productId,
  defaultTitle,
  defaultSlug,
  defaultBrand,
  defaultStatus,
  defaultPrimaryCategoryId,
  categoryIds,
  categories,
}: EditProductFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <form
      action={(formData) => {
        const title = formData.get("title") as string
        const slug = formData.get("slug") as string
        const brand = formData.get("brand") as string
        const status = formData.get("status") as string
        const primaryCategoryId = (formData.get("primaryCategoryId") as string) || null
        if (!title?.trim() || !slug?.trim() || !brand?.trim()) return
        startTransition(async () => {
          await updateProductAction(productId, {
            title: title.trim(),
            slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
            brand: brand.trim(),
            status: status === "DRAFT" || status === "PUBLISHED" || status === "ARCHIVED" ? status : undefined,
            primaryCategoryId: primaryCategoryId || null,
            categoryIds: primaryCategoryId ? [primaryCategoryId] : [],
          })
          router.push("/admin/products")
          router.refresh()
        })
      }}
      className="space-y-4"
    >
      <div>
        <label className="text-sm font-medium text-foreground/80 block mb-1.5">Title</label>
        <Input name="title" defaultValue={defaultTitle} required className="rounded-lg" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground/80 block mb-1.5">Slug</label>
        <Input name="slug" defaultValue={defaultSlug} required className="rounded-lg" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground/80 block mb-1.5">Brand</label>
        <Input name="brand" defaultValue={defaultBrand} required className="rounded-lg" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground/80 block mb-1.5">Status</label>
        <select
          name="status"
          defaultValue={defaultStatus}
          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground/80 block mb-1.5">Category</label>
        <select
          name="primaryCategoryId"
          defaultValue={defaultPrimaryCategoryId}
          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">— None —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.slug})
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={isPending} className="rounded-xl">
          {isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  )
}
