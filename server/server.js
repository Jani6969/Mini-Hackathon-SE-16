import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDbStatus } from './db.js';
import priceRoutes from './routes/priceRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Fish Price API running', db: getDbStatus() });
});

app.get('/api/health', (req, res) => {
  const db = getDbStatus();
  res.status(db.readyState === 1 ? 200 : 503).json({
    success: db.readyState === 1,
    message: db.readyState === 1 ? 'API and MongoDB are connected' : 'MongoDB is not connected',
    db
  });
});

app.use('/api/prices', priceRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`API on ${PORT}`));
  })
  .catch((err) => {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  });
