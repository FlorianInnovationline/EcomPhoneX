"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import Image from "next/image"
import { Link } from "@/i18n/routing"

const TABLET_IMAGE = "/images/placeholders/redmipad2pro.jpg"

export function LuxeTabletsSection() {
  const t = useTranslations("home.luxeTablets")

  return (
    <section className="relative bg-background overflow-hidden">
      <div className="container px-4 py-20 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image – single block, no nested placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="relative order-2 lg:order-1 aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden bg-muted/30 border border-border/30"
          >
            <Image
              src={TABLET_IMAGE}
              alt="Redmi Pad 2 Pro"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
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
