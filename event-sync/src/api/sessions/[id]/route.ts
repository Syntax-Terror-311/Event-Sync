import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/backend';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const response = await fetchBackend(`/sessions/${params.id}`);
  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const payload = await request.json();
  const authHeader = request.headers.get('authorization') ?? '';
  const response = await fetchBackend(`/sessions/${params.id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
  });
  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const authHeader = request.headers.get('authorization') ?? '';
  const response = await fetchBackend(`/sessions/${params.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: authHeader,
    },
  });
  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}