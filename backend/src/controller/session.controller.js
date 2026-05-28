import { fetchSessions, fetchSessionById, createNewSession, updateExistingSession, deleteExistingSession, fetchLiveSessions } from '../service/session.service.js';
import { createQuestion } from '../service/question.service.js';
import { sendSuccess } from '../middleware/error.middleware.js';
import { NotFoundException } from '../errors/NotFoundException.js';
import { BadRequestException } from '../errors/BadRequestException.js';

export const getSessions = async (req, res, next) => {
  try {
    const filters = {
      roomId: req.query.roomId ? Number(req.query.roomId) : undefined,
      eventId: req.query.eventId ? Number(req.query.eventId) : undefined,
      live: req.query.live === 'true'
    };
    const sessions = await fetchSessions(filters);
    sendSuccess(res, sessions);
  } catch (error) {
    next(error);
  }
};

export const getLiveSessions = async (req, res, next) => {
  try {
    const sessions = await fetchLiveSessions();
    sendSuccess(res, sessions);
  } catch (error) {
    next(error);
  }
};

export const getSessionById = async (req, res, next) => {
  try {
    const session = await fetchSessionById(req.params.id);
    if (!session) throw new NotFoundException('Session not found');
    sendSuccess(res, session);
  } catch (error) {
    next(error);
  }
};

export const createSession = async (req, res, next) => {
  try {
    const session = await createNewSession(req.body);
    sendSuccess(res, session, 201);
  } catch (error) {
    next(error);
  }
};

export const updateSession = async (req, res, next) => {
  try {
    const session = await updateExistingSession(req.params.id, req.body);
    sendSuccess(res, session);
  } catch (error) {
    next(error);
  }
};

export const deleteSession = async (req, res, next) => {
  try {
    await deleteExistingSession(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const createQuestionForSession = async (req, res, next) => {
  const { content, author_name } = req.body;
  try {
    const session = await fetchSessionById(req.params.id);
    if (!session) throw new NotFoundException('Session not found');

    const now = new Date();
    if (now < session.start_time || now > session.end_time) {
      throw new BadRequestException('Session is not live');
    }

    const question = await createQuestion({
      session_id: req.params.id,
      content,
      author_name
    });
    sendSuccess(res, question, 201);
  } catch (error) {
    next(error);
  }
};