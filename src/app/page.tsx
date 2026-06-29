import Link from 'next/link';
import { api } from '@/lib/api';
import { FaCalendarAlt } from "react-icons/fa";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const events = await api.getEvents().catch(() => []);

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          EventSync
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Suivez vos événements en temps réel, interagissez avec les sessions et posez vos questions.
        </p>
        <Link href="/events" className="btn-primary inline-block mt-6">
          Voir les événements →
        </Link>
      </div>

      {events.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Événements récents</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 6).map((event) => (
              <Link key={event.id} href={`/events/${event.id}`} className="card block">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-2">📍 {event.location}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                <p className="text-xs text-indigo-600 mt-3 font-medium">
                  {new Date(event.start_date).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
