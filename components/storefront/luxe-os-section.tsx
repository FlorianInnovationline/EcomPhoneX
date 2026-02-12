"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Link } from "@/i18n/routing"

export function LuxeOSSection() {
  const t = useTranslations("home.luxeOS")

  return (
    <section className="relative bg-background overflow-hidden">
      <div className="container px-4 py-20 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-16 items-stretch min-h-[min(70vh,640px)]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="relative order-2 lg:order-1 rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 min-h-[320px] sm:min-h-[400px] lg:min-h-0 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,var(--primary)/20,transparent)]" />
            <div className="relative z-10 text-center lg:text-left px-8 py-12 lg:px-12 lg:py-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-foreground/90">
                {t("title")}
              </h2>
              <p className="mt-2 text-lg sm:text-xl font-light text-muted-foreground/80 tracking-wide">
                {t("tagline")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="order-1 lg:order-2 flex flex-col justify-center py-12 lg:py-0"
          >
            <p className="text-xs sm:text-sm font-light uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">
              {t("overline")}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-3">
              {t("title")}
            </h2>
            <p className="text-lg sm:text-xl font-light text-muted-foreground/80 tracking-wide mb-2">
              {t("tagline")}
            </p>
            <p className="text-muted-foreground/70 font-light leading-relaxed max-w-lg mb-10">
              {t("description")}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center w-fit h-12 px-8 rounded-full bg-foreground text-background font-light text-sm tracking-wide hover:bg-foreground/90 transition-colors"
            >
              {t("cta")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
