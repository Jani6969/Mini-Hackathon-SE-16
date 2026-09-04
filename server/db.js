import mongoose from 'mongoose';

const states = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting'
};

export function getDbStatus() {
  const readyState = mongoose.connection.readyState;
  return {
    readyState,
    status: states[readyState] || 'unknown',
    host: mongoose.connection.host || null,
    name: mongoose.connection.name || null
  };
}

export async function connectDB(uri = process.env.MONGO_URI) {
  if (!uri) {
    throw new Error(
      'MONGO_URI is missing. Copy server/.env.example to server/.env and paste your MongoDB Atlas connection string.'
    );
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000
  });

  const { host, name } = getDbStatus();
  console.log(`MongoDB connected → ${host} / ${name}`);
  return mongoose.connection;
}

export function disconnectDB() {
  return mongoose.disconnect();
}
