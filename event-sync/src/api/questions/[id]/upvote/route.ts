import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/backend';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const response = await fetchBackend(`/questions/${params.id}/upvote`, {
    method: 'POST',
  });
  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}