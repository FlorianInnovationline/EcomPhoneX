"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import Image from "next/image"
import { Link } from "@/i18n/routing"

export function LuxePhonesSection() {
  const t = useTranslations("home.luxePhones")

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col overflow-hidden">
      {/* Full-bleed background: gradient + subtle streaks. To use your own image: add className="bg-cover bg-center" and style={{ backgroundImage: 'url(/images/hero-phones.jpg)' }} to the inner div. */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50/95 to-neutral-100/90 dark:from-background dark:via-background dark:to-neutral-900/80" />
        {/* Subtle diagonal streaks for depth (OnePlus-style) */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(105deg, transparent 38%, #0a0a0a 42%, #0a0a0a 58%, transparent 62%),
                             linear-gradient(165deg, transparent 25%, #0a0a0a 30%, #0a0a0a 70%, transparent 75%)`,
            backgroundSize: "140% 100%, 100% 140%",
          }}
        />
      </div>

      {/* Content overlaid on background – centered, above phones */}
      <div className="relative z-10 flex flex-col flex-1 items-center justify-center text-center px-4 pt-16 sm:pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-2xl mx-auto space-y-4"
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
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-foreground text-background font-light text-sm tracking-wide hover:bg-foreground/90 transition-colors mt-6"
          >
            {t("cta")}
          </Link>
        </motion.div>
      </div>

      {/* Phones on the background – no panel, floating on the gradient */}
      <div className="relative z-10 flex justify-center items-end pt-4 pb-8 sm:pb-12 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          className="relative flex justify-center items-end gap-4 sm:gap-6 max-w-4xl mx-auto"
        >
          {/* Second phone (back, slight angle) */}
          <div className="hidden sm:block absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-[5%] w-[140px] sm:w-[160px] md:w-[180px] aspect-[9/19] -rotate-12">
            <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-neutral-800/90 dark:bg-neutral-900 shadow-2xl border border-white/10 flex items-center justify-center">
              <Image
                src="/images/placeholders/phone1.png"
                alt=""
                fill
                className="object-contain p-3 opacity-90"
                sizes="180px"
              />
            </div>
          </div>
          {/* Main phone (front, slight angle) */}
          <div className="relative w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] aspect-[9/19] rotate-3 drop-shadow-2xl">
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-neutral-900 dark:bg-black shadow-2xl border border-white/5 flex items-center justify-center">
              <Image
                src="/images/placeholders/phone1.png"
                alt="Xiaomi flagship phone"
                fill
                className="object-contain p-4"
                sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 240px"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
