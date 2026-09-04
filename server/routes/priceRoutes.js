import express from 'express';
import Price from '../models/Price.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search, market } = req.query;
    const query = {};
    if (search) query.fish = { $regex: search, $options: 'i' };
    if (market && market !== 'All') query.market = market;
    const prices = await Price.find(query).sort({ createdAt: -1 });
    res.json({ success: true, message: 'OK', data: prices });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const price = await Price.findById(req.params.id);
    if (!price) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, message: 'OK', data: price });
  } catch {
    res.status(400).json({ success: false, message: 'Invalid ID' });
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
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Price.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, message: 'Deleted successfully' });
  } catch {
    res.status(400).json({ success: false, message: 'Invalid ID' });
  }
});

export default router;
