import { useNavigate, useLocation } from "react-router-dom";
import land from "../assets/Menu-Background.png";
import logo from "../assets/Logo.PNG";
import MealCard from "../components/MenuCard";
import aboutUs from "../assets/AboutUs.png";
import feedbackBackground from "../assets/KSI.png";
import ksi from "../assets/KSI.png";

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="relative h-[screen] bg-cute">
      <div className="z-10 flex justify-between items-center h-50 bg-transparent w-full pr-8">
        <img src={logo} alt="logo" className="h-32 w-34" />

        <div className="space-x-4 flex items-center">
          <button
            onClick={() => navigate("/signin")}
            className="text-white hover:bg-white text-lg hover:text-black hover:border-blackText hover:border-2 transition-all duration-500 px-5 py-2 rounded-lg bg-buttons border-2 z-20"
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate("/login")}
            className="text-white hover:bg-white text-lg hover:text-black hover:border-buttons hover:border-2 transition-all duration-500 px-5 py-2 rounded-lg bg-blackText border-2 z-20"
          >
            Login
          </button>
        </div>
      </div>
      <div className="carousel w-full h-[550px]">
        <div id="item1" className="carousel-item w-full">
          <img src={aboutUs} className="w-full" alt="About Us" />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img src={land} className="w-full" alt="Menu Background" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img
            src={feedbackBackground}
            className="w-full"
            alt="Feedback Background"
          />
        </div>
        <div id="item4" className="carousel-item w-full">
          <img src={ksi} className="w-full" alt="KSI" />
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          4
        </a>
      </div>

      <div className="flex items-center justify-center">
        <img
          src={land}
          className="h-screen mt-14 bg-center bg-cover"
          alt="background"
        />
        <div className="absolute flex justify-center items-center">
          <div className="bg-white rounded-3xl">
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
    </div>
  );
}

export default LandingPage;
