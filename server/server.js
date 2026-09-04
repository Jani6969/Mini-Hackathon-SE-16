import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import priceRoutes from './routes/priceRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ success: true, message: 'Fish Price API running' }));
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});
app.use('/api/prices', priceRoutes);
app.use((req, res) => res.status(404).json({ success: false, message: 'Endpoint not found' }));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`API on ${PORT}`));
  })
  .catch(error => console.error('DB connection failed:', error.message));
