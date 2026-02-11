import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Exclude admin and login routes from i18n middleware
  // These routes should be handled directly without locale prefix
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    // TODO: Add admin auth check when backend is implemented
    // if (pathname.startsWith('/admin')) {
    //   const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    //   if (!token || token.role !== 'ADMIN') {
    //     return NextResponse.redirect(new URL('/login', request.url))
    //   }
    // }
    
    // Add pathname to headers so i18n/request.ts can check it
    const response = NextResponse.next()
    response.headers.set('x-pathname', pathname)
    return response
  }
  
  // Handle i18n for storefront routes only
  const response = await intlMiddleware(request)
  response.headers.set('x-pathname', pathname)
  return response
}

export const config = {
  matcher: [
    // Match root path and routes that start with /en or /pt
    // This excludes /admin, /login, /api, /_next, etc.
    '/',
    '/(en|pt)(/.*)?',
  ],
}
