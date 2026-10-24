import mongoose from 'mongoose';

const connectDB = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error', err));
};

export default connectDB;
