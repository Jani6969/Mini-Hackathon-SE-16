import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import priceRoutes from './routes/priceRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health / root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Fish Price API running'
  });
});

// API Routes
app.use('/api/prices', priceRoutes);

// 404 handler for undefined endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('DB connection failed: MONGO_URI / MONGODB_URI is not defined in environment variables');
} else {
  // Start server only after successful MongoDB connection
  mongoose.connect(mongoUri)
    .then(() => {
      console.log('MongoDB connected');

      app.listen(PORT, () => {
        console.log(`API running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('DB connection failed:', err.message);
    });
}
