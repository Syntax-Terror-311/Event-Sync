import { BadRequestException } from '../errors/BadRequestException.js';

export const validateIdParam = (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return next(new BadRequestException('Invalid id parameter'));
  }
  req.params.id = id;
  next();
};
