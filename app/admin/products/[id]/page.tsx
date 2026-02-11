import { requireAdmin } from "@/lib/auth-helpers"
import { getProductById } from "@/lib/db/products"
import { getCategories } from "@/lib/db/categories"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { EditProductForm } from "../edit-product-form"

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()
  const { id } = await params
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(true),
  ])
  if (!product) notFound()

  const flatCategories = categories.flatMap((c) => [c, ...(c.children || [])])

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="rounded-full" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>
      <div>
        <h1 className="text-3xl font-light tracking-tight">Edit product</h1>
        <p className="text-muted-foreground/80 font-light mt-1">{product.title}</p>
      </div>
      <Card className="border-border/50 max-w-lg">
        <CardHeader>
          <CardTitle className="text-lg font-light">Product details</CardTitle>
        </CardHeader>
        <CardContent>
          <EditProductForm
            productId={product.id}
            defaultTitle={product.title}
            defaultSlug={product.slug}
            defaultBrand={product.brand}
            defaultStatus={product.status}
            defaultPrimaryCategoryId={product.primaryCategoryId ?? ""}
            categoryIds={product.categories.map((pc) => pc.categoryId)}
            categories={flatCategories}
          />
        </CardContent>
      </Card>
    </div>
  )
}
