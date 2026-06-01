import express from 'express';
import cors from 'cors';
import db from './config/db.js';

import eventRoutes from './routes/event.route.js';
import sessionRoutes from './routes/session.route.js';
import speakerRoutes from './routes/speaker.route.js';
import questionRoutes from './routes/question.route.js';
import roomRoutes from './routes/room.route.js';
import authRoutes from './routes/auth.route.js';
import { handleError } from './middleware/error.middleware.js';
import { checkEnvVariables, PORT } from '../lib/config.js';

checkEnvVariables();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/hello', (req, res) => res.json({ message: 'Hello from EventSync API' }));

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/sessions', sessionRoutes);
app.use('/speakers', speakerRoutes);
app.use('/questions', questionRoutes);
app.use('/rooms', roomRoutes);

app.use(handleError);

process.on('SIGINT', async () => {
  await db.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
