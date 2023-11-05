import mongoose from "mongoose";

// Define a schema for your order count
const CountSchema = new mongoose.Schema({
  count: Number,
});

// Create and export the OrderCount model
export const OrderCount = mongoose.model("OrderCount", CountSchema);

