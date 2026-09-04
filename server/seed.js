import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Price, { REPORT_LIFETIME_MS } from './models/Price.js';

dotenv.config();

// Demo-only Edit PIN. Every seeded record shares it so a marker can try Edit and
// Delete during the demo. Real user submissions choose their own PIN.
const SEED_EDIT_PIN = '1234';

const data = [
  { fish: 'Balaya (Skipjack)', market: 'Negombo Main', price: 950, seller: 'Nimal', date: '2026-09-04' },
  { fish: 'Kelawalla (Yellowfin)', market: 'Negombo Main', price: 1850, seller: 'Sunil', date: '2026-09-04' },
  { fish: 'Hurulla', market: 'Duwa Landing', price: 620, seller: 'Ranjith', date: '2026-09-04' },
  { fish: 'Thalapath (Seer)', market: 'Pitipana', price: 2900, seller: 'Ajith', date: '2026-09-04' },
  { fish: 'Isso (Prawns)', market: 'Negombo Main', price: 2400, seller: 'Kamal', date: '2026-09-04' },
  { fish: 'Balaya (Skipjack)', market: 'Pitipana', price: 880, seller: 'Sarath', date: '2026-09-04' },
  { fish: 'Paraw (Trevally)', market: 'Duwa Landing', price: 1350, seller: 'Nuwan', date: '2026-09-04' },
  { fish: 'Koduwa (Barramundi)', market: 'Negombo Main', price: 1600, seller: 'Prasad', date: '2026-09-04' }
];

await mongoose.connect(process.env.MONGO_URI);

// Make sure the TTL index exists even on a collection created before it was added.
await Price.syncIndexes();

const editPinHash = await bcrypt.hash(SEED_EDIT_PIN, 10);
const expiresAt = new Date(Date.now() + REPORT_LIFETIME_MS);

await Price.deleteMany({});
await Price.insertMany(data.map(record => ({ ...record, editPinHash, expiresAt })));

console.log('Seeded', data.length, 'records (demo Edit PIN: ' + SEED_EDIT_PIN + ')');
await mongoose.disconnect();
