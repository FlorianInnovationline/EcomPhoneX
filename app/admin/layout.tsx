import { requireAdmin } from "@/lib/auth-helpers"
import { AdminShell } from "@/components/admin/admin-shell"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin()

  const messages = await getMessages({ locale: 'en' })

  return (
    <NextIntlClientProvider messages={messages}>
      <AdminShell>{children}</AdminShell>
    </NextIntlClientProvider>
  )
}
