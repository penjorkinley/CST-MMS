export function FeedbackCard({ dets, rating }) {
  // This function will render stars based on the rating passed to the component
  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((value) => (
      <input
        key={value}
        type="radio"
        name={`rating-${dets}`} // Unique name for each feedback's rating group
        className="mask mask-star-2 bg-orange-400"
        checked={rating === value} // Check if the current star represents the rating
        readOnly // Makes the input read-only since this is just for display
      />
    ));
  };

  return (
    <div className="mb-4 p-4 w-[500px]">
      <p className="text-center mb-4">{dets}</p>
      <div className="rating flex justify-center mt-2 mb-4">
        {renderStars(rating)}
      </div>
      <hr className="mt-4 border-gray-300" />
    </div>
  );
}
