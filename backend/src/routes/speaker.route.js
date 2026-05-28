import express from 'express';
import { getSpeakers, getSpeakerById, createSpeaker, updateSpeaker, deleteSpeaker } from '../controller/speaker.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware.js';
import { validateIdParam, validateCreateSpeaker, validateUpdateSpeaker } from '../validator/speaker.validator.js';

const router = express.Router();

router.get('/', getSpeakers);
router.post('/', authenticateToken, requireAdmin, validateCreateSpeaker, createSpeaker);
router.get('/:id', validateIdParam, getSpeakerById);
router.put('/:id', authenticateToken, requireAdmin, validateIdParam, validateUpdateSpeaker, updateSpeaker);
router.delete('/:id', authenticateToken, requireAdmin, validateIdParam, deleteSpeaker);

export default router;