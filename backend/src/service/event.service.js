import db from '../config/db.js';

const eventInclude = {
  sessions: {
    include: {
      room: true,
      speakers: true,
      questions: { orderBy: { upvotes: 'desc' } }
    }
  }
};

export const fetchEvents = () => db.event.findMany({ include: eventInclude });

export const fetchEventById = (id) => db.event.findUnique({
  where: { id },
  include: eventInclude
});

export const createNewEvent = (data) => db.event.create({ data });

export const updateExistingEvent = (id, data) => db.event.update({ where: { id }, data });

export const deleteExistingEvent = (id) => db.event.delete({ where: { id } });