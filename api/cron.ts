import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import { UserModel } from '../src/models/user.model'; // Adjust the import path as necessary

const MONGODB_URI = process.env.MONGODB_URI; // Your MongoDB URI

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) return; // Already connected
  await mongoose.connect(MONGODB_URI as string);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectToDatabase();
  
  try {
    console.log("Cron job executed at:", new Date().toISOString());

    // Update all users' creditsleft to be equal to their monthlycredits
    const result = await UserModel.updateMany(
      {},
      [{ $set: { creditsleft: { $toDouble: "$monthlycredits" } } }]
    );

    console.log(`Matched ${result.matchedCount} documents and modified ${result.modifiedCount} documents`);

    res.status(200).json({ message: 'Cron job executed successfully' });
  } catch (error) {
    console.error('Error executing cron job:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
