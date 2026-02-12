"use server"

import { revalidatePath } from "next/cache"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import {
  updateProduct,
  deleteProduct,
  getProductById,
  type UpdateProductInput,
} from "@/lib/db/products"

export async function updateProductAction(id: string, input: UpdateProductInput) {
  await updateProduct(id, input)
  revalidatePath("/admin/products")
  revalidatePath(`/admin/products/${id}`)
}

export async function deleteProductAction(id: string) {
  await deleteProduct(id)
  revalidatePath("/admin/products")
}

export async function getProductForEditAction(id: string) {
  const product = await getProductById(id)
  if (!product) return null
  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    brand: product.brand,
    shortDescription: product.shortDescription ?? "",
    description: product.description ?? "",
    status: product.status,
    isFeatured: product.isFeatured,
    primaryCategoryId: product.primaryCategoryId ?? "",
    categoryIds: product.categories.map((c) => c.categoryId),
    images: product.images.map((img) => ({ id: img.id, url: img.url, alt: img.alt ?? "" })),
  }
}

async function getCategoriesFlat() {
  const { getCategories } = await import("@/lib/db/categories")
  const cats = await getCategories(true)
  return cats.flatMap((c) => [c, ...(c.children || [])]).map((c) => ({ id: c.id, name: c.name, slug: c.slug }))
}

export async function getProductEditDataAction(productId: string) {
  const [product, categories] = await Promise.all([
    getProductForEditAction(productId),
    getCategoriesFlat(),
  ])
  return { product, categories }
}

/** Upload image files for a product; returns public URLs. */
export async function uploadProductImagesAction(
  productId: string,
  formData: FormData
): Promise<{ urls: string[]; error?: string }> {
  const files = formData.getAll("images") as File[]
  if (!files?.length) return { urls: [] }
  // On Vercel (and similar serverless), the filesystem is read-only; uploads won't persist.
  if (process.env.VERCEL) {
    return { urls: [], error: "Image upload is not available in this deployment. Use Vercel Blob or another storage for production." }
  }
  const dir = path.join(process.cwd(), "public", "images", "products", productId)
  try {
    await mkdir(dir, { recursive: true })
  } catch (e) {
    return { urls: [], error: "Could not create upload directory." }
  }
  const urls: string[] = []
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (!(file instanceof File) || !file.size) continue
    const ext = path.extname(file.name) || ".jpg"
    const base = `${Date.now()}-${i}${ext}`
    const filePath = path.join(dir, base)
    const buf = Buffer.from(await file.arrayBuffer())
    try {
      await writeFile(filePath, buf)
    } catch (e) {
      return { urls: [], error: "Failed to save image (e.g. read-only filesystem in production)." }
    }
    urls.push(`/images/products/${productId}/${base}`)
  }
  return { urls }
}
