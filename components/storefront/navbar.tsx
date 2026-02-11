"use client"

import { useState } from "react"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useCartStore } from "@/lib/store/cart-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LanguageToggle } from "./language-toggle"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/shop", key: "shop" },
  { href: "/collections", key: "collections" },
  { href: "/lifestyle", key: "lifestyle" },
  { href: "/compare", key: "compare" },
  { href: "/support", key: "support" },
] as const

export function Navbar() {
  const t = useTranslations("nav")
  const pathname = usePathname()
  const itemCount = useCartStore((state) => state.getItemCount())
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full min-w-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-top">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8 min-w-0 max-w-[100vw]">
        <Link href="/" className="flex items-center space-x-2 shrink-0" onClick={() => setMobileOpen(false)}>
          <span className="text-lg sm:text-xl font-semibold tracking-tight">Xeno Mobile</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ href, key }) => {
            const isActive = pathname === href || pathname.endsWith(href) || pathname.includes(href + "?")
            return (
              <Link
                key={key}
                href={href}
                className={cn(
                  "text-sm font-light transition-colors hover:text-foreground/80",
                  isActive ? "text-foreground" : "text-foreground/60"
                )}
              >
                {t(key)}
              </Link>
            )
          })}
        </div>

        {/* Right: lang + cart (and hamburger on mobile) */}
        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageToggle />
          <Link href="/cart" className="flex items-center">
            <Button variant="ghost" size="icon" className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-0.5 -right-0.5 h-5 min-w-[20px] flex items-center justify-center px-1 text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-10 w-10 rounded-full"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden border-t bg-background overflow-hidden transition-all duration-200 ease-out",
          mobileOpen ? "max-h-[280px] opacity-100" : "max-h-0 opacity-0 border-transparent"
        )}
      >
        <div className="container px-4 py-4 space-y-1">
          {navLinks.map(({ href, key }) => {
            const isActive = pathname === href || pathname.endsWith(href) || pathname.includes(href + "?")
            return (
              <Link
                key={key}
                href={href}
                className={cn(
                  "flex items-center min-h-[44px] px-3 rounded-lg text-sm font-light transition-colors hover:bg-muted/50 hover:text-foreground",
                  isActive ? "text-foreground bg-muted/30" : "text-foreground/80"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {t(key)}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
