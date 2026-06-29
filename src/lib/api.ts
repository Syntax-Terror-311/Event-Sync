const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store', // toujours récupérer les données fraîches (pas de cache Next.js)
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  getEvents: () => apiFetch<Event[]>('/events'),
  getEvent: (id: string) => apiFetch<EventDetail>(`/events/${id}`),
  getSession: (id: string) => apiFetch<Session>(`/sessions/${id}`),
  getSpeaker: (id: string) => apiFetch<Speaker>(`/speakers/${id}`),
  getQuestions: (sessionId: string) =>
    apiFetch<Question[]>(`/questions?session_id=${sessionId}`),
  postQuestion: (data: { session_id: number; content: string; author_name?: string }) =>
    apiFetch<Question>('/questions', { method: 'POST', body: JSON.stringify(data) }),
  upvoteQuestion: (id: number) =>
    apiFetch<Question>(`/questions/${id}/upvote`, { method: 'POST' }),
  getRoomSessions: (roomId: string) =>
    apiFetch<Session[]>(`/rooms/${roomId}/sessions`),
};

// Types
export interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
}

export interface Room {
  id: number;
  name: string;
  event_id: number;
}

export interface Speaker {
  id: number;
  full_name: string;
  photo_url?: string;
  bio?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
  sessions?: Session[];
}

export interface Session {
  id: number;
  event_id: number;
  room_id: number;
  room_name?: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  capacity?: number;
  speakers?: Speaker[];
  questions?: Question[];
}

export interface EventDetail extends Event {
  sessions: Session[];
  rooms: Room[];
}

export interface Question {
  id: number;
  session_id: number;
  content: string;
  author_name?: string;
  upvotes: number;
  created_at: string;
}

export function isLive(session: Pick<Session, 'start_time' | 'end_time'>): boolean {
  const now = new Date();
  return now >= new Date(session.start_time) && now <= new Date(session.end_time);
}

export function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
