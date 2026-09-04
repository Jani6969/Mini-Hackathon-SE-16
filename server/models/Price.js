import mongoose from 'mongoose';

/** A report lives for 24 hours, then MongoDB's TTL monitor removes it. */
export const REPORT_LIFETIME_MS = 24 * 60 * 60 * 1000;

const priceSchema = new mongoose.Schema({
  fish: { type: String, required: [true, 'Fish type is required'], trim: true },
  market: { type: String, required: [true, 'Landing site is required'], trim: true },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [1, 'Price must be greater than 0'],
    max: [10000, 'Price looks too high for one kilo']
  },
  seller: {
    type: String,
    required: [true, 'Reporter name is required'],
    minlength: [3, 'Name must be at least 3 characters'],
    trim: true
  },
  date: { type: String, default: () => new Date().toISOString().slice(0, 10) },

  // bcrypt hash of the reporter's 4-digit edit PIN. The raw PIN is never stored.
  // select:false keeps it out of every query — and therefore every API response —
  // unless a route explicitly asks for it with .select('+editPinHash').
  editPinHash: {
    type: String,
    required: [true, 'Edit PIN is required'],
    select: false
  },

  // Set once, at creation. Editing a report must never push this forward.
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + REPORT_LIFETIME_MS)
  }
}, { timestamps: true });

// TTL index: MongoDB deletes the document once expiresAt is in the past.
// expireAfterSeconds: 0 means "expire exactly at the stored date". The background
// TTL monitor runs about once a minute, so deletion is close to, not exactly at,
// the timestamp.
priceSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Price', priceSchema);
