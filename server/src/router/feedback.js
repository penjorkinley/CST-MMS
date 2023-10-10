import express from "express";
import { FeedbackModel } from "../model/FeedbackModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { rating, improvement } = req.body;
    if (rating && (rating < 1 || rating > 5)) {
      res.status(400).send({ error: "Rating must be between 1 and 5" });
      return;
    }

    const feedback = new FeedbackModel({
      rating,
      improvement,
    });

    await feedback.save();
    res
      .status(201)
      .send({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error("Error during feedback submission:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

export { router as feedbackRouter };
