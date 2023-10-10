function FeedbackCard({ dets }) {
  return (
    <div className="mb-4 p-4">
      <p className="text-center mb-4">{dets}</p>
      <div className="rating flex justify-center mt-2 mb-4">
        <input
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-orange-400"
        />
        <input
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-orange-400"
          checked
        />
        <input
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-orange-400"
        />
        <input
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-orange-400"
          checked
        />
        <input
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-orange-400"
        />
      </div>
      <hr className="mt-4 border-gray-300" />
    </div>
  );
}

export default FeedbackCard;
