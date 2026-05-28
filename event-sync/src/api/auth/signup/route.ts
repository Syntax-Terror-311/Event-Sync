import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/backend';

export async function POST(request: Request) {
  const payload = await request.json();
  const response = await fetchBackend('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}
