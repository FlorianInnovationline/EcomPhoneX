"use client"

import { useState, useTransition, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createCategoryAction, updateCategoryAction } from "./actions"

export interface CategoryForModal {
  id: string
  name: string
  slug: string
  description: string | null
  isActive: boolean
}

interface CategoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: CategoryForModal | null
  onSuccess?: () => void
}

export function CategoryModal({
  open,
  onOpenChange,
  category,
  onSuccess,
}: CategoryModalProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const isEdit = !!category

  const [name, setName] = useState(category?.name ?? "")
  const [slug, setSlug] = useState(category?.slug ?? "")
  const [description, setDescription] = useState(category?.description ?? "")
  const [isActive, setIsActive] = useState(category?.isActive ?? true)

  useEffect(() => {
    if (open) {
      setName(category?.name ?? "")
      setSlug(category?.slug ?? "")
      setDescription(category?.description ?? "")
      setIsActive(category?.isActive ?? true)
    }
  }, [open, category])

  const reset = () => {
    setName(category?.name ?? "")
    setSlug(category?.slug ?? "")
    setDescription(category?.description ?? "")
    setIsActive(category?.isActive ?? true)
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) reset()
    onOpenChange(next)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const s = slug.trim().toLowerCase().replace(/\s+/g, "-")
    if (!name.trim() || !s) return
    startTransition(async () => {
      if (isEdit && category) {
        await updateCategoryAction(category.id, {
          name: name.trim(),
          slug: s,
          description: description.trim() || null,
          isActive,
        })
      } else {
        await createCategoryAction({
          name: name.trim(),
          slug: s,
          description: description.trim() || null,
          isActive,
        })
      }
      router.refresh()
      onSuccess?.()
      handleOpenChange(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        title={isEdit ? "Edit category" : "New category"}
        description={isEdit ? "Update category details" : "Add a new product category"}
        showClose={true}
        className="max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground/80 block mb-1.5">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Phones"
              required
              className="rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground/80 block mb-1.5">Slug</label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. phones"
              required
              className="rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground/80 block mb-1.5">Description (optional)</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              className="rounded-lg"
            />
          </div>
          {isEdit && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="cat-active"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="rounded border-input"
              />
              <label htmlFor="cat-active" className="text-sm font-medium text-foreground/80">Active</label>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="rounded-xl">
              {isPending ? "Saving…" : isEdit ? "Save changes" : "Create category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
