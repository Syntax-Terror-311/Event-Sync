import db from '../config/db.js';

export const fetchQuestionsBySession = (sessionId) => db.question.findMany({
  where: { session_id: sessionId },
  orderBy: { upvotes: 'desc' }
});

export const createQuestion = (data) => db.question.create({
  data: {
    session_id: data.session_id,
    content: data.content,
    author_name: data.author_name
  }
});

export const upvoteQuestionById = (id) => db.question.update({
  where: { id },
  data: { upvotes: { increment: 1 } }
});
