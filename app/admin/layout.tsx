import { requireAdmin } from "@/lib/auth-helpers"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin()

  // Load messages for admin (using default locale 'en')
  const messages = await getMessages({ locale: 'en' })

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader />
          <main className="flex-1 p-8 lg:p-12">{children}</main>
        </div>
      </div>
    </NextIntlClientProvider>
  )
}
