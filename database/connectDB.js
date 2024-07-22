import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database is connected Successfully!!');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};