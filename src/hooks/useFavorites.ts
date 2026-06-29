'use client';
import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('eventsync_favorites');
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggle = (sessionId: number) => {
    setFavorites((prev) => {
      const next = prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId];
      localStorage.setItem('eventsync_favorites', JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (sessionId: number) => favorites.includes(sessionId);

  return { favorites, toggle, isFavorite };
}
