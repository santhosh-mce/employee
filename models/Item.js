import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.model('Item', itemSchema);
export default Item;
