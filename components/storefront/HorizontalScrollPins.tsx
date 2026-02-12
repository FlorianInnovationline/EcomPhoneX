"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useTranslations } from "next-intl"

/**
 * HorizontalScrollPins Component
 * 
 * Implements scroll-jacking behavior similar to Xiaomi/Apple product pages:
 * - Section pins to viewport when scrolled into view
 * - Vertical scroll input drives horizontal card movement
 * - Smooth conversion using Framer Motion
 * - Responsive: vertical stack on mobile, horizontal scroll on desktop
 * - Respects prefers-reduced-motion
 */
export function HorizontalScrollPins() {
  const t = useTranslations("home.features")
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackWidth, setTrackWidth] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Check for mobile and reduced motion preferences
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setViewportWidth(window.innerWidth)
    }
    
    const checkReducedMotion = () => {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    }
    
    checkMobile()
    checkReducedMotion()
    
    window.addEventListener("resize", checkMobile)
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    mediaQuery.addEventListener("change", checkReducedMotion)
    
    return () => {
      window.removeEventListener("resize", checkMobile)
      mediaQuery.removeEventListener("change", checkReducedMotion)
    }
  }, [])

  // Calculate track width for scroll distance calculation - Optimized with debounce
  useEffect(() => {
    if (!trackRef.current || isMobile) return
    
    let rafId: number | null = null
    let resizeTimeout: NodeJS.Timeout | null = null
    
    const calculateTrackWidth = () => {
      if (rafId) cancelAnimationFrame(rafId)
      
      rafId = requestAnimationFrame(() => {
        if (trackRef.current) {
          setTrackWidth(trackRef.current.scrollWidth)
        }
        rafId = null
      })
    }
    
    // Initial calculation with delay for content to load
    const initialTimeout = setTimeout(calculateTrackWidth, 100)
    
    // Debounced resize handler
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(calculateTrackWidth, 150)
    }
    
    window.addEventListener("resize", handleResize, { passive: true })
    
    return () => {
      clearTimeout(initialTimeout)
      if (resizeTimeout) clearTimeout(resizeTimeout)
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener("resize", handleResize)
    }
  }, [isMobile])

  // Wrapper must be taller than viewport so vertical scroll "pauses" while progress 0→1 drives horizontal cards.
  // Use a minimum extra height so the section pins even before trackWidth is measured (avoids "scrolls over").
  const extraScrollPx = Math.max(0, trackWidth - viewportWidth, 1200)
  const wrapperHeight = isMobile 
    ? "auto" 
    : `calc(100vh + ${extraScrollPx}px)`

  // Use Framer Motion scroll tracking with optimized offset
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"]
  })

  // Ultra-smooth spring for buttery smooth animation
  // Higher stiffness = more responsive, lower damping = smoother
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: reducedMotion ? 400 : 150, // Increased from 100 for more responsiveness
    damping: reducedMotion ? 50 : 25, // Reduced from 30 for smoother motion
    mass: 0.5, // Lighter mass for faster response
    restDelta: 0.0001, // More precise rest detection
    restSpeed: 0.01 // Faster rest speed
  })

  // Convert vertical scroll progress to horizontal translateX
  // Progress goes from 0 (start) to 1 (end)
  // translateX goes from 0 to -(trackWidth - viewportWidth)
  const maxTranslate = Math.max(0, trackWidth - viewportWidth)
  
  // Use clamp to ensure values stay within bounds and add easing
  const translateX = useTransform(
    smoothProgress,
    [0, 1],
    [0, -maxTranslate],
    {
      clamp: true // Clamp values to prevent overshooting
    }
  )

  const features = [
    {
      key: "camera",
      title: t("camera.title"),
      description: t("camera.description"),
      gradient: "from-purple-500/20 via-pink-500/20 to-red-500/20",
      borderGradient: "from-purple-500/30 to-pink-500/30"
    },
    {
      key: "display",
      title: t("display.title"),
      description: t("display.description"),
      gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
      borderGradient: "from-blue-500/30 to-cyan-500/30"
    },
    {
      key: "performance",
      title: t("performance.title"),
      description: t("performance.description"),
      gradient: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
      borderGradient: "from-orange-500/30 to-amber-500/30"
    },
    {
      key: "battery",
      title: t("battery.title"),
      description: t("battery.description"),
      gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
      borderGradient: "from-green-500/30 to-emerald-500/30"
    },
    {
      key: "design",
      title: t("design.title"),
      description: t("design.description"),
      gradient: "from-slate-500/20 via-gray-500/20 to-zinc-500/20",
      borderGradient: "from-slate-500/30 to-gray-500/30"
    },
    {
      key: "security",
      title: t("security.title"),
      description: t("security.description"),
      gradient: "from-indigo-500/20 via-violet-500/20 to-purple-500/20",
      borderGradient: "from-indigo-500/30 to-violet-500/30"
    },
  ]

  // Mobile: Compact grid – clean, low height, no long scroll
  if (isMobile) {
    return (
      <section className="py-10 sm:py-12 border-t bg-gradient-to-b from-background to-muted/10">
        <div className="container px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">
              {t("title")}
            </h2>
            <p className="text-muted-foreground/80 mt-1.5 text-sm font-light max-w-md mx-auto">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {features.map((feature) => (
              <div
                key={feature.key}
                className={`
                  relative rounded-xl sm:rounded-2xl overflow-hidden
                  bg-gradient-to-br ${feature.gradient}
                  border border-border/40
                  p-3.5 sm:p-4
                  min-h-0
                `}
              >
                <h3 className="text-[13px] sm:text-sm font-medium tracking-tight text-foreground leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground/80 font-light leading-snug mt-1 line-clamp-2">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Desktop: Pinned horizontal scroll
  return (
    <section 
      ref={wrapperRef}
      className="relative border-t bg-gradient-to-b from-background to-muted/10"
      style={{ height: wrapperHeight }}
    >
      {/* Sticky pinned container - Optimized for smooth scrolling */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          // Force GPU acceleration for sticky element
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden"
        }}
      >
        {/* Header - fixed at top */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-12 pb-8">
          <div className="container">
            <div className="space-y-4 text-center">
              <motion.h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              >
                {t("title")}
              </motion.h2>
              <motion.p 
                className="text-muted-foreground/80 max-w-2xl mx-auto text-lg font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              >
                {t("subtitle")}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Horizontal scrolling track */}
        <div className="absolute inset-0 flex items-center pt-32">
          <div className="relative w-full h-full overflow-hidden">
            {/* Gradient fade edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            
            {/* Horizontal track - Optimized for GPU acceleration */}
            <motion.div
              ref={trackRef}
              style={{ 
                x: translateX,
                willChange: "transform",
                // Force GPU acceleration
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                perspective: "1000px"
              }}
              className="flex gap-6 px-4 sm:px-6 lg:px-8 items-center h-full"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: reducedMotion ? 0.3 : 0.6, 
                    delay: reducedMotion ? 0 : index * 0.1,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                  whileHover={reducedMotion ? {} : { scale: 1.02, y: -8 }}
                  className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[42vw] xl:w-[35vw] group"
                >
                  <div 
                    className={`
                      relative h-[450px] sm:h-[500px] lg:h-[550px] 
                      rounded-3xl overflow-hidden
                      bg-gradient-to-br ${feature.gradient}
                      border border-border/50
                      backdrop-blur-sm
                      transition-all duration-500
                      group-hover:border-opacity-100
                      shadow-lg group-hover:shadow-2xl
                    `}
                    style={{
                      // GPU acceleration for cards
                      willChange: "transform",
                      transform: "translateZ(0)",
                      backfaceVisibility: "hidden"
                    }}
                  >
                    {/* Gradient Border Effect */}
                    <div className={`
                      absolute inset-0 rounded-3xl
                      bg-gradient-to-br ${feature.borderGradient}
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                      -z-10 blur-xl
                    `} />
                    
                    {/* Content */}
                    <div className="relative h-full p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                      <div className="space-y-4">
                        <motion.h3 
                          className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-foreground"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          {feature.title}
                        </motion.h3>
                        <motion.p 
                          className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 font-light leading-relaxed max-w-md"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          {feature.description}
                        </motion.p>
                      </div>
                      
                      {/* Decorative Element */}
                      <motion.div
                        className="absolute bottom-8 right-8 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`
                        }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
