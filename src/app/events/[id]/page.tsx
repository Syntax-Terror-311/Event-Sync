import Link from 'next/link';
import { api, formatDate, formatTime, isLive, Session } from '@/lib/api';
import SessionCard from '@/components/sessions/SessionCard';

export const dynamic = 'force-dynamic';

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await api.getEvent(params.id).catch(() => null);
  if (!event) return <div className="text-center py-16 text-gray-500">Événement introuvable.</div>;

  // Group sessions by room for multi-track view
  const byRoom: Record<string, Session[]> = {};
  for (const session of event.sessions) {
    const key = session.room_name || 'Sans salle';
    if (!byRoom[key]) byRoom[key] = [];
    byRoom[key].push(session);
  }

  const liveSessions = event.sessions.filter(isLive);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
          {liveSessions.length > 0 && (
            <span className="badge-live">🔴 {liveSessions.length} live</span>
          )}
        </div>
        <p className="text-gray-500">📍 {event.location} &nbsp;·&nbsp; 🗓 {formatDate(event.start_date)}</p>
        <p className="text-gray-600 mt-3">{event.description}</p>
      </div>

      {/* Live sessions highlight */}
      {liveSessions.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-red-600 mb-4">🔴 Sessions en cours</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {liveSessions.map((s) => (
              <SessionCard key={s.id} session={s} />
            ))}
          </div>
        </section>
      )}

      {/* Rooms nav */}
      {event.rooms.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {event.rooms.map((room) => (
            <Link
              key={room.id}
              href={`/events/${event.id}/rooms/${room.id}`}
              className="btn-outline text-sm"
            >
              🏛 {room.name}
            </Link>
          ))}
        </div>
      )}

      {/* Multi-track grid */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Planning complet</h2>
        {Object.entries(byRoom).map(([roomName, sessions]) => (
          <div key={roomName} className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wider">
              🏛 {roomName}
            </h3>
            <div className="space-y-3">
              {sessions.map((s) => (
                <SessionCard key={s.id} session={s} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
