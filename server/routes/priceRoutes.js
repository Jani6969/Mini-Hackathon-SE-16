import express from 'express';
import Price from '../models/Price.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const prices = await Price.find().sort({ createdAt: -1 });
    res.json({ success: true, message: 'OK', data: prices });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const created = await Price.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Price recorded successfully',
      data: created
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(item => item.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
