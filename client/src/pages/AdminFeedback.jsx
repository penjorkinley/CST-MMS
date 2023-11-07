import { useEffect, useState } from "react";
import { FeedbackCard } from "../components/FeedbackCard";
import { MdFeedback } from "react-icons/md";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/feedback/viewfeedback"
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
    <div>
      <div className="flex items-center space-x-2 mb-5">
        <MdFeedback className="text-4xl" />
        <h1 className="text-4xl font-bold">Feedbacks</h1>
      </div>
      <div className="card card-compact w-auto h-[590px] bg-base-100 shadow-2xl ml-auto mr-20 p-6 overflow-scroll">
        {feedbacks.length ? (
          feedbacks.map((feedback) => (
            <FeedbackCard
              key={feedback._id}
              dets={feedback.improvement}
              rating={feedback.rating}
            />
          ))
        ) : (
          <p className="text-center mt-4">No feedback available</p>
        )}
      </div>
    </div>
  );
}
