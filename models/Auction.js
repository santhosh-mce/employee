import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  auctionId: { type: String, required: true, unique: true },
  itemId: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  highestBid: { type: Number },
  winner: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Auction = mongoose.model('Auction', auctionSchema);
export default Auction;
