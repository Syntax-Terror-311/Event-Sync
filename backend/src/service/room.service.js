import db from '../config/db.js';

export const fetchRooms = () => db.room.findMany({
  orderBy: { name: 'asc' }
});

export const fetchRoomById = (id) => db.room.findUnique({
  where: { id }
});

export const createNewRoom = (data) => db.room.create({
  data: { name: data.name }
});

export const updateExistingRoom = (id, data) => db.room.update({
  where: { id },
  data
});

export const deleteExistingRoom = (id) => db.room.delete({
  where: { id }
});

export const fetchRoomSessions = (roomId) => db.session.findMany({
  where: { room_id: roomId },
  include: {
    event: true,
    speakers: true,
    questions: true
  },
  orderBy: { start_time: 'asc' }
});
