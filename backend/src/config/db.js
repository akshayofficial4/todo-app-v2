import mongoose, { mongo } from 'mongoose';
import { env } from '../config/env.js';

export const connectDB = async () => {
    try {

        await mongoose.connect(env.mongoUri);
        console.log("MongoDB connected");

    }catch(error) {
        console.error("mongoDB fetching failed", error.message);
    }
}