import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/account', '/checkout', '/wishlist'];
const COOKIE_NAME = 'sakienah_token';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isDev = process.env.NODE_ENV === 'development';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    `style-src 'self'${isDev ? " 'unsafe-inline'" : ` 'nonce-${nonce}'`}`,
    `connect-src 'self' ${apiUrl}`,
    "img-src 'self' blob: data: https:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(!isDev ? ['upgrade-insecure-requests'] : []),
  ].join('; ');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );

  let response: NextResponse;
  if (isProtected && !request.cookies.has(COOKIE_NAME)) {
    const loginUrl = new URL('/login', request.nextUrl);
    loginUrl.searchParams.set('from', pathname);
    response = NextResponse.redirect(loginUrl);
  } else {
    response = NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  response.headers.set('Content-Security-Policy', csp);
  return response;
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
