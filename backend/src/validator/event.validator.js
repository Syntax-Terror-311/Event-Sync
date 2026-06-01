import { BadRequestException } from '../errors/BadRequestException.js';
import { validateIdParam } from './common.validator.js';

const parseDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const validateCreateEvent = (req, res, next) => {
  const { title, start_date, end_date } = req.body;
  if (!title || !start_date || !end_date) {
    return next(new BadRequestException('Title, start_date, and end_date are required'));
  }

  const start = parseDate(start_date);
  const end = parseDate(end_date);
  if (!start || !end) {
    return next(new BadRequestException('Invalid date format for start_date or end_date'));
  }
  if (start >= end) {
    return next(new BadRequestException('start_date must be before end_date'));
  }

  req.body.start_date = start;
  req.body.end_date = end;
  next();
};

export const validateUpdateEvent = (req, res, next) => {
  const { start_date, end_date } = req.body;

  if (start_date) {
    const start = parseDate(start_date);
    if (!start) return next(new BadRequestException('Invalid start_date format'));
    req.body.start_date = start;
  }

  if (end_date) {
    const end = parseDate(end_date);
    if (!end) return next(new BadRequestException('Invalid end_date format'));
    req.body.end_date = end;
  }

  if (req.body.start_date && req.body.end_date && req.body.start_date >= req.body.end_date) {
    return next(new BadRequestException('start_date must be before end_date'));
  }

  next();
};

export { validateIdParam };
