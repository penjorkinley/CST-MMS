// BillSchema.js

import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  totalFund: {
    type: Number,
    required: true,
  },
  totalStudents: {
    type: Number,
    required: true,
  },
  expenditures: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const BillModel = mongoose.model("Bill", BillSchema);
