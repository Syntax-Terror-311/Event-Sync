import { NextResponse } from 'next/server';
import { fetchBackend } from '../../../../lib/config';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const payload = await request.json();
  const response = await fetchBackend(`/sessions/${params.id}/questions`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}