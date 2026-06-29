'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCalendarAlt } from "react-icons/fa";

export default function Navbar() {
  const path = usePathname();
  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      path.startsWith(href) ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <span className="text-2xl"><FaCalendarAlt /></span>
          EventSync
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/events" className={linkClass('/events')}>Événements</Link>
          <Link href="/favorites" className={linkClass('/favorites')}>⭐ Favoris</Link>
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-700 border border-gray-300 px-3 py-1.5 rounded-lg"
          >
            Admin →
          </a>
        </div>
      </div>
    </nav>
  );
}
