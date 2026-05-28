import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import { UnauthorizedException } from '../errors/UnauthorizedException.js';

export const registerUser = async (email, name, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);  
  return db.user.create({
    data: { email, name, password: hashedPassword, role: 'organizer' },
    select: { id: true, email: true, name: true }
  });
};

export const loginUser = async (email, password) => {
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedException('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
};

export const getUserById = (id) => db.user.findUnique({
  where: { id },
  select: { id: true, email: true, name: true, role: true }
});