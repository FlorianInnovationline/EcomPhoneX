"use client"

import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="border-t bg-background">
      <div className="container py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Xeno Mobile</h3>
            <p className="text-sm text-muted-foreground">
              {t("tagline")}
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-light uppercase tracking-wider">{t("shop")}</h4>
            <ul className="space-y-1 text-sm text-muted-foreground/80 font-light">
              <li>
                <Link href="/shop" className="block min-h-[44px] py-2 sm:py-0 sm:min-h-0 flex items-center hover:text-foreground transition-colors">
                  {t("allProducts")}
                </Link>
              </li>
              <li>
                <Link href="/collections" className="block min-h-[44px] py-2 sm:py-0 sm:min-h-0 flex items-center hover:text-foreground transition-colors">
                  {t("collections")}
                </Link>
              </li>
              <li>
                <Link href="/compare" className="block min-h-[44px] py-2 sm:py-0 sm:min-h-0 flex items-center hover:text-foreground transition-colors">
                  {t("compare")}
                </Link>
              </li>
              <li>
                <Link href="/deals" className="block min-h-[44px] py-2 sm:py-0 sm:min-h-0 flex items-center hover:text-foreground transition-colors">
                  {t("deals")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-light uppercase tracking-wider">{t("support")}</h4>
<ul className="space-y-1 text-sm text-muted-foreground/80 font-light">
            <li>
                <Link href="/support" className="block min-h-[44px] py-2 sm:py-0 sm:min-h-0 flex items-center hover:text-foreground transition-colors">
                  {t("supportHub")}
                </Link>
              </li>
              <li>
                <Link href="/track" className="block min-h-[44px] py-2 sm:py-0 sm:min-h-0 flex items-center hover:text-foreground transition-colors">
                  {t("trackOrder")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block min-h-[44px] py-2 sm:py-0 sm:min-h-0 flex items-center hover:text-foreground transition-colors">
                  {t("contactUs")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="block min-h-[44px] py-2 sm:py-0 sm:min-h-0 flex items-center hover:text-foreground transition-colors">
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="block min-h-[44px] py-2 sm:py-0 sm:min-h-0 flex items-center hover:text-foreground transition-colors">
                  {t("shipping")}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="block min-h-[44px] py-2 sm:py-0 sm:min-h-0 flex items-center hover:text-foreground transition-colors">
                  {t("returns")}
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="block min-h-[44px] py-2 sm:py-0 sm:min-h-0 flex items-center hover:text-foreground transition-colors">
                  {t("warranty")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-light uppercase tracking-wider">{t("company")}</h4>
<ul className="space-y-1 text-sm text-muted-foreground/80 font-light">
            <li>
                <Link href="/about" className="block min-h-[44px] py-2 sm:py-0 sm:min-h-0 flex items-center hover:text-foreground transition-colors">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="block min-h-[44px] py-2 sm:py-0 sm:min-h-0 flex items-center hover:text-foreground transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="block min-h-[44px] py-2 sm:py-0 sm:min-h-0 flex items-center hover:text-foreground transition-colors">
                  {t("termsOfService")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Xeno Mobile. {t("copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
