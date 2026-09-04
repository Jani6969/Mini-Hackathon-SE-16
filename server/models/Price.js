import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
  fish: {
    type: String,
    required: [true, 'Fish type is required'],
    trim: true
  },

  market: {
    type: String,
    required: [true, 'Landing site is required'],
    trim: true
  },

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

  date: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10)
  }
}, {
  timestamps: true
});

export default mongoose.model('Price', priceSchema);
