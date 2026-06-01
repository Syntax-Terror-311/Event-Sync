import { registerUser, loginUser, getUserById } from '../service/auth.service.js';
import { sendSuccess } from '../middleware/error.middleware.js';
import { NotFoundException } from '../errors/NotFoundException.js';

export const signup = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const user = await registerUser(email, name, password);
    sendSuccess(res, { message: 'User created', user }, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) throw new NotFoundException('User not found');
    sendSuccess(res, user);
  } catch (error) {
    next(error);
  }
};