import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/backend';

export async function GET() {
  const response = await fetchBackend('/speakers');
  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const authHeader = request.headers.get('authorization') ?? '';
  const response = await fetchBackend('/speakers', {
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