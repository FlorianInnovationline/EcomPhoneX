import { requireAdmin } from "@/lib/auth-helpers"
import { getCategoryById } from "@/lib/db/categories"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { EditCategoryForm } from "../../edit-category-form"

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()
  const { id } = await params
  const category = await getCategoryById(id)
  if (!category) notFound()

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="rounded-full" asChild>
          <Link href="/admin/categories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>
      <div>
        <h1 className="text-3xl font-light tracking-tight">Edit category</h1>
        <p className="text-muted-foreground/80 font-light mt-1">{category.name}</p>
      </div>
      <Card className="border-border/50 max-w-lg">
        <CardHeader>
          <CardTitle className="text-lg font-light">Category details</CardTitle>
        </CardHeader>
        <CardContent>
          <EditCategoryForm
            id={category.id}
            defaultName={category.name}
            defaultSlug={category.slug}
            defaultDescription={category.description ?? ""}
            defaultIsActive={category.isActive}
          />
        </CardContent>
      </Card>
    </div>
  )
}
