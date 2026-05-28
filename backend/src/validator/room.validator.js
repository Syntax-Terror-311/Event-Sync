import { BadRequestException } from '../errors/BadRequestException.js';
import { validateIdParam } from './common.validator.js';

export const validateCreateRoom = (req, res, next) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return next(new BadRequestException('Room name is required'));
  }
  req.body.name = name.trim();
  next();
};

export const validateUpdateRoom = (req, res, next) => {
  const { name } = req.body;
  if (name !== undefined) {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return next(new BadRequestException('Room name cannot be empty'));
    }
    req.body.name = name.trim();
  }
  next();
};

export { validateIdParam };