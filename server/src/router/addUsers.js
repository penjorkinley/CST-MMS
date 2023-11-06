import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/UsersModel.js";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

const addUserRouter = express.Router();


// Admin Route to Add User
addUserRouter.post("/adduser",  async (req, res) => {
  try {
    const { username, studentId, phoneNumber, email, role, password } =
      req.body;

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
      role: role,
    });

    await newUser.save();
    res.status(201).json({ message: "User added successfully." });
  } catch (err) {
    console.error("Error adding user:", err);
    if (err.name === "MongoError" && err.code === 11000) {
      res.status(400).json({ error: "Duplicate field. User addition failed." });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
});

export { addUserRouter };
