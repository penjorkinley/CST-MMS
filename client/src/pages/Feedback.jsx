import React, { useState } from "react";
import pic from "../assets/KSI.png";
import CustomModal from "../components/Modal";

export default function Feedback() {
  const [rating, setRating] = useState(1); // Set default rating to 1
  const [improvement, setImprovement] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
        setModalMessage("Failed to submit Feedback. Please try again later.");
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1500);
      } else {
        const responseData = await response.json();
        console.log("Feedback submitted successfully:", responseData);
        setModalMessage("Thank you for your feedback!");
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000);
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
      <div className="flex flex-col md:flex-row w-full items-center md:h-screen bg-cute ">
        <div className="bg-cute pl-9 mr-40">
          <img src={pic} className="w-max object-cover mb-4 md:ml-36" alt="FeedbackPic" />
        </div>

        <div className="card card-compact w-full md:w-3/5 bg-base-100 shadow-2xl p-4 md:mr-10 md:mb-10">
          <h2 className="card-title font-semibold text-black text-2xl italic">Rate Your Experience!!!</h2>

          <div className="mt-4">
            <h4 className="text-xl font-semibold text-black">How happy are you with our meal?</h4>
            <div className="rating rating-lg">
              {[1, 2, 3, 4, 5].map((value) => (
                <input
                  key={value}
                  type="radio"
                  name="rating"
                  value={value}
                  checked={rating === value}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="mask mask-star-2 bg-orange-400"
                />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-xl font-semibold text-black">How could we improve?</h4>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-s"
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
            />
          </div>

          <div className="card-actions justify-end mt-4">
            <button
              type="submit"
              className="btn bg-buttons w-full max-w-s font-semibold text-white text-xl hover:bg-black md:pl-9"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} message={modalMessage} />
    </form>
  );
}
