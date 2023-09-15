import express from "express";
import cors from "cors";
import moongoose from "mongoose";

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log("Server is running on port 3001");
});
