import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import { headers } from 'next/headers'

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the pathname from headers to check if it's an admin route
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''
  
  // Skip next-intl for admin and login routes - return default locale
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    return {
      locale: routing.defaultLocale,
      messages: (await import(`../messages/${routing.defaultLocale}.json`)).default,
    }
  }

  // For locale routes, get the locale from the request
  let locale = await requestLocale

  // If no locale, default to 'en'
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
