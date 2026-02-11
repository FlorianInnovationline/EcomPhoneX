"use client"

import { useLocale } from "next-intl"
import { usePathname } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"

export function LanguageToggle() {
  const locale = useLocale()
  const pathname = usePathname() // Returns pathname WITHOUT locale (e.g., "/" or "/shop")
  const [isPending, startTransition] = useTransition()

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "pt" : "en"
    
    // Get the clean pathname (already without locale from usePathname)
    const cleanPath = pathname || "/"
    
    // Construct the new path with the new locale
    // For root path, it's just "/en" or "/pt"
    // For other paths, it's "/en/shop" or "/pt/shop"
    const newPath = cleanPath === "/" 
      ? `/${newLocale}` 
      : `/${newLocale}${cleanPath}`
    
    // Use direct navigation to ensure proper locale switching
    // This avoids React context issues that can occur with router navigation
    startTransition(() => {
      window.location.href = newPath
    })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      disabled={isPending}
      className="text-sm"
    >
      {locale === "en" ? "PT" : "EN"}
    </Button>
  )
}
