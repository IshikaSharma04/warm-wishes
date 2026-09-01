import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
  createdAt: { type: String, required: true },
  timestamp: { type: String, required: true }
});

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  message: { type: String, required: true },
  createdAt: { type: String, required: true },
  timestamp: { type: String, required: true }
});

export const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
export const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);
