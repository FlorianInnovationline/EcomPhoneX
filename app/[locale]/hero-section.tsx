"use client"

import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRef } from "react"

export function HeroSection() {
  const t = useTranslations("home.hero")
  const router = useRouter()
  const heroRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  // Smooth spring animations for scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  // Phone animations - more dramatic and smooth
  const phoneRotate = useTransform(smoothProgress, [0, 1], [0, 12])
  const phoneY = useTransform(smoothProgress, [0, 1], [0, 120])
  const phoneScale = useTransform(smoothProgress, [0, 0.5], [1, 0.88])
  const phoneOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0.25])
  
  // Text animations on scroll - smoother
  const textY = useTransform(smoothProgress, [0, 1], [0, 40])
  const textOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/20"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <div className="container relative z-10 px-4 h-full flex flex-col md:block">
        {/* Creative Layout: On mobile stack; on md+ phone centered with text around */}
        <div className="relative flex flex-col md:flex-row items-center justify-center min-h-0 flex-1 md:flex-none h-full py-6 sm:py-8 md:py-4 lg:py-6">
          
          {/* Phone Image - Centered */}
          <motion.div
            ref={phoneRef}
            style={{
              rotate: phoneRotate,
              y: phoneY,
              scale: phoneScale,
              opacity: phoneOpacity,
            }}
            initial={{ 
              opacity: 0, 
              rotate: -25, 
              scale: 0.7,
              y: 50
            }}
            animate={{ 
              opacity: 1, 
              rotate: 0, 
              scale: 1,
              y: 0
            }}
            transition={{ 
              duration: 1.5,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="relative z-20 flex items-center justify-center w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[280px] md:max-w-sm lg:max-w-md shrink-0"
          >
            <motion.div 
              className="relative w-full aspect-[9/16]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <Image
                src="/images/hero/phone.png"
                alt="Premium Smartphone"
                fill
                className="object-contain"
                priority
                style={{
                  filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.15))",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Text Content - On mobile: below phone (in flow); on md+: absolute around phone */}
          <div className="relative md:absolute md:inset-0 flex flex-col md:flex-none items-center justify-center pointer-events-none md:contents">
            {/* Left Side Text - Below phone on mobile; bottom-left on desktop */}
            <motion.div
              style={{
                y: textY,
                opacity: textOpacity,
              }}
              initial={{ opacity: 0, x: -60, y: 40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ 
                duration: 1,
                delay: 0.3,
                ease: [0.19, 1, 0.22, 1]
              }}
              className="relative md:absolute left-0 lg:left-6 xl:left-12 md:bottom-12 lg:bottom-20 xl:bottom-24 text-center md:text-left max-w-[320px] sm:max-w-[360px] md:max-w-sm lg:max-w-md pointer-events-auto mt-4 md:mt-0 px-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1.2,
                  delay: 0.4,
                  ease: [0.19, 1, 0.22, 1]
                }}
                className="space-y-1 sm:space-y-2"
              >
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[-0.02em] text-balance leading-[1.1]"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 1.2,
                    delay: 0.5,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                >
                  <span className="text-foreground font-light">
                    {t("title")}
                  </span>
                </motion.h1>
              </motion.div>
              <motion.p 
                className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground/80 mt-4 sm:mt-5 lg:mt-6 text-balance font-light leading-relaxed tracking-wide"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1.2,
                  delay: 0.6,
                  ease: [0.19, 1, 0.22, 1]
                }}
              >
                {t("subtitle")}
              </motion.p>
              {/* Mobile CTA - visible only on small screens */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="md:hidden mt-6"
              >
                <Button
                  size="lg"
                  onClick={() => router.push("/shop")}
                  className="w-full sm:w-auto text-sm sm:text-base px-8 py-4 bg-foreground text-background hover:bg-foreground/90 rounded-full font-light tracking-wide"
                >
                  {t("cta")}
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Side CTA + Visual Elements - Hidden on small screens; top-right on md+ */}
            <motion.div
              style={{
                y: textY,
                opacity: textOpacity,
              }}
              initial={{ opacity: 0, x: 60, y: -40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ 
                duration: 1,
                delay: 0.3,
                ease: [0.19, 1, 0.22, 1]
              }}
              className="hidden md:block absolute right-0 lg:right-6 xl:right-12 top-8 lg:top-12 xl:top-16 text-right pointer-events-auto"
            >
              {/* Ultra Minimal Badges - Elegant */}
              <motion.div
                initial={{ opacity: 0, x: 40, y: -30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ 
                  duration: 1.2,
                  delay: 0.4,
                  ease: [0.19, 1, 0.22, 1]
                }}
                className="flex flex-col gap-3 items-end mb-6 sm:mb-7"
              >
                <motion.div 
                  className="flex items-center gap-3 group"
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
                  <span className="text-xs sm:text-sm text-foreground/70 font-light tracking-wider uppercase">In Stock</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 group"
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xs sm:text-sm text-foreground/70 font-light tracking-wider uppercase">Free Shipping</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 group"
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xs sm:text-sm text-foreground/70 font-light tracking-wider uppercase">2-Year Warranty</span>
                </motion.div>
              </motion.div>

              {/* CTA Button - Premium */}
              <motion.div
                initial={{ opacity: 0, x: 40, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ 
                  duration: 1.2,
                  delay: 0.5,
                  ease: [0.19, 1, 0.22, 1]
                }}
                className="mb-6 sm:mb-7"
              >
                <Button
                  size="lg"
                  onClick={() => router.push("/shop")}
                  className="text-sm sm:text-base px-8 sm:px-10 py-4 sm:py-5 bg-foreground text-background hover:bg-foreground/90 transition-all duration-500 rounded-full shadow-lg hover:shadow-xl hover:scale-105 font-light tracking-wide"
                >
                  {t("cta")}
                </Button>
              </motion.div>

              {/* Stats - Elegant Typography */}
              <motion.div
                initial={{ opacity: 0, x: 40, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ 
                  duration: 1.2,
                  delay: 0.6,
                  ease: [0.19, 1, 0.22, 1]
                }}
                className="space-y-4"
              >
                <motion.div 
                  className="text-right"
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-foreground leading-none tracking-tight">10K+</div>
                  <div className="text-xs text-muted-foreground/60 mt-1.5 font-light tracking-wider uppercase">Happy Customers</div>
                </motion.div>
                <motion.div 
                  className="text-right"
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-foreground leading-none tracking-tight">4.9★</div>
                  <div className="text-xs text-muted-foreground/60 mt-1.5 font-light tracking-wider uppercase">Average Rating</div>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>

          {/* Decorative gradient circles for depth */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.08 }}
              transition={{ duration: 2, delay: 0.8 }}
              className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-3xl"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 2, delay: 1 }}
              className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-l from-primary/20 via-primary/10 to-transparent blur-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
