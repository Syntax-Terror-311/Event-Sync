'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Question } from '@/types';

type QuestionListProps = {
  questions: Question[];
  live: boolean;
};

function UpvoteIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  );
}

export default function QuestionList({ questions: initialQuestions, live }: QuestionListProps) {
  const [questions, setQuestions] = useState(initialQuestions);

  const handleUpvote = async (questionId: number) => {
    try {
      const response = await fetch(`/api/questions/${questionId}/upvote`, {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors du vote');
      }

      const updatedQuestion = await response.json();
      setQuestions(prev =>
        prev.map(q => q.id === questionId ? updatedQuestion : q)
      );
      toast.success('Vote enregistré !');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur');
    }
  };

  const sortedQuestions = [...questions].sort((a, b) => b.upvotes - a.upvotes);

  if (questions.length === 0) {
    return (
      <div className="no-questions">
        <p>Aucune question pour le moment.</p>
        {live && <p>Soyez le premier à poser une question !</p>}
      </div>
    );
  }

  return (
    <div className="question-list">
      {sortedQuestions.map((question) => (
        <div key={question.id} className="question-item">
          <div className="question-content">
            <p>{question.content}</p>
            <div className="question-meta">
              <span className="question-author">
                {question.author_name || 'Anonyme'}
              </span>
              <span className="question-date">
                {new Date(question.created_at).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="question-actions">
            <button
              onClick={() => handleUpvote(question.id)}
              className="upvote-button"
              disabled={!live}
              aria-label="Vote pour la question"
            >
              <UpvoteIcon />
              <span>{question.upvotes}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}