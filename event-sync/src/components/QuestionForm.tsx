'use client';

import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

type QuestionFormProps = {
  sessionId: number;
};

export default function QuestionForm({ sessionId }: QuestionFormProps) {
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/sessions/${sessionId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.trim(),
          author_name: authorName.trim() || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de l\'envoi de la question');
      }

      toast.success('Question envoyée !');
      setContent('');
      setAuthorName('');
      // In a real app, you'd refresh the questions list here
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <div className="form-group">
        <label htmlFor="content">
          Votre question *
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Posez votre question ici..."
            required
            rows={3}
            disabled={isSubmitting}
          />
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="authorName">
          Votre nom (optionnel)
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Anonyme si vide"
            disabled={isSubmitting}
          />
        </label>
      </div>

      <button type="submit" disabled={isSubmitting || !content.trim()}>
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer la question'}
      </button>
    </form>
  );
}