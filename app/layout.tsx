import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Xeno Mobile - Premium Smartphones",
  description: "Premium smartphones, delivered with care",
}

// Root layout - required by Next.js but locale routes use [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This layout is used for non-locale routes (like /admin, /login)
  // Locale routes use app/[locale]/layout.tsx which has its own html/body
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}
