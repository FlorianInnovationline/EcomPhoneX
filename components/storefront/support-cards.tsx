"use client"

import { motion } from "framer-motion"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"

interface SupportCard {
  title: string
  description: string
  href: string
}

interface SupportCardsProps {
  cards: SupportCard[]
  className?: string
}

export function SupportCards({ cards, className }: SupportCardsProps) {
  return (
    <div className={cn("grid sm:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {cards.map((card, index) => (
        <motion.div
          key={card.href}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -4 }}
        >
          <Link
            href={card.href}
            className="block p-8 rounded-2xl border border-border/50 bg-background hover:border-border transition-all duration-300 group"
          >
            <h3 className="text-xl font-light mb-3 group-hover:text-foreground/80 transition-colors">
              {card.title}
            </h3>
            <p className="text-sm text-muted-foreground/80 font-light leading-relaxed">
              {card.description}
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
