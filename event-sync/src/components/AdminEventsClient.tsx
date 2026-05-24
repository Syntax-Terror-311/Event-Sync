'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

type EventProps = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
};

export default function AdminEventsClient({ initialEvents }: { initialEvents: EventProps[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getAuthHeader = (): Record<string, string> => {
    if (typeof window === 'undefined') return {};
    const token = localStorage.getItem('event-sync-token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const createEvent = async () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    };

    const response = await fetch('/api/events', {
      method: 'POST',
      headers,
      body: JSON.stringify({ title, description, location, start_date: startDate, end_date: endDate }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.error || 'Impossible de créer l’événement');
    }

    return result;
  };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const created = await createEvent();
      toast.success('Événement créé');
      setEvents((current) => [...current, created]);
      setTitle('');
      setDescription('');
      setLocation('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur');
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!window.confirm('Supprimer cet événement ?')) return;

    const response = await fetch(`/api/events/${eventId}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      toast.error(result?.error || 'Impossible de supprimer');
      return;
    }

    toast.success('Événement supprimé');
    setEvents((current) => current.filter((item) => item.id !== eventId));
  };

  return (
    <div>
      <form className="event-form" onSubmit={handleCreate}>
        <label>
          Titre
          <input value={title} onChange={(event) => setTitle(event.target.value)} required />
        </label>
        <label>
          Description
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} required />
        </label>
        <label>
          Lieu
          <input value={location} onChange={(event) => setLocation(event.target.value)} required />
        </label>
        <label>
          Date de début
          <input type="datetime-local" value={startDate} onChange={(event) => setStartDate(event.target.value)} required />
        </label>
        <label>
          Date de fin
          <input type="datetime-local" value={endDate} onChange={(event) => setEndDate(event.target.value)} required />
        </label>
        <button type="submit">Créer l’événement</button>
      </form>

      <div className="event-list">
        <div className="event-list-header">
          <span>Titre</span>
          <span>Lieu</span>
          <span>Début</span>
          <span>Fin</span>
          <span>Actions</span>
        </div>
        {events.map((item) => (
          <div className="event-item" key={item.id}>
            <span>{item.title}</span>
            <span>{item.location}</span>
            <span>{new Date(item.start_date).toLocaleString()}</span>
            <span>{new Date(item.end_date).toLocaleString()}</span>
            <button type="button" className="danger-button" onClick={() => handleDelete(item.id)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
