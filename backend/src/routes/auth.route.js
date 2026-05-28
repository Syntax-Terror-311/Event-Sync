import express from 'express';
import { signup, login, getMe } from '../controller/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { validateSignup, validateLogin } from '../validator/auth.validator.js';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.get('/me', authenticateToken, getMe);

export default router;