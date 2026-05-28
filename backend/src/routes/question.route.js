import express from 'express';
import { upvoteQuestion } from '../controller/question.controller.js';
import { validateIdParam } from '../validator/question.validator.js';

const router = express.Router();

router.post('/:id/upvote', validateIdParam, upvoteQuestion);

export default router;