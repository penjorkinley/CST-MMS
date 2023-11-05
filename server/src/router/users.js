import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/UsersModel.js";
import { OrderCount } from "../model/orderCountModel.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

const router = express.Router();

//Registration
router.post("/register", async (req, res) => {
  try {
    const { username, studentId, phoneNumber, email, password } = req.body;

    const existingStudentId = await UserModel.findOne({ studentId: studentId });
    if (existingStudentId) {
      res.status(400).json({ error: "Student ID already exists." });
      return;
    }

    const existingEmail = await UserModel.findOne({ email: email });
    if (existingEmail) {
      res.status(400).json({ error: "Email already exists." });
      return;
    }

    const existingPhoneNumber = await UserModel.findOne({
      phoneNumber: phoneNumber,
    });
    if (existingPhoneNumber) {
      res.status(400).json({ error: "Phone number already exists." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username: username,
      studentId: studentId,
      phoneNumber: phoneNumber,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error("Error during registration:", err);
    if (err.name === "MongoError" && err.code === 11000) {
      res.status(400).json({ error: "Duplicate field. Registration failed." });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Original version expecting username
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    res.status(400).json({ error: "email or Password is incorrect" });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(400).json({ error: "email or Password is incorrect" });
    return;
  }

  // to check if the user is admin or not
  const isAdmin = user.role === "admin";
  const token = jwt.sign({ id: user._id, isAdmin }, JWT_SECRET);
  const redirectURL = isAdmin ? "/admin/dashboard" : "/order";
  const successMessage = isAdmin
    ? "Successfully logged in as admin"
    : "Successfully logged in as user";

  res.json({ message: successMessage, token, redirectURL });
});

router.post('/placeOrder', async (req, res) => {
  try {
    // Find the current order count
    const currentOrderCount = await OrderCount.findOne();
    if (!currentOrderCount) {
      // If the count does not exist, create and initialize it to 1
      const newOrderCount = new OrderCount({ count: 1 });
      await newOrderCount.save();
    } else {
      // Increment the order count by 1
      currentOrderCount.count += 1;
      await currentOrderCount.save();
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error placing the order:', error);
    res.status(500).json({ success: false, error: 'Error placing the order' });
  }
});

router.get('/placeOrder', async (req, res) => {
  try {
    // Find the current order count
    const currentOrderCount = await OrderCount.findOne();
    
    if (!currentOrderCount) {
      // If the count does not exist, return 0 or another default value
      return res.json({ count: 0 });
    }
    
    // Send the order count as a JSON response
    res.json({ count: currentOrderCount.count });
  } catch (error) {
    console.error('Error getting the order count:', error);
    res.status(500).json({ error: 'Error getting the order count' });
  }
})



export { router as usersRouter };
