import express from "express";
import { BillModel } from "../model/BillModel.js";

const router = express.Router();

// Endpoint to save a bill
router.post("/savebill", async (req, res) => {
  try {
    const newBill = new BillModel(req.body);
    const savedBill = await newBill.save();
    res.status(201).json({ success: true, bill: savedBill });
    console.log("Bill saved successfully");
  } catch (error) {
    console.error("Error saving bill: ", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to save the bill." });
  }
});

// Endpoint to delete a bill by ID
router.delete("/deletebill/:id", async (req, res) => {
  try {
    const bill = await BillModel.findByIdAndDelete(req.params.id);
    if (!bill) {
      return res
        .status(404)
        .json({ success: false, message: "Bill not found." });
    }
    res.json({ success: true, message: "Bill deleted successfully.", bill });
    console.log("Bill deleted successfully");
  } catch (error) {
    console.error("Error deleting bill: ", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete the bill." });
  }
});

// Endpoint to get a bill by ID
router.get("/getbill", async (req, res) => {
  try {
    const bills = await BillModel.find({}); // Find all documents in the BillModel collection
    res.json({ success: true, bills }); // Note 'bills' is plural, indicating all records
  } catch (error) {
    console.error("Error retrieving bills: ", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve bills." });
  }
});

export { router as billRouter };
