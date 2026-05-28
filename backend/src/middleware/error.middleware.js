import pkg from '@prisma/client';
const { Prisma } = pkg;
import { HttpException } from '../errors/HttpException.js';

export const handlePrismaError = (error, res) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') return res.status(409).json({ error: 'Resource already exists' });
    if (error.code === 'P2025') return res.status(404).json({ error: 'Resource not found' });
  }
  res.status(500).json({ error: 'Database error' });
};

export const sendSuccess = (res, data, status = 200) => res.status(status).json(data);

export const sendError = (res, message, status = 500) => res.status(status).json({ error: message });

export const handleError = (error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }

  if (error instanceof HttpException) {
    return res.status(error.status).json({ error: error.message });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') return res.status(409).json({ error: 'Resource already exists' });
    if (error.code === 'P2025') return res.status(404).json({ error: 'Resource not found' });
  }

  console.error(error);
  const status = error.status || 500;
  return res.status(status).json({ error: error.message || 'Internal Server Error' });
};