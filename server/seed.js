import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Price from './models/Price.js';

dotenv.config();

const seedData = [
  {
    fish: 'Balaya (Skipjack)',
    market: 'Negombo Main',
    price: 950,
    seller: 'Nimal',
    date: '2026-09-04'
  },
  {
    fish: 'Kelawalla (Yellowfin)',
    market: 'Negombo Main',
    price: 1850,
    seller: 'Sunil',
    date: '2026-09-04'
  },
  {
    fish: 'Hurulla',
    market: 'Duwa Landing',
    price: 620,
    seller: 'Ranjith',
    date: '2026-09-04'
  },
  {
    fish: 'Thalapath (Seer)',
    market: 'Pitipana',
    price: 2900,
    seller: 'Ajith',
    date: '2026-09-04'
  },
  {
    fish: 'Isso (Prawns)',
    market: 'Negombo Main',
    price: 2400,
    seller: 'Kamal',
    date: '2026-09-04'
  },
  {
    fish: 'Balaya (Skipjack)',
    market: 'Pitipana',
    price: 880,
    seller: 'Sarath',
    date: '2026-09-04'
  },
  {
    fish: 'Paraw (Trevally)',
    market: 'Duwa Landing',
    price: 1350,
    seller: 'Nuwan',
    date: '2026-09-04'
  },
  {
    fish: 'Koduwa (Barramundi)',
    market: 'Negombo Main',
    price: 1600,
    seller: 'Prasad',
    date: '2026-09-04'
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI / MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for seeding');

    await Price.deleteMany({});
    await Price.insertMany(seedData);
    console.log('Seeded 8 records');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
