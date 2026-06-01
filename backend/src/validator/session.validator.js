import { BadRequestException } from '../errors/BadRequestException.js';
import { validateIdParam } from './common.validator.js';

const parseDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const validateCreateSession = (req, res, next) => {
  const { title, start_time, end_time, event_id, room_id, speaker_ids } = req.body;
  if (!title || !start_time || !end_time || !event_id || !room_id) {
    return next(new BadRequestException('Title, start_time, end_time, event_id, and room_id are required'));
  }

  const start = parseDate(start_time);
  const end = parseDate(end_time);
  if (!start || !end) {
    return next(new BadRequestException('Invalid date format for start_time or end_time'));
  }
  if (start >= end) {
    return next(new BadRequestException('start_time must be before end_time'));
  }

  if (!Array.isArray(speaker_ids) || speaker_ids.length === 0) {
    return next(new BadRequestException('speaker_ids must be a non-empty array of speaker IDs'));
  }

  req.body.start_time = start;
  req.body.end_time = end;
  next();
};

export const validateUpdateSession = (req, res, next) => {
  const { start_time, end_time, speaker_ids } = req.body;

  if (start_time) {
    const start = parseDate(start_time);
    if (!start) return next(new BadRequestException('Invalid start_time format'));
    req.body.start_time = start;
  }

  if (end_time) {
    const end = parseDate(end_time);
    if (!end) return next(new BadRequestException('Invalid end_time format'));
    req.body.end_time = end;
  }

  if (req.body.start_time && req.body.end_time && req.body.start_time >= req.body.end_time) {
    return next(new BadRequestException('start_time must be before end_time'));
  }

  if (speaker_ids && !Array.isArray(speaker_ids)) {
    return next(new BadRequestException('speaker_ids must be an array of speaker IDs'));
  }

  next();
};

export const validateCreateQuestion = (req, res, next) => {
  const { content } = req.body;
  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    return next(new BadRequestException('Question content is required'));
  }
  req.body.content = content.trim();
  next();
};

export { validateIdParam };
