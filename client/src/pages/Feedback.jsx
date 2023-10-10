import React, { useState } from "react";
import pic from "../assets/KSI.png";

export default function Feedback() {
  const [rating, setRating] = useState(1); // Set default rating to 1
  const [improvement, setImprovement] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate fields
    if (rating === null || improvement === "") {
      alert("Please fill out both the rating and feedback fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          improvement,
        }),
      });

      if (!response.ok) {
        console.error("Error submitting feedback:", await response.text());
        alert("Failed to submit feedback. Please try again later.");
      } else {
        const responseData = await response.json();
        console.log("Feedback submitted successfully:", responseData);
        alert("Feedback submitted successfully!");
        // Reset fields to default values
        setRating(1);
        setImprovement("");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center bg-cute p-4 h-screen ">
        <div className="bg-cute pl-9">
          <img
            src={pic}
            className="w-max object-cover ml-36 mb-10"
            alt="FeedbackPic"
          />
        </div>

        <div className="card card-compact w-4/12 h-4/12 bg-base-100 shadow-2xl mr-24 mb-10">
          <div className="card-body ">
            <br></br>
            <h2 className="card-title font-semibold text-black text-2xl italic">
              Rate Your Experience!!!
            </h2>
            <br></br>
            <h4 className="text-xl font-semibold text-black">
              How happy are you with our meal?
            </h4>
            <div className="rating rating-lg">
              {[1, 2, 3, 4, 5].map((value) => (
                <input
                  key={value}
                  type="radio"
                  name="rating"
                  value={value}
                  checked={rating === value}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="mask mask-star-2 bg-orange-400 "
                />
              ))}
            </div>
            <br></br>
            <h4 className="text-xl font-semibold text-black">
              How could we improve?
            </h4>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-s"
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
            />
            <br></br>
            <div className="card-actions justify-end pb-10">
              <button
                type="submit"
                className="btn bg-black pl-9 w-full max-w-s font-semibold text-white text-xl"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
