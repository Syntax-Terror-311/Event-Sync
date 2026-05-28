import express from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controller/event.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware.js';
import { validateCreateEvent, validateUpdateEvent, validateIdParam } from '../validator/event.validator.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', validateIdParam, getEventById);
router.post('/', authenticateToken, requireAdmin, validateCreateEvent, createEvent);
router.put('/:id', authenticateToken, requireAdmin, validateIdParam, validateUpdateEvent, updateEvent);
router.delete('/:id', authenticateToken, requireAdmin, validateIdParam, deleteEvent);

export default router;