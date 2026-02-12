import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Navbar } from '@/components/storefront/navbar'
import { Footer } from '@/components/storefront/footer'
import { Toaster } from '@/components/ui/toaster'
import '../globals.css'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover' as const,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export const metadata = {
  title: { default: 'Xeno Mobile', template: '%s | Xeno Mobile' },
  description: 'Premium smartphones and tech, delivered with care.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Xeno Mobile',
    statusBarStyle: 'default' as const,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Xeno Mobile',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages({ locale })

  // Do not render html/body here — root app/layout.tsx already does.
  // Duplicate html/body caused hydration error (mismatch for <nav> in <div>).
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* No overflow on these wrappers: position:sticky in HorizontalScrollPins breaks if any ancestor has overflow-x hidden */}
      <div className="flex min-h-screen min-w-0 max-w-[100vw] flex-col">
        <Navbar />
        <main className="min-w-0 w-full">{children}</main>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
      <Toaster />
    </NextIntlClientProvider>
  )
}
