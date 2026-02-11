"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createCategoryAction } from "./actions"

export function CreateCategoryForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <form
      action={(formData) => {
        const name = formData.get("name") as string
        const slug = formData.get("slug") as string
        const description = (formData.get("description") as string) || null
        if (!name?.trim() || !slug?.trim()) return
        startTransition(async () => {
          await createCategoryAction({
            name: name.trim(),
            slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
            description: description?.trim() || null,
          })
          router.push("/admin/categories")
          router.refresh()
        })
      }}
      className="space-y-4"
    >
      <div>
        <label className="text-sm font-medium text-foreground/80 block mb-1.5">Name</label>
        <Input name="name" placeholder="e.g. Phones" required className="rounded-lg" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground/80 block mb-1.5">Slug</label>
        <Input name="slug" placeholder="e.g. phones" required className="rounded-lg" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground/80 block mb-1.5">Description (optional)</label>
        <Input name="description" placeholder="Short description" className="rounded-lg" />
      </div>
      <Button type="submit" disabled={isPending} className="rounded-xl">
        {isPending ? "Creating…" : "Create category"}
      </Button>
    </form>
  )
}
