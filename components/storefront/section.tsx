"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: ReactNode
  className?: string
  variant?: "default" | "muted" | "gradient"
  noPadding?: boolean
}

export function Section({ children, className, variant = "default", noPadding = false }: SectionProps) {
  const variants = {
    default: "bg-background",
    muted: "bg-muted/30",
    gradient: "bg-gradient-to-b from-background to-muted/20",
  }

  return (
    <section className={cn(variants[variant], !noPadding && "py-16 sm:py-24 lg:py-32", className)}>
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
  className?: string
}

export function SectionHeader({ title, subtitle, align = "center", className }: SectionHeaderProps) {
  const alignments = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className={cn("mb-12 sm:mb-16", alignments[align], className)}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight mb-3 sm:mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground/80 text-base sm:text-lg font-light max-w-2xl mx-auto md:mx-0">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

interface DividerProps {
  className?: string
  variant?: "default" | "subtle"
}

export function Divider({ className, variant = "default" }: DividerProps) {
  const variants = {
    default: "border-border",
    subtle: "border-border/30",
  }

  return <div className={cn("border-t", variants[variant], className)} />
}

interface CTAButtonProps {
  children: ReactNode
  href: string
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function CTAButton({ children, href, variant = "default", size = "md", className }: CTAButtonProps) {
  const { Link } = require("@/i18n/routing")
  
  const variants = {
    default: "bg-foreground text-background hover:bg-foreground/90",
    outline: "border border-border hover:bg-muted",
    ghost: "hover:bg-muted",
  }

  const sizes = {
    sm: "px-6 py-2.5 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  }

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-light tracking-wide transition-all duration-300",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </Link>
  )
}
