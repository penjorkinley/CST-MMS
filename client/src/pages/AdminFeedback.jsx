import { useEffect, useState } from "react";
import FeedbackCard from "../components/FeedbackCard";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/admin/viewfeedback"
        );
        if (!response.ok) {
          console.error("Failed to fetch feedback:", await response.text());
          return;
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, []);

  return (
    <div className="flex justify-between items-center h-screen p-4 ml-[170px]">
      <div className="card card-compact w-auto h-auto bg-base-100 shadow-2xl ml-auto mr-20 p-6">
        <h1 className="text-black font-bold text-lg mb-4 text-center">
          Feedbacks
        </h1>
        {feedbacks.length ? (
          feedbacks.map((feedback) => (
            <FeedbackCard key={feedback._id} dets={feedback.improvement} />
          ))
        ) : (
          <p className="text-center mt-4">No feedback available</p>
        )}
      </div>
    </div>
  );
}
