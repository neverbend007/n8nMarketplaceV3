import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS_PREFIX = ['/_next', '/api'];

// Allow unauthenticated for these exact paths
const PUBLIC_PATHS_EXACT = ['/', '/login'];

const ROLE_PROTECTED: Record<string, 'user' | 'creator' | 'admin'> = {
  '/dashboard': 'user',
  '/creator': 'creator',
  '/admin': 'admin',
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (PUBLIC_PATHS_EXACT.includes(pathname) || PUBLIC_PATHS_PREFIX.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Get JWT from cookie set by auth helpers
  const authCookie = req.cookies.get('supabase-auth-token')?.value
  if (!authCookie) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  let token = '';
  try {
    token = JSON.parse(authCookie)[0]?.access_token ?? '';
  } catch {
    token = '';
  }
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Decode payload (base64url)
  const payloadSegment = token.split('.')[1]
  try {
    const payloadJson = JSON.parse(Buffer.from(payloadSegment, 'base64').toString())
    const role = payloadJson.user_metadata?.role ?? 'user'

    for (const route in ROLE_PROTECTED) {
      if (pathname.startsWith(route)) {
        const required = ROLE_PROTECTED[route]
        const hierarchy = ['user', 'creator', 'admin']
        const allowed = hierarchy.indexOf(role) >= hierarchy.indexOf(required)
        if (!allowed) {
          return NextResponse.redirect(new URL('/login', req.url))
        }
        break
      }
    }
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/creator', '/creator/:path*', '/admin', '/admin/:path*'],
}; 