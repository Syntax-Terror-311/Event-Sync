import Link from 'next/link';
import { api, formatDate } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const events = await api.getEvents().catch(() => []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tous les événements</h1>
      {events.length === 0 ? (
        <p className="text-gray-500 text-center py-16">Aucun événement disponible.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event) => {
            const now = new Date();
            const isActive =
              now >= new Date(event.start_date) && now <= new Date(event.end_date);
            return (
              <Link key={event.id} href={`/events/${event.id}`} className="card block">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-bold text-xl text-gray-900">{event.title}</h2>
                  {isActive && <span className="badge-live">🔴 En cours</span>}
                </div>
                <p className="text-sm text-gray-500 mb-1">📍 {event.location}</p>
                <p className="text-sm text-gray-500 mb-3">
                  🗓 {formatDate(event.start_date)}
                </p>
                <p className="text-gray-600 text-sm line-clamp-3">{event.description}</p>
                <span className="text-indigo-600 text-sm font-medium mt-4 inline-block">
                  Voir le planning →
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
