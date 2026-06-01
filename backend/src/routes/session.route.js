import express from 'express';
import { getSessions, getSessionById, createSession, updateSession, deleteSession, getLiveSessions, createQuestionForSession } from '../controller/session.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware.js';
import { validateIdParam, validateCreateSession, validateUpdateSession, validateCreateQuestion } from '../validator/session.validator.js';

const router = express.Router();

router.get('/live', getLiveSessions);
router.get('/', getSessions);
router.post('/', authenticateToken, requireAdmin, validateCreateSession, createSession);
router.get('/:id', validateIdParam, getSessionById);
router.put('/:id', authenticateToken, requireAdmin, validateIdParam, validateUpdateSession, updateSession);
router.delete('/:id', authenticateToken, requireAdmin, validateIdParam, deleteSession);
router.post('/:id/questions', validateIdParam, validateCreateQuestion, createQuestionForSession);

export default router;