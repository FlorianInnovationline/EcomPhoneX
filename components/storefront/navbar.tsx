"use client"

import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/store/cart-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LanguageToggle } from "./language-toggle"

export function Navbar() {
  const t = useTranslations("nav")
  const itemCount = useCartStore((state) => state.getItemCount())

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-semibold tracking-tight">Xeno Mobile</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/shop"
            className="text-sm font-light transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {t("shop")}
          </Link>
          <Link
            href="/collections"
            className="text-sm font-light transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {t("collections")}
          </Link>
          <Link
            href="/compare"
            className="text-sm font-light transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {t("compare")}
          </Link>
          <Link
            href="/support"
            className="text-sm font-light transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {t("support")}
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageToggle />
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
