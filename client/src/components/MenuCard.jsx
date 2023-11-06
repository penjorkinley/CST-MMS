function MealCard({ meal, time, one, two, three, four }) {
  return (
    <div className="bg-white rounded-lg shadow-md font-bold p-4 m-4 opacity-100 h-[280px] w-[250px] border-[1.5px] border-black flex justify-center flex-col">
      <h2 className="text-2xl font-bold mb-1">{meal}</h2>
      <h6 className="text-lg font-medium">{time}</h6>
      <br />
      <hr className="bg-black border border-black"></hr>
      <li>{one}</li>
      <li>{two}</li>
      <li>{three}</li>
    </div>
  );
}

export default MealCard;
