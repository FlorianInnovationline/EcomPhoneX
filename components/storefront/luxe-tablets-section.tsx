"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Link } from "@/i18n/routing"

export function LuxeTabletsSection() {
  const t = useTranslations("home.luxeTablets")

  return (
    <section className="relative bg-background overflow-hidden">
      <div className="container px-4 py-20 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual – soft gradient + tablet placeholder area */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="relative order-2 lg:order-1 rounded-2xl lg:rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] flex items-center justify-center bg-gradient-to-br from-slate-100 via-background to-primary/5 dark:from-slate-900/50 dark:via-background dark:to-primary/10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_30%_70%,var(--primary)/15,transparent)]" />
            {/* Placeholder tablet frame – replace with real image */}
            <div className="relative z-10 w-[85%] max-w-[360px] aspect-[4/3] rounded-2xl border border-border/40 bg-muted/30 shadow-xl flex items-center justify-center">
              <span className="text-muted-foreground/40 text-sm font-light">Tablet</span>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <p className="text-xs sm:text-sm font-light uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">
              {t("overline")}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-3">
              {t("title")}
            </h2>
            <p className="text-lg sm:text-xl font-light text-muted-foreground/80 tracking-wide mb-4">
              {t("tagline")}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground/60 font-light mb-10">
              {t("specs")}
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
