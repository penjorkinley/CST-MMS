import express from "express";
import cors from "cors";
import moongoose from "mongoose";
import { usersRouter } from "./routes/users.js";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use("/auth", usersRouter);

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
