import { api, formatTime, isLive } from '@/lib/api';
import Link from 'next/link';
import QASection from '@/components/questions/QASection';
import { FaCalendarAlt } from "react-icons/fa";

export const dynamic = 'force-dynamic';

export default async function SessionPage({ params }: { params: { id: string } }) {
  const session = await api.getSession(params.id).catch(() => null);
  if (!session) return <div className="text-center py-16 text-gray-500">Session introuvable.</div>;

  const live = isLive(session);

  return (
    <div className="max-w-3xl mx-auto">
      <Link href={`/events/${session.event_id}`} className="text-sm text-indigo-600 hover:underline mb-4 inline-block">
        ← Retour à l'événement
      </Link>

      <div className="card mb-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h1 className="text-2xl font-bold text-gray-900">{session.title}</h1>
          {live && <span className="badge-live shrink-0">🔴 Live</span>}
        </div>

        <div className="flex gap-4 text-sm text-gray-500 mb-4 flex-wrap">
          <span>🕐 {formatTime(session.start_time)} – {formatTime(session.end_time)}</span>
          {session.room_name && <span>🏛 {session.room_name}</span>}
          {session.capacity ? <span>👥 Capacité : {session.capacity}</span> : null}
        </div>

        {session.description && (
          <p className="text-gray-600 mb-4">{session.description}</p>
        )}

        {session.speakers && session.speakers.length > 0 && (
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">Intervenants</h2>
            <div className="flex gap-3 flex-wrap">
              {session.speakers.map((sp) => (
                <Link
                  key={sp.id}
                  href={`/speakers/${sp.id}`}
                  className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 hover:bg-indigo-50 transition-colors"
                >
                  {sp.photo_url ? (
                    <img src={sp.photo_url} alt={sp.full_name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 text-sm font-bold">
                      {sp.full_name[0]}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">{sp.full_name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Q&A - only when live */}
      <QASection sessionId={session.id} isLive={live} initialQuestions={session.questions || []} />
    </div>
  );
}
