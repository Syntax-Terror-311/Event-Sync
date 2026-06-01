import { fetchRooms, fetchRoomById, createNewRoom, updateExistingRoom, deleteExistingRoom, fetchRoomSessions } from '../service/room.service.js';
import { sendSuccess } from '../middleware/error.middleware.js';
import { NotFoundException } from '../errors/NotFoundException.js';

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await fetchRooms();
    sendSuccess(res, rooms);
  } catch (error) {
    next(error);
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    const room = await fetchRoomById(req.params.id);
    if (!room) throw new NotFoundException('Room not found');
    sendSuccess(res, room);
  } catch (error) {
    next(error);
  }
};

export const createRoom = async (req, res, next) => {
  try {
    const room = await createNewRoom(req.body);
    sendSuccess(res, room, 201);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const room = await updateExistingRoom(req.params.id, req.body);
    sendSuccess(res, room);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    await deleteExistingRoom(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getSessionsByRoom = async (req, res, next) => {
  try {
    const sessions = await fetchRoomSessions(req.params.id);
    sendSuccess(res, sessions);
  } catch (error) {
    next(error);
  }
};