"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateCategoryAction } from "./actions"

interface EditCategoryFormProps {
  id: string
  defaultName: string
  defaultSlug: string
  defaultDescription: string
  defaultIsActive: boolean
}

export function EditCategoryForm({
  id,
  defaultName,
  defaultSlug,
  defaultDescription,
  defaultIsActive,
}: EditCategoryFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <form
      action={(formData) => {
        const name = formData.get("name") as string
        const slug = formData.get("slug") as string
        const description = (formData.get("description") as string) || null
        const isActive = formData.get("isActive") === "on"
        if (!name?.trim() || !slug?.trim()) return
        startTransition(async () => {
          await updateCategoryAction(id, {
            name: name.trim(),
            slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
            description: description?.trim() || null,
            isActive,
          })
          router.push("/admin/categories")
          router.refresh()
        })
      }}
      className="space-y-4"
    >
      <div>
        <label className="text-sm font-medium text-foreground/80 block mb-1.5">Name</label>
        <Input name="name" defaultValue={defaultName} required className="rounded-lg" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground/80 block mb-1.5">Slug</label>
        <Input name="slug" defaultValue={defaultSlug} required className="rounded-lg" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground/80 block mb-1.5">Description (optional)</label>
        <Input name="description" defaultValue={defaultDescription} className="rounded-lg" />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          defaultChecked={defaultIsActive}
          className="rounded border-input"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-foreground/80">Active</label>
      </div>
      <Button type="submit" disabled={isPending} className="rounded-xl">
        {isPending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  )
}
