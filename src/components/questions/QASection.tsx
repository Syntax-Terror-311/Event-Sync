'use client';
import { useState, useEffect } from 'react';
import { api, Question } from '@/lib/api';

interface Props {
  sessionId: number;
  isLive: boolean;
  initialQuestions: Question[];
}

export default function QASection({ sessionId, isLive, initialQuestions }: Props) {
  const [questions, setQuestions] = useState<Question[]>(
    [...initialQuestions].sort((a, b) => b.upvotes - a.upvotes)
  );
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [upvoted, setUpvoted] = useState<Set<number>>(new Set());

  // Refresh questions every 15s when live
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(async () => {
      const fresh = await api.getQuestions(String(sessionId)).catch(() => null);
      if (fresh) setQuestions([...fresh].sort((a, b) => b.upvotes - a.upvotes));
    }, 15000);
    return () => clearInterval(interval);
  }, [isLive, sessionId]);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setError('');
    try {
      const q = await api.postQuestion({
        session_id: sessionId,
        content: content.trim(),
        author_name: authorName.trim() || undefined,
      });
      setQuestions((prev) => [q, ...prev]);
      setContent('');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (qId: number) => {
    if (upvoted.has(qId)) return;
    try {
      const updated = await api.upvoteQuestion(qId);
      setUpvoted((prev) => new Set([...prev, qId]));
      setQuestions((prev) =>
        prev.map((q) => (q.id === qId ? updated : q)).sort((a, b) => b.upvotes - a.upvotes)
      );
    } catch {}
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        💬 Questions ({questions.length})
      </h2>

      {!isLive ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-700 text-sm mb-4">
          Les questions sont disponibles uniquement pendant la session live.
        </div>
      ) : (
        <div className="card mb-6 bg-indigo-50 border-indigo-200">
          <h3 className="font-semibold text-gray-700 mb-3">Poser une question</h3>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-2"
            rows={3}
            placeholder="Votre question..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-3"
            placeholder="Votre nom (optionnel — anonyme si vide)"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            onClick={handleSubmit}
            disabled={loading || !content.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Envoi...' : 'Envoyer la question'}
          </button>
        </div>
      )}

      <div className="space-y-3">
        {questions.map((q) => (
          <div key={q.id} className="card flex gap-3 items-start">
            <div className="flex-1">
              <p className="text-gray-800 text-sm">{q.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                {q.author_name || 'Anonyme'} · {new Date(q.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <button
              onClick={() => handleUpvote(q.id)}
              disabled={upvoted.has(q.id)}
              className={`flex flex-col items-center text-sm font-bold px-2 py-1 rounded-lg transition-colors ${
                upvoted.has(q.id)
                  ? 'text-indigo-600 bg-indigo-100'
                  : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <span>▲</span>
              <span>{q.upvotes}</span>
            </button>
          </div>
        ))}
        {questions.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-8">Aucune question pour l'instant.</p>
        )}
      </div>
    </div>
  );
}
