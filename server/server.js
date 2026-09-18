require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { connectDB } = require('./config/db');

const recipeRoutes = require('./routes/recipeRoutes');
const shoppingRoutes = require('./routes/shoppingRoutes');
const aiRoutes = require('./routes/aiRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

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

let server;

// Graceful Shutdown Function
const gracefulShutdown = async (signal) => {
  console.log(`\n🛑 Received ${signal}. Shutting down RecipeFlow server...`);

  if (server) {
    server.close(async () => {
      console.log('📡 HTTP Server closed.');
      
      try {
        if (mongoose.connection.readyState !== 0) {
          await mongoose.connection.close();
          console.log('💾 MongoDB Connection closed.');
        }
      } catch (err) {
        console.error('Error closing MongoDB connection:', err.message);
      }
      
      console.log('✅ Server stopped cleanly. Port 5000 released.');
      process.exit(0);
    });

    // Force shutdown if not closed within 5 seconds
    setTimeout(() => {
      console.error('⚠️ Forcefully shutting down server after timeout.');
      process.exit(1);
    }, 5000);
  } else {
    process.exit(0);
  }
};

// Listen for termination signals & process errors
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ [Server] Unhandled Promise Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('⚠️ [Server] Uncaught Exception:', err.message || err);
});

// Start Server & Connect Database
const startServer = async () => {
  await connectDB();
  server = app.listen(PORT, () => {
    console.log(`🚀 RecipeFlow Backend Server running on port ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is currently in use. Please wait a moment or free the port.`);
    } else {
      console.error('❌ Server Listen Error:', err.message);
    }
  });
};

startServer();
