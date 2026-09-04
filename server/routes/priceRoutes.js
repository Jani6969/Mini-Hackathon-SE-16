import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Price from '../models/Price.js';

const router = express.Router();

const PIN_PATTERN = /^\d{4}$/;
const BCRYPT_ROUNDS = 10;

/** Only these four fields may ever be written by a client. */
const EDITABLE_FIELDS = ['fish', 'market', 'price', 'seller'];

/**
 * Turns a Mongoose ValidationError into one friendly 400 message and lets
 * anything else fall through to a generic 500.
 */
function sendWriteError(res, error) {
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(item => item.message);
    return res.status(400).json({ success: false, message: messages.join(', ') });
  }
  return res.status(500).json({ success: false, message: 'Server error' });
}

/**
 * Loads the report named by :id together with its normally-hidden PIN hash and
 * checks the supplied PIN against it. Returns the document on success, or null
 * after having already sent the correct error response.
 */
async function findVerifiedReport(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ success: false, message: 'That price report id is not valid.' });
    return null;
  }

  const editPin = typeof req.body?.editPin === 'string' ? req.body.editPin : '';
  if (!editPin) {
    res.status(400).json({ success: false, message: 'Please enter the 4-digit Edit PIN.' });
    return null;
  }
  if (!PIN_PATTERN.test(editPin)) {
    res.status(400).json({ success: false, message: 'Edit PIN must contain exactly 4 digits.' });
    return null;
  }

  const report = await Price.findById(id).select('+editPinHash');
  if (!report) {
    res.status(404).json({ success: false, message: 'Price report not found.' });
    return null;
  }

  // Records created before edit PINs existed have no hash and can never be
  // unlocked. Say so plainly instead of returning a confusing "wrong PIN".
  if (!report.editPinHash) {
    res.status(403).json({
      success: false,
      message: 'This report was created before Edit PINs and can no longer be changed.'
    });
    return null;
  }

  const pinMatches = await bcrypt.compare(editPin, report.editPinHash);
  if (!pinMatches) {
    res.status(403).json({ success: false, message: 'Incorrect edit PIN.' });
    return null;
  }

  return report;
}

/** Strips the PIN hash before a document is handed back to the client. */
function toSafeReport(report) {
  const plain = report.toObject();
  delete plain.editPinHash;
  return plain;
}

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
    const { editPin, ...entry } = req.body ?? {};

    if (typeof editPin !== 'string' || editPin.length === 0) {
      return res.status(400).json({ success: false, message: 'Please create a 4-digit Edit PIN.' });
    }
    if (!PIN_PATTERN.test(editPin)) {
      return res.status(400).json({ success: false, message: 'Edit PIN must contain exactly 4 digits.' });
    }

    // Build the document field by field so a client cannot smuggle in
    // editPinHash, expiresAt or timestamps through the request body.
    const created = await Price.create({
      fish: entry.fish,
      market: entry.market,
      price: entry.price,
      seller: entry.seller,
      editPinHash: await bcrypt.hash(editPin, BCRYPT_ROUNDS)
    });

    res.status(201).json({
      success: true,
      message: 'Price recorded successfully',
      data: toSafeReport(created)
    });
  } catch (error) {
    sendWriteError(res, error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const report = await findVerifiedReport(req, res);
    if (!report) return;

    // expiresAt is deliberately untouched: a report edited at 4pm still dies
    // 24 hours after it was created, not 24 hours after the edit.
    for (const field of EDITABLE_FIELDS) {
      if (req.body[field] !== undefined) report[field] = req.body[field];
    }
    await report.save();

    res.json({
      success: true,
      message: 'Price report updated successfully.',
      data: toSafeReport(report)
    });
  } catch (error) {
    sendWriteError(res, error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const report = await findVerifiedReport(req, res);
    if (!report) return;

    await report.deleteOne();
    res.json({ success: true, message: 'Price report deleted successfully.' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
