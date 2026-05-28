import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/backend';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const live = searchParams.get('live');

  const path = live === 'true' ? '/sessions/live' : '/sessions';
  const response = await fetchBackend(path);
  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const authHeader = request.headers.get('authorization') ?? '';
  const response = await fetchBackend('/sessions', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
  });
  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}