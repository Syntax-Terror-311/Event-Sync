import 'server-only';

export const API_BASE_URL = process.env.NEXT_API_BASE_URL;

export async function fetchBackend(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(options.method && options.method !== 'GET' && options.method !== 'HEAD' ? { 'Content-Type': 'application/json' } : {}),
    },
  });

  return response;
}

export async function fetchEvents() {
  try {
    const response = await fetchBackend('/events');
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Impossible de charger les événements');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function fetchEventById(id: string) {
  const response = await fetchBackend(`/events/${id}`);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Impossible de charger l\'événement');
  }
  return response.json();
}

export async function fetchSessions() {
  const response = await fetchBackend('/sessions');
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Impossible de charger les sessions');
  }
  return response.json();
}

export async function fetchSessionById(id: string) {
  const response = await fetchBackend(`/sessions/${id}`);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Impossible de charger la session');
  }
  return response.json();
}

export async function fetchLiveSessions() {
  const response = await fetchBackend('/sessions/live');
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Impossible de charger les sessions live');
  }
  return response.json();
}

export async function fetchSpeakers() {
  const response = await fetchBackend('/speakers');
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Impossible de charger les intervenants');
  }
  return response.json();
}

export async function fetchSpeakerById(id: string) {
  const response = await fetchBackend(`/speakers/${id}`);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Impossible de charger l\'intervenant');
  }
  return response.json();
}

export async function fetchRooms() {
  const response = await fetchBackend('/rooms');
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Impossible de charger les salles');
  }
  return response.json();
}

export async function fetchRoomById(id: string) {
  const response = await fetchBackend(`/rooms/${id}`);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Impossible de charger la salle');
  }
  return response.json();
}

export async function fetchSessionsByRoom(roomId: string) {
  const response = await fetchBackend(`/rooms/${roomId}/sessions`);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Impossible de charger les sessions de la salle');
  }
  return response.json();
}
