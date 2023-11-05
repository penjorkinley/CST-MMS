import mongoose from "mongoose";

const { Schema, model } = mongoose;

const inventoryItemSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  inventoryName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  singlePrice: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
});

// Middleware to calculate subtotal before saving the document
inventoryItemSchema.pre("save", function (next) {
  this.subtotal = this.quantity * this.singlePrice;
  next();
});

export const Essentials = model("Essentials", inventoryItemSchema);
export const Vessels = model("Vessels", inventoryItemSchema);
