"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Section, SectionHeader } from "@/components/storefront/section"

export function WhyBuySection() {
  const t = useTranslations("home.why")

  const features = [
    {
      key: "warranty",
      title: t("warranty"),
      description: t("warrantyDesc"),
    },
    {
      key: "shipping",
      title: t("shipping"),
      description: t("shippingDesc"),
    },
    {
      key: "support",
      title: t("support"),
      description: t("supportDesc"),
    },
  ]

  return (
    <Section variant="gradient">
      <div className="container px-4">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4 text-center"
            >
              <h3 className="text-xl font-light">{feature.title}</h3>
              <p className="text-muted-foreground/80 font-light leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
