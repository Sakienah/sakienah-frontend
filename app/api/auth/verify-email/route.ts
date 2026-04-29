import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
const COOKIE_NAME = 'sakienah_token';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60;

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ message: 'Token ontbreekt.' }, { status: 400 });
  }

  const apiRes = await fetch(`${API_URL}/auth/verify-email?token=${encodeURIComponent(token)}`, {
    method: 'GET',
  });

  const data = await apiRes.text();

  if (!apiRes.ok) {
    return new NextResponse(data, {
      status: apiRes.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const setCookie = apiRes.headers.get('set-cookie') ?? '';
  const tokenMatch = setCookie.match(/sakienah_token=([^;]+)/);
  const jwtToken = tokenMatch?.[1];

  const res = new NextResponse(data, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

  if (jwtToken) {
    const isProd = process.env.NODE_ENV === 'production';
    res.cookies.set(COOKIE_NAME, jwtToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProd,
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });
  }

  return res;
}
