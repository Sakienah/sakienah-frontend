import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/account', '/wishlist'];
const COOKIE_NAME = 'sakienah_token';
const DEV_COOKIE = 'sakienah_dev';
const MAINTENANCE_PAGE = '/dropping-soon';
const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
const DEV_BYPASS_SECRET = process.env.DEV_BYPASS_SECRET ?? 'sakienah-dev-bypass-2024';
const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === 'true';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Maintenance mode ──
  if (MAINTENANCE_MODE) {
    const hasDevCookie = request.cookies.get(DEV_COOKIE)?.value === '1';

    // Dev bypass: if dev cookie present, allow through to everything
    if (hasDevCookie) {
      return NextResponse.next();
    }

    // Dev bypass setup: ?bypass=SECRET on the dropping-soon page sets the cookie
    if (
      pathname === MAINTENANCE_PAGE &&
      request.nextUrl.searchParams.get('bypass') === DEV_BYPASS_SECRET
    ) {
      const url = new URL('/', request.nextUrl);
      const response = NextResponse.redirect(url);
      response.cookies.set(DEV_COOKIE, '1', {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
      return response;
    }

    // Allow the maintenance page itself and static assets
    if (
      pathname === MAINTENANCE_PAGE ||
      pathname.startsWith('/brand_assets/') ||
      pathname.startsWith('/images/') ||
      pathname.endsWith('.svg') ||
      pathname.endsWith('.png') ||
      pathname.endsWith('.jpg') ||
      pathname.endsWith('.jpeg') ||
      pathname.endsWith('.webp') ||
      pathname.endsWith('.ico') ||
      pathname.endsWith('.woff') ||
      pathname.endsWith('.woff2') ||
      pathname.endsWith('.ttf') ||
      pathname.endsWith('.css') ||
      pathname.endsWith('.js')
    ) {
      return NextResponse.next();
    }

    // Redirect everything else to the dropping-soon page
    return NextResponse.redirect(new URL(MAINTENANCE_PAGE, request.nextUrl));
  }

  // ── Auth guard for protected routes ──
  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return redirectToLogin(request);
  }

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Cookie: `${COOKIE_NAME}=${token}` },
      cache: 'no-store',
    });
    if (!res.ok) return redirectToLogin(request);
  } catch {
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL('/login', request.nextUrl);
  loginUrl.searchParams.set('from', request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
