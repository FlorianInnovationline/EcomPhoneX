"use client"

import { useState, useTransition, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  getProductEditDataAction,
  uploadProductImagesAction,
  updateProductAction,
} from "./actions"
import { Loader2, Trash2, Upload } from "lucide-react"

interface CategoryOption {
  id: string
  name: string
  slug: string
}

interface ProductImage {
  id: string
  url: string
  alt: string
}

interface ProductEditData {
  product: {
    id: string
    title: string
    slug: string
    brand: string
    shortDescription: string
    description: string
    status: string
    isFeatured: boolean
    primaryCategoryId: string
    categoryIds: string[]
    images: ProductImage[]
  }
  categories: CategoryOption[]
}

interface ProductEditModalProps {
  productId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function ProductEditModal({
  productId,
  open,
  onOpenChange,
  onSuccess,
}: ProductEditModalProps) {
  const router = useRouter()
  const [data, setData] = useState<ProductEditData | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [brand, setBrand] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("PUBLISHED")
  const [isFeatured, setIsFeatured] = useState(false)
  const [primaryCategoryId, setPrimaryCategoryId] = useState("")
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])

  useEffect(() => {
    if (!open || !productId) {
      setData(null)
      setLoadError(null)
      return
    }
    let cancelled = false
    setLoadError(null)
    getProductEditDataAction(productId).then((res) => {
      if (cancelled) return
      const p = res?.product
      if (!p) {
        setLoadError("Product not found")
        return
      }
      const editData: ProductEditData = {
        product: {
          id: p.id,
          title: p.title,
          slug: p.slug,
          brand: p.brand,
          shortDescription: p.shortDescription,
          description: p.description,
          status: String(p.status),
          isFeatured: p.isFeatured,
          primaryCategoryId: p.primaryCategoryId,
          categoryIds: p.categoryIds,
          images: p.images.map((img) => ({ id: img.id, url: img.url, alt: img.alt ?? "" })),
        },
        categories: res.categories,
      }
      setData(editData)
      setTitle(p.title)
      setSlug(p.slug)
      setBrand(p.brand)
      setShortDescription(p.shortDescription)
      setDescription(p.description)
      setStatus(String(p.status))
      setIsFeatured(p.isFeatured)
      setPrimaryCategoryId(p.primaryCategoryId)
      setImagesToRemove([])
      setNewFiles([])
    })
    return () => {
      cancelled = true
    }
  }, [open, productId])

  const existingImages = data?.product.images.filter((img) => !imagesToRemove.includes(img.id)) ?? []
  const hasChanges =
    data &&
    (title !== data.product.title ||
      slug !== data.product.slug ||
      brand !== data.product.brand ||
      shortDescription !== data.product.shortDescription ||
      description !== data.product.description ||
      status !== data.product.status ||
      isFeatured !== data.product.isFeatured ||
      primaryCategoryId !== data.product.primaryCategoryId ||
      imagesToRemove.length > 0 ||
      newFiles.length > 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data?.product || !title.trim() || !slug.trim() || !brand.trim()) return
    const id = data.product.id
    const slugClean = slug.trim().toLowerCase().replace(/\s+/g, "-")
    startTransition(async () => {
      let newUrls: string[] = []
      if (newFiles.length) {
        const formData = new FormData()
        newFiles.forEach((f) => formData.append("images", f))
        const res = await uploadProductImagesAction(id, formData)
        if (res.error) {
          alert(res.error)
          return
        }
        newUrls = res.urls
      }
      await updateProductAction(id, {
        title: title.trim(),
        slug: slugClean,
        brand: brand.trim(),
        shortDescription: shortDescription.trim() || null,
        description: description.trim() || null,
        status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
        isFeatured,
        primaryCategoryId: primaryCategoryId || null,
        categoryIds: primaryCategoryId ? [primaryCategoryId] : [],
        imageIdsToRemove: imagesToRemove.length ? imagesToRemove : undefined,
        newImages: newUrls.length ? newUrls.map((url) => ({ url })) : undefined,
      })
      router.refresh()
      onSuccess?.()
      onOpenChange(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title="Edit product"
        description="Update product details and images"
        showClose={true}
        className="max-w-2xl max-h-[85vh] sm:max-h-[90vh] w-[95vw] sm:w-full overflow-y-auto"
      >
        {loadError && (
          <p className="text-destructive text-sm">{loadError}</p>
        )}
        {!data && !loadError && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
        {data && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground/80 block mb-1.5">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground/80 block mb-1.5">Slug</label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground/80 block mb-1.5">Brand</label>
                <Input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                  className="rounded-lg"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground/80 block mb-1.5">Short description</label>
                <Input
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief tagline"
                  className="rounded-lg"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground/80 block mb-1.5">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="rounded-lg resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground/80 block mb-1.5">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
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
                  value={primaryCategoryId}
                  onChange={(e) => setPrimaryCategoryId(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">— None —</option>
                  {data.categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-input"
                />
                <label htmlFor="featured" className="text-sm font-medium text-foreground/80">Featured product</label>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground/80 block mb-2">Images</label>
              <div className="space-y-3">
                {existingImages.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {existingImages.map((img) => (
                      <div
                        key={img.id}
                        className="relative group rounded-lg overflow-hidden border border-border/50 w-20 h-20 bg-muted"
                      >
                        <Image
                          src={img.url}
                          alt={img.alt || "Product"}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                        <button
                          type="button"
                          onClick={() => setImagesToRemove((prev) => [...prev, img.id])}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <Trash2 className="h-5 w-5 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {newFiles.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {Array.from(newFiles).map((file, i) => (
                      <div
                        key={i}
                        className="relative group rounded-lg overflow-hidden border border-border/50 w-20 h-20 bg-muted flex items-center justify-center text-xs text-muted-foreground"
                      >
                        {file.name}
                        <button
                          type="button"
                          onClick={() =>
                            setNewFiles((prev) => prev.filter((_, idx) => idx !== i))
                          }
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <Trash2 className="h-5 w-5 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <label className="inline-flex items-center gap-2 rounded-lg border border-dashed border-input px-4 py-2 text-sm text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
                  <Upload className="h-4 w-4" />
                  Add images
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(e) => {
                      const files = e.target.files
                      if (files?.length)
                        setNewFiles((prev) => [...prev, ...Array.from(files)])
                      e.target.value = ""
                    }}
                  />
                </label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || !hasChanges}
                className="rounded-xl"
              >
                {isPending ? "Saving…" : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
