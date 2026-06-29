'use client';
import { useEffect, useState } from 'react';
import { api, Session, formatTime, isLive } from '@/lib/api';
import { useFavorites } from '@/hooks/useFavorites';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favorites, toggle } = useFavorites();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favorites.length === 0) { setLoading(false); return; }
    Promise.all(favorites.map((id) => api.getSession(String(id)).catch(() => null)))
      .then((results) => {
        setSessions(results.filter(Boolean) as Session[]);
      })
      .finally(() => setLoading(false));
  }, [favorites.join(',')]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">⭐ Mes Favoris</h1>
      {loading ? (
        <p className="text-gray-400">Chargement...</p>
      ) : sessions.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 mb-4">Vous n'avez aucun favori pour l'instant.</p>
          <Link href="/events" className="btn-primary inline-block">Voir les événements</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((s) => {
            const live = isLive(s);
            return (
              <div key={s.id} className={`card flex gap-3 ${live ? 'border-red-300 bg-red-50' : ''}`}>
                <div className="flex-1">
                  <Link href={`/sessions/${s.id}`} className="font-semibold text-gray-900 hover:text-indigo-600">
                    {s.title}
                  </Link>
                  {live && <span className="badge-live ml-2">🔴 Live</span>}
                  <p className="text-sm text-gray-500 mt-1">
                    🕐 {formatTime(s.start_time)} – {formatTime(s.end_time)}
                    {s.room_name && ` · 🏛 ${s.room_name}`}
                  </p>
                </div>
                <button onClick={() => toggle(s.id)} className="text-xl text-yellow-500">⭐</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
