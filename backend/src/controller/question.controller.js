import db from '../config/db.js';
import { sendSuccess } from '../middleware/error.middleware.js';

export const upvoteQuestion = async (req, res, next) => {
  try {
    const question = await db.question.update({
      where: { id: req.params.id },
      data: { upvotes: { increment: 1 } }
    });
    sendSuccess(res, question);
  } catch (error) {
    next(error);
  }
};