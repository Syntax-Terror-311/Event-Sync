import { NextResponse } from 'next/server';
import { fetchBackend } from '../../../lib/config';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization') ?? '';
  const response = await fetchBackend('/auth/me', {
    headers: {
      Authorization: authHeader,
    },
  });
  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}
