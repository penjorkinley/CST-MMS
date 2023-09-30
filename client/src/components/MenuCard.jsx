function MealCard({ meal, time, one, two, three }) {
  return (
    <div className="bg-card rounded-lg shadow-md font-bold p-4 m-4 opacity-100 h-64 w-52 border-2 border-black flex justify-center flex-col">
      <h2 className="text-xl font-bold mb-1">{meal}</h2>
      <h6 className="text-xs font-medium">{time}</h6>
      <br />
      <hr className="bg-black border border-black"></hr>
      <p className="mt-2 text-white">{one}</p>
      <p className="mt-2 text-white">{two}</p>
      <p className="mt-2 text-white">{three}</p>
    </div>
  );
}

export default MealCard;