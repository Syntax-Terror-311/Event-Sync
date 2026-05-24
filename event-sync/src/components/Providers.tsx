'use client';

import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { FavoritesProvider } from '@/context/FavoritesContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <FavoritesProvider>
        {children}
        <Toaster position="top-right" />
      </FavoritesProvider>
    </AuthProvider>
  );
}
