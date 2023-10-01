import React from "react";

function FeedbackCard({ dets }) {
  return (
    <div className="card card-compact w-96 h-20 bg-base-100 shadow-2xl mr-2 p-4 ">
      <p>{dets}</p>
      <div className="rating ml-auto">
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star-2 bg-orange-400"
        />
      </div>
    </div>
  );
}

export default FeedbackCard;
