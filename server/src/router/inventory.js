import express from "express";
import { Essentials } from "../model/InventoryModel.js";
import { Vessels } from "../model/InventoryModel.js";

const router = express.Router();

// Route to get all Essentials inventory items
router.get("/essentials", async (req, res) => {
  try {
    const items = await Essentials.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a new Essential inventory item
router.post("/essentials", async (req, res) => {
  const item = new Essentials({
    date: req.body.date,
    inventoryName: req.body.inventoryName,
    quantity: req.body.quantity,
    singlePrice: req.body.singlePrice,
    subtotal: req.body.quantity * req.body.singlePrice,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all Vessels inventory items
router.get("/vessels", async (req, res) => {
  try {
    const items = await Vessels.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a new Vessel inventory item
router.post("/vessels", async (req, res) => {
  const item = new Vessels({
    date: req.body.date,
    inventoryName: req.body.inventoryName,
    quantity: req.body.quantity,
    singlePrice: req.body.singlePrice,
    subtotal: req.body.quantity * req.body.singlePrice,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to update an inventory item
router.put("/inventory/:type/:id", async (req, res) => {
  const { type, id } = req.params;
  const Model = type === "essentials" ? Essentials : Vessels;

  try {
    const item = await Model.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.inventoryName = req.body.inventoryName;
    item.quantity = req.body.quantity;
    item.singlePrice = req.body.singlePrice;
    item.subtotal = req.body.quantity * req.body.singlePrice;

    await item.save();
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete an inventory item
router.delete("/inventory/:type/:id", async (req, res) => {
  const { type, id } = req.params;
  const Model = type === "essentials" ? Essentials : Vessels;

  try {
    const item = await Model.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    await item.remove();
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as inventoryRouter };
