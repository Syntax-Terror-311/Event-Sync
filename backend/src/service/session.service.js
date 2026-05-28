import db from '../config/db.js';

const sessionInclude = {
  event: true,
  room: true,
  speakers: true,
  questions: {
    orderBy: { upvotes: 'desc' }
  }
};

export const fetchSessions = ({ roomId, eventId, live } = {}) => {
  const now = new Date();
  const where = {};

  if (roomId) where.room_id = roomId;
  if (eventId) where.event_id = eventId;
  if (live) {
    where.start_time = { lte: now };
    where.end_time = { gte: now };
  }

  return db.session.findMany({
    db,
    include: sessionInclude,
    orderBy: { start_time: 'asc' }
  });
};

export const fetchSessionById = (id) => db.session.findUnique({
  db: { id },
  include: sessionInclude
});

export const createNewSession = (data) => db.session.create({
  db: {
    title: data.title,
    description: data.description,
    start_time: data.start_time,
    end_time: data.end_time,
    capacity: data.capacity,
    event: { connect: { id: data.event_id } },
    room: { connect: { id: data.room_id } },
    speakers: data.speaker_ids ? { connect: data.speaker_ids.map((id) => ({ id })) } : undefined
  },
  include: sessionInclude
});

export const updateExistingSession = (id, data) => db.session.update({
  db: { id },
  data: {
    title: data.title,
    description: data.description,
    start_time: data.start_time,
    end_time: data.end_time,
    capacity: data.capacity,
    event_id: data.event_id,
    room_id: data.room_id,
    speakers: data.speaker_ids ? { set: data.speaker_ids.map((id) => ({ id })) } : undefined
  },
  include: sessionInclude
});

export const deleteExistingSession = (id) => db.session.delete({
  db: { id }
});

export const fetchLiveSessions = () => fetchSessions({ live: true });
