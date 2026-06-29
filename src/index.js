require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;

// CORS - allow both user frontend and admin frontend
const allowedOrigins = [
  process.env.CORS_ORIGIN_USER || 'http://localhost:3000',
  process.env.CORS_ORIGIN_ADMIN || 'http://localhost:3001',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// API routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Route introuvable' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

app.listen(PORT, () => {
  console.log(`EventSync API running on http://localhost:${PORT}`);
  console.log(`Routes disponibles:`);
  console.log(`POST /api/auth/login`);
  console.log(`GET  /api/events`);
  console.log(`GET  /api/speakers`);
  console.log(`POST /api/questions`);
});
