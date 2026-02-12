"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Link } from "@/i18n/routing"

const PHONES_BG_IMAGE = "/images/placeholders/phoneSection.jpg"

export function LuxePhonesSection() {
  const t = useTranslations("home.luxePhones")

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col overflow-hidden">
      {/* Full-bleed background: your image with 2 phones. Fallback gradient if image missing. */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50/98 to-neutral-100/95 dark:from-background dark:via-background dark:to-neutral-900/90" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${PHONES_BG_IMAGE})` }}
        />
      </div>

      {/* Content overlaid on background – left-aligned so text stays clear of phone image */}
      <div className="relative z-10 flex flex-1 flex-col items-start justify-center px-4 sm:px-6 lg:px-10 py-20 sm:py-24 pl-6 sm:pl-10 lg:pl-[10vw]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-xl text-left space-y-4"
        >
          <p className="text-xs sm:text-sm font-light uppercase tracking-[0.25em] text-muted-foreground/70">
            {t("overline")}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="text-lg sm:text-xl font-light text-muted-foreground/80 tracking-wide">
            {t("tagline")}
          </p>
          <p className="text-sm sm:text-base text-muted-foreground/60 font-light">
            {t("specs")}
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-foreground text-background font-light text-sm tracking-wide hover:bg-foreground/90 transition-colors mt-6 w-fit"
          >
            {t("cta")}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
