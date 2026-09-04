import express from 'express';
import mongoose from 'mongoose';
import Price from '../models/Price.js';

const router = express.Router();

// GET /api/prices - Get all prices (with optional search and market filters)
router.get('/', async (req, res) => {
  try {
    const { search, market } = req.query;
    const query = {};

    if (search && search.trim() !== '') {
      query.fish = {
        $regex: search.trim(),
        $options: 'i'
      };
    }

    if (market && market !== 'All') {
      query.market = market.trim();
    }

    const prices = await Price.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'OK',
      data: prices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

// GET /api/prices/:id - Get single price record by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID'
      });
    }

    const price = await Price.findById(id);

    if (!price) {
      return res.status(404).json({
        success: false,
        message: 'Record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'OK',
      data: price
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

// POST /api/prices - Create a new price record
router.post('/', async (req, res) => {
  try {
    const newPrice = await Price.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Price recorded successfully',
      data: newPrice
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

// DELETE /api/prices/:id - Delete a price record by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID'
      });
    }

    const deletedPrice = await Price.findByIdAndDelete(id);

    if (!deletedPrice) {
      return res.status(404).json({
        success: false,
        message: 'Record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

export default router;
