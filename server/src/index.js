import express from "express";
import cors from "cors";
import moongoose from "mongoose";
import { usersRouter } from "./router/users.js";
import { feedbackRouter } from "./router/feedback.js";
import { addUserRouter } from "./router/addUsers.js";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

//Routes
app.use("/auth", usersRouter);
app.use("/feedback", feedbackRouter);
app.use("/admin", addUserRouter);

moongoose.connect(
  "mongodb+srv://CST-MMS:CST-MMS2023@cst-mss.wlq5y1g.mongodb.net/CST-MMS?retryWrites=true&w=majority"
);

const db = moongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(port, () => {
  console.log("Server is running on port 3001");
});
