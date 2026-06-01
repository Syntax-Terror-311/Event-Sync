import express from 'express';
import { getRooms, getRoomById, createRoom, updateRoom, deleteRoom, getSessionsByRoom } from '../controller/room.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware.js';
import { validateIdParam, validateCreateRoom, validateUpdateRoom } from '../validator/room.validator.js';

const router = express.Router();

router.get('/', getRooms);
router.post('/', authenticateToken, requireAdmin, validateCreateRoom, createRoom);
router.get('/:id', validateIdParam, getRoomById);
router.put('/:id', authenticateToken, requireAdmin, validateIdParam, validateUpdateRoom, updateRoom);
router.delete('/:id', authenticateToken, requireAdmin, validateIdParam, deleteRoom);
router.get('/:id/sessions', validateIdParam, getSessionsByRoom);

export default router;
