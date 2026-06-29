'use client';
import Link from 'next/link';
import { Session, formatTime, isLive } from '@/lib/api';
import { useFavorites } from '@/hooks/useFavorites';

export default function SessionCard({ session }: { session: Session }) {
  const { isFavorite, toggle } = useFavorites();
  const live = isLive(session);
  const fav = isFavorite(session.id);

  return (
    <div className={`card flex gap-3 ${live ? 'border-red-300 bg-red-50' : ''}`}>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/sessions/${session.id}`}
            className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
          >
            {session.title}
          </Link>
          {live && <span className="badge-live shrink-0">🔴 Live</span>}
        </div>

        <div className="text-sm text-gray-500 mt-1 flex gap-3 flex-wrap">
          <span>🕐 {formatTime(session.start_time)} – {formatTime(session.end_time)}</span>
          {session.room_name && <span>🏛 {session.room_name}</span>}
          {session.capacity ? <span>👥 {session.capacity} places</span> : null}
        </div>

        {session.speakers && session.speakers.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {session.speakers.map((sp) => (
              <Link
                key={sp.id}
                href={`/speakers/${sp.id}`}
                className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full hover:bg-indigo-200"
              >
                {sp.full_name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => toggle(session.id)}
        className="text-xl self-start"
        title={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        {fav ? '⭐' : '☆'}
      </button>
    </div>
  );
}
