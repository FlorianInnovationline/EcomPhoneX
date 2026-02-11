"use client"

import { Section } from "@/components/storefront/section"
import { Link } from "@/i18n/routing"

export function TrustStripSection() {
  const items = [
    { label: "2-Year Warranty", href: "/warranty" },
    { label: "Free Shipping", href: "/shipping" },
    { label: "Easy Returns", href: "/returns" },
    { label: "Secure Payments", href: "/privacy" },
  ]

  return (
    <Section variant="muted" className="py-8 sm:py-12">
      <div className="container px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs sm:text-sm font-light text-muted-foreground/80 hover:text-foreground transition-colors min-h-[44px] flex items-center justify-center py-2 sm:py-0"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </Section>
  )
}
