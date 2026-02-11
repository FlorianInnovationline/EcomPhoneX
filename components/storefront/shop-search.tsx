"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useTransition } from "react"

export function ShopSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const search = searchParams.get("search") || ""

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }

    startTransition(() => {
      router.push(`?${params.toString()}`)
    })
  }

  return (
    <Input
      placeholder="Search products..."
      value={search}
      onChange={(e) => handleSearch(e.target.value)}
      className="max-w-sm"
      disabled={isPending}
    />
  )
}
