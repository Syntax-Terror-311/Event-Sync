import { api, formatTime, isLive } from '@/lib/api';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function RoomPage({
  params,
}: {
  params: { id: string; roomId: string };
}) {
  const sessions = await api.getRoomSessions(params.roomId).catch(() => []);

  return (
    <div>
      <Link href={`/events/${params.id}`} className="text-sm text-indigo-600 hover:underline mb-4 inline-block">
        ← Retour à l'événement
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Planning — {sessions[0]?.room_name || 'Salle'}
      </h1>
      <div className="space-y-3">
        {sessions.map((s) => {
          const live = isLive(s);
          return (
            <Link key={s.id} href={`/sessions/${s.id}`} className={`card block ${live ? 'border-red-300 bg-red-50' : ''}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-900">{s.title}</span>
                {live && <span className="badge-live">🔴 Live</span>}
              </div>
              <p className="text-sm text-gray-500">
                🕐 {formatTime(s.start_time)} – {formatTime(s.end_time)}
              </p>
              {s.speakers && s.speakers.length > 0 && (
                <p className="text-xs text-gray-400 mt-1">
                  {s.speakers.map((sp) => sp.full_name).join(', ')}
                </p>
              )}
            </Link>
          );
        })}
        {sessions.length === 0 && (
          <p className="text-gray-400 text-center py-12">Aucune session dans cette salle.</p>
        )}
      </div>
    </div>
  );
}
