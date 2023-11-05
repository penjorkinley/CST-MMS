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

    // Attempt to find today's menu using the date
    let menu = await MenuModel.findOne({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    // If today's menu is not found, get the latest available menu
    if (!menu) {
      menu = await MenuModel.findOne().sort({ date: -1 }); // assuming 'date' is a field in your MenuModel
    }

    // If no menus are available, return an empty object or appropriate message
    if (!menu) {
      return res.json({});
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
