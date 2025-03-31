import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const getToken = (request: NextRequest) => 
  request.cookies.get('token')?.value || request.headers.get('Authorization')?.split(' ')[1]

const isProtectedRoute = (pathname: string) => pathname.startsWith('/user-profile')
const isAuthPage = (pathname: string) => pathname.startsWith('/auth')

export function middleware(request: NextRequest) {
  const token = getToken(request)
  const pathname = request.nextUrl.pathname

  if (isProtectedRoute(pathname) && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (isAuthPage(pathname) && token) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/user-profile/:path*', '/auth/:path*']
} 