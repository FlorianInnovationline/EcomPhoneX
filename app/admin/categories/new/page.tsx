import { requireAdmin } from "@/lib/auth-helpers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { CreateCategoryForm } from "../create-category-form"

export default async function NewCategoryPage() {
  await requireAdmin()

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
        <h1 className="text-3xl font-light tracking-tight">New Category</h1>
        <p className="text-muted-foreground/80 font-light mt-1">Add a product category</p>
      </div>
      <Card className="border-border/50 max-w-lg">
        <CardHeader>
          <CardTitle className="text-lg font-light">Category details</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateCategoryForm />
        </CardContent>
      </Card>
    </div>
  )
}
