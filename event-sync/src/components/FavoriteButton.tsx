'use client';

import { useFavorites } from '@/context/FavoritesContext';

type FavoriteButtonProps = {
  sessionId: number;
  className?: string;
};

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? '#ef4444' : 'none'}
      stroke="#ef4444"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.8 4.6c-1.7-1.6-4.5-1.4-6.1.4L12 7.1l-2.7-2.1c-1.6-1.8-4.4-2-6.1-.4-1.9 1.8-1.9 4.8 0 6.6L12 21.3l8.8-10.1c1.9-1.8 1.9-4.8 0-6.6Z" />
    </svg>
  );
}

export default function FavoriteButton({ sessionId, className = '' }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(sessionId);

  const handleClick = () => {
    if (favorite) {
      removeFavorite(sessionId);
    } else {
      addFavorite(sessionId);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`favorite-button ${favorite ? 'active' : ''} ${className}`}
      title={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <HeartIcon filled={favorite} />
    </button>
  );
}