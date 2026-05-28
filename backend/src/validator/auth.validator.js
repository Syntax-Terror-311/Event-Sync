import { BadRequestException } from '../errors/BadRequestException.js';

export const validateSignup = (req, res, next) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return next(new BadRequestException('Email, name, and password are required'));
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestException('Email and password are required'));
  }
  next();
};
