import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  breakfast: {
    type: [String],
    required: true,
  },
  lunch: {
    type: [String],
    required: true,
  },
  dinner: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const MenuModel = mongoose.model("Menu", MenuSchema);
