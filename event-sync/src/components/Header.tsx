'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Favoris', href: '/favorites' },
  { label: 'Connexion', href: '/login' },
  { label: 'Inscription', href: '/signup' },
];

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="site-header">
      <div className="brand-block">
        <Link href="/" className="brand-link">
          <div className="brand-logo">ES</div>
          <div>
            <p className="brand-title">Event Sync</p>
            <p className="brand-subtitle">Gestion d’événements moderne</p>
          </div>
        </Link>
      </div>

      <nav className="site-nav">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={isActive(link.href) ? 'nav-link active' : 'nav-link'}
          >
            {link.label}
          </Link>
        ))}
        {isAuthenticated && (
          <Link href="/admin/events" className={isActive('/admin/events') ? 'nav-link active' : 'nav-link'}>
            Gestion événements
          </Link>
        )}
      </nav>

      <div className="header-actions">
        <span className={`status-pill ${isAuthenticated ? 'status-admin' : 'status-public'}`}>
          {isAuthenticated ? 'Mode admin' : 'Mode public'}
        </span>
        {isAuthenticated && (
          <button className="logout-button" type="button" onClick={logout}>
            Déconnexion
          </button>
        )}
      </div>
    </header>
  );
}
