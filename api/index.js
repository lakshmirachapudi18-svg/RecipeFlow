const path = require('path');

// Load environment variables (Vercel provides them, but dotenv is a fallback for local dev)
require('dotenv').config({ path: path.join(__dirname, '..', 'server', '.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { connectDB } = require('../server/config/db');

const recipeRoutes = require('../server/routes/recipeRoutes');
const shoppingRoutes = require('../server/routes/shoppingRoutes');
const aiRoutes = require('../server/routes/aiRoutes');
const { notFound, errorHandler } = require('../server/middleware/errorMiddleware');

const app = express();

// Security & Middleware
app.use(helmet({
  crossOriginResourcePolicy: false
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/shopping', shoppingRoutes);
app.use('/api/ai', aiRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB on cold start (cached across warm invocations)
let isDbConnected = false;

module.exports = async (req, res) => {
  if (!isDbConnected) {
    await connectDB();
    isDbConnected = true;
  }
  return app(req, res);
};
