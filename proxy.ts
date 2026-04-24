import { NextRequest, NextResponse } from 'next/server';

// Routes that require the user to be logged in
const PROTECTED_ROUTES = ['/account', '/checkout', '/wishlist'];

const COOKIE_NAME = 'sakienah_token';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );

  if (isProtected && !request.cookies.has(COOKIE_NAME)) {
    const loginUrl = new URL('/login', request.nextUrl);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
