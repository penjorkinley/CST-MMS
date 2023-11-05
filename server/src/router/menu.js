import express from "express";
import { MenuModel } from "../model/MenuModel.js";

const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set to start of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Find today's menu using the date
    const menu = await MenuModel.findOne({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found for today." });
    }

    res.json(menu);
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { breakfast, lunch, dinner } = req.body;
  if (!breakfast || !lunch || !dinner) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Delete all existing menus before inserting the new one
    await MenuModel.deleteMany({});

    // Insert the new menu data
    const newMenu = new MenuModel({
      date: new Date(), // This will always set to the current date when the new menu is created
      breakfast,
      lunch,
      dinner,
    });

    // Save the new menu
    const menu = await newMenu.save();

    // Decide which fields to send back
    const { __v, ...result } = menu.toObject();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error replacing menu:", error);
    res.status(500).json({ message: error.message });
  }
});

export { router as menuRouter };
