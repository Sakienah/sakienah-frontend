import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
const COOKIE_NAME = 'sakienah_token';

export async function GET(_req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const apiRes = await fetch(`${API_URL}/auth/me`, {
    headers: { Cookie: `${COOKIE_NAME}=${token}` },
    cache: 'no-store',
  });

  const data = await apiRes.text();
  return new NextResponse(data, {
    status: apiRes.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
