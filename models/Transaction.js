import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  itemId: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
