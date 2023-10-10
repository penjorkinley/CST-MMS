import React from "react";

function FeedbackCard({ dets }) {
  return (
    <div className="card card-compact max-w-96 max-h-max bg-base-100 shadow-2xl mr-auto ml-auto p-9">
      <p>{dets}</p>
      <div className="rating ml-auto mt-2">
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
