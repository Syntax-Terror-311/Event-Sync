import { api, formatTime, isLive } from '@/lib/api';
import Link from 'next/link';

export default async function SpeakerPage({ params }: { params: { id: string } }) {
  const speaker = await api.getSpeaker(params.id).catch(() => null);
  if (!speaker) return <div className="text-center py-16 text-gray-500">Intervenant introuvable.</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card mb-6 flex gap-6 items-start">
        {speaker.photo_url ? (
          <img src={speaker.photo_url} alt={speaker.full_name} className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 text-3xl font-bold border-4 border-indigo-100">
            {speaker.full_name[0]}
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{speaker.full_name}</h1>
          {speaker.bio && <p className="text-gray-600 text-sm mb-3">{speaker.bio}</p>}
          <div className="flex gap-3 flex-wrap">
            {speaker.twitter && (
              <a href={`https://twitter.com/${speaker.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-sky-600 hover:underline">
                🐦 {speaker.twitter}
              </a>
            )}
            {speaker.linkedin && (
              <a href={speaker.linkedin.startsWith('http') ? speaker.linkedin : `https://${speaker.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                💼 LinkedIn
              </a>
            )}
            {speaker.website && (
              <a href={speaker.website} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline">
                🌐 Site web
              </a>
            )}
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4">Sessions</h2>
      <div className="space-y-3">
        {(speaker.sessions || []).map((s) => {
          const live = isLive(s);
          return (
            <Link key={s.id} href={`/sessions/${s.id}`} className={`card block ${live ? 'border-red-300 bg-red-50' : ''}`}>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">{s.title}</span>
                {live && <span className="badge-live">🔴 Live</span>}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                🕐 {formatTime(s.start_time)} – {formatTime(s.end_time)}
                {s.room_name && ` · 🏛 ${s.room_name}`}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
