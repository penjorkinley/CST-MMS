import { useNavigate } from "react-router-dom";
import land from "../assets/Menu-Background.png";
import logo from "../assets/Logo.PNG";
import MealCard from "../components/MenuCard";

function LandingPage() {
  const navigate = useNavigate();

  const navigateToSignup = () => {
    console.log("I am working");
    navigate("/signin");
  };

  return (
    <div className="relative h-screen bg-cute">
      <div className="z-10 flex justify-between items-center h-50 bg-transparent w-full pr-8">
        <img src={logo} alt="logo" className="h-32 w-34" />

        <button
          onClick={navigateToSignup}
          type="submit"
          className="bg-btn hover:bg-blue-500 h-11 w-40 rounded-md text-white font-semibold"
        >
          Get Meal
        </button>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={land}
          className="h-screen mt-14 bg-center bg-cover"
          alt="image please sho"
        />
      </div>
      <div className="absolute inset-0 flex justify-center items-center ">
        <div className="bg-white h-96 w-3/5 rounded-3xl ">
          <p className="mt-4 font-extrabold text-black text-4xl flex items-center justify-center">
            Todays Menu
          </p>
          <div className="flex justify-between items-center">
            <MealCard
              meal={"Breakfast"}
              time={"7:00AM - 8:00AM"}
              one={"Fried Rice"}
              two={"Ezzay"}
              three={"Tea"}
            />
            <MealCard
              meal={"Lunch"}
              time={"11:30AM - 1:00PM"}
              one={"Rice"}
              two={"Kewa Datsi"}
              three={"Lentils Soup"}
            />
            <MealCard
              meal={"Dinner"}
              time={"7:00PM - 8:00PM"}
              one={"Rice"}
              two={"Chicken Chilli"}
              three={"Lentils Soup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
