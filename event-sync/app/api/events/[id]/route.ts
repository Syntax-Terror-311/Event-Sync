import { NextResponse } from 'next/server';
import { fetchBackend } from '../../../lib/config';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const response = await fetchBackend(`/events/${params.id}`);
  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const payload = await request.json();
  const response = await fetchBackend(`/events/${params.id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const response = await fetchBackend(`/events/${params.id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  }

  return new NextResponse(null, { status: 204 });
}
