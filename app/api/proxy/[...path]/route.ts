import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
const COOKIE_NAME = 'sakienah_token';

type Params = { params: Promise<{ path: string[] }> };

async function proxyRequest(req: NextRequest, params: Params['params']) {
  const { path } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  const headers: Record<string, string> = {};
  const contentType = req.headers.get('content-type');
  if (contentType) headers['content-type'] = contentType;
  if (token) headers['cookie'] = `${COOKIE_NAME}=${token}`;

  const qs = req.nextUrl.searchParams.toString();
  const apiPath = path.join('/') + (qs ? `?${qs}` : '');

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  const body = hasBody ? await req.text() : undefined;

  const apiRes = await fetch(`${API_URL}/${apiPath}`, {
    method: req.method,
    headers,
    body,
  });

  const data = await apiRes.text();
  const resContentType = apiRes.headers.get('content-type') ?? 'application/json';

  return new NextResponse(data, {
    status: apiRes.status,
    headers: { 'Content-Type': resContentType },
  });
}

export async function GET(req: NextRequest, ctx: Params) {
  return proxyRequest(req, ctx.params);
}
export async function POST(req: NextRequest, ctx: Params) {
  return proxyRequest(req, ctx.params);
}
export async function PUT(req: NextRequest, ctx: Params) {
  return proxyRequest(req, ctx.params);
}
export async function PATCH(req: NextRequest, ctx: Params) {
  return proxyRequest(req, ctx.params);
}
export async function DELETE(req: NextRequest, ctx: Params) {
  return proxyRequest(req, ctx.params);
}
