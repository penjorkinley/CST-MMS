import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/Users.js";

const router = express.Router();

// register user route
router.post("/register", async (req, res) => {
  const { username, studentId, phoneNumber, email, password } = req.body;

  // Check if the username already exists
  const existingUser = await UserModel.findOne({ username: username });
  if (existingUser) {
    res.status(400).json({ error: "Username already exists" });
    return;
  }

  // Check if the email already exists
  const existingEmail = await UserModel.findOne({ email: email });
  if (existingEmail) {
    res.status(400).json({ error: "Email already exists" });
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user with the provided fields
  const newUser = new UserModel({
    username: username,
    studentId: studentId,
    phoneNumber: phoneNumber,
    email: email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    // Handle any database or validation errors here
    res.status(500).json({ error: "Internal server error" });
  }
});


// login user route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });

  if (!user) {
    res.status(400).json({ error: "Username or Password is incorrect" });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(400).json({ error: "Username or Password is incorrect" });
    return;
  }

  // Check if the user is an admin
  const isAdmin = user.username === 'CSTMMS'; 

  // Generate a token
  const token = jwt.sign({ id: user._id, isAdmin }, "secret");

  // Determine the redirect URL based on the user's role
  const redirectURL = isAdmin ? '/admin-dashboard' : '/user-dashboard';

  // Send a success message with a specific message based on the user's role
  const successMessage = isAdmin
    ? "Successfully logged in as admin"
    : "Successfully logged in as user";

  // Include the success message, token, and redirect URL in the response JSON
  res.json({ message: successMessage, token, redirectURL });
});


export { router as usersRouter };
