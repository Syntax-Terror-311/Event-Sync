import { NextResponse } from 'next/server';
import { fetchBackend } from '../../../../lib/config';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const response = await fetchBackend(`/rooms/${params.id}/sessions`);
  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}