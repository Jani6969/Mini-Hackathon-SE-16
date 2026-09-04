import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import priceRoutes from './routes/priceRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory or root directory
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

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

const ATLAS_URI = 'mongodb+srv://janithchamika20030411_db_user:Janith123@cluster0.u9ling9.mongodb.net/fish-price-board?retryWrites=true&w=majority';
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || ATLAS_URI;

// Start server only after successful MongoDB connection
mongoose.connect(mongoUri)
  .then(() => {
    const isAtlas = mongoUri.includes('mongodb.net');
    console.log(`MongoDB connected (${isAtlas ? 'MongoDB Atlas' : 'Local MongoDB'})`);

    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err.message);
  });
