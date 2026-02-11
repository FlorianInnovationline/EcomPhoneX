"use server"

import { revalidatePath } from "next/cache"
import {
  createCategory,
  updateCategory,
  deleteCategory,
  type CreateCategoryInput,
  type UpdateCategoryInput,
} from "@/lib/db/categories"

export async function createCategoryAction(input: CreateCategoryInput) {
  await createCategory(input)
  revalidatePath("/admin/categories")
}

export async function updateCategoryAction(id: string, input: UpdateCategoryInput) {
  await updateCategory(id, input)
  revalidatePath("/admin/categories")
}

export async function deleteCategoryAction(id: string) {
  await deleteCategory(id)
  revalidatePath("/admin/categories")
}
