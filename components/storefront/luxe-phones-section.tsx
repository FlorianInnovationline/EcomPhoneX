"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import Image from "next/image"
import { Link } from "@/i18n/routing"

export function LuxePhonesSection() {
  const t = useTranslations("home.luxePhones")

  return (
    <section className="relative bg-muted/20 overflow-hidden">
      <div className="container px-4 py-20 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Copy – left on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="text-center lg:text-left"
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

          {/* Visual – product placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="relative flex items-center justify-center min-h-[320px] sm:min-h-[400px]"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-muted/50 to-muted/30 border border-border/40 shadow-2xl flex items-center justify-center">
              <Image
                src="/images/placeholders/phone1.png"
                alt="Premium phone"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 280px, 320px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
