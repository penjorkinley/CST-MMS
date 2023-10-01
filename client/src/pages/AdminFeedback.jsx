import React from "react";
import FeedbackCard from "../components/FeedbackCard";

export default function Feedback() {
  return (
    <div className="flex justify-between items-center h-screen p-4 ">
      <div className="card card-compact w-auto h-fit bg-base-100 shadow-2xl ml-auto mr-20 mb-10">
        <div className="card-body flex justify-center items-center">
          <h1 className="text-black font-bold text-lg">Feedbacks</h1>
          <FeedbackCard
            dets={
              "The mess food is consistently delicious, and the variety of cuisines keeps mealtime exciting."
            }
          />
          <FeedbackCard
            dets={
              "The food quality is decent, but improvements in cleanliness would enhance the overall experience"
            }
          />
          <FeedbackCard
            dets={
              "The mess food is consistently delicious, and the variety of cuisines keeps mealtime exciting."
            }
          />
          <FeedbackCard
            dets={
              "The mess food is consistently delicious, and the variety of cuisines keeps mealtime exciting."
            }
          />
        </div>
      </div>
    </div>
  );
}
