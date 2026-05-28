import { BadRequestException } from '../errors/BadRequestException.js';
import { validateIdParam } from './common.validator.js';

export const validateCreateSpeaker = (req, res, next) => {
  const { name, bio, photo_url, social_links, website } = req.body;
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return next(new BadRequestException('Speaker name is required'));
  }
  req.body.name = name.trim();
  if (bio && typeof bio !== 'string') {
    return next(new BadRequestException('Speaker bio must be text'));
  }
  req.body.bio = bio ? bio.trim() : undefined;
  next();
};

export const validateUpdateSpeaker = (req, res, next) => {
  const { name, bio, photo_url, social_links, website } = req.body;
  if (name !== undefined) {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return next(new BadRequestException('Speaker name cannot be empty'));
    }
    req.body.name = name.trim();
  }
  if (bio !== undefined && typeof bio !== 'string') {
    return next(new BadRequestException('Speaker bio must be text'));
  }
  next();
};

export { validateIdParam };