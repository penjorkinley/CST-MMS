import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext
import land from "../assets/Menu-Background.png";
import logo from "../assets/Logo.PNG";
import MealCard from "../components/MenuCard";
import mess1 from "../assets/mess1.JPG";
import mess2 from "../assets/mess2.JPG";
import mess3 from "../assets/mess3.jpg";
import mess4 from "../assets/mess4.JPG";

function LandingPage() {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { isLoggedIn } = useContext(AuthContext); // Destructure isLoggedIn from context

  const [activeCarouselItem, setActiveCarouselItem] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCarouselItem((prevItem) =>
        prevItem === carouselItems.length ? 1 : prevItem + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const carouselItems = [
    { image: mess3, text: "Welcome To CST Mess System" },
    { image: mess1, text: "Check Out Our Daily Menu" },
    {
      image: mess2,
      text: "Provide Your Valuable Feedback",
    },
    { image: mess4, text: "Enjoy Your Meal" },
  ];

  const handleOrderClick = () => {
    if (!isLoggedIn) {
      alert("Please login or sign up first.");
      navigate("login");
    } else {
      navigate("/order");
    }
  };

  return (
    <div className="relative h-[screen] bg-cute">
      <div className="z-10 flex justify-between items-center h-50 bg-transparent w-full pr-8">
        <img src={logo} alt="logo" className="h-[110px] w-34" />
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

      <div className="carousel w-full h-[550px] overflow-hidden">
        <div
          className="carousel-inner flex transition-transform duration-500"
          style={{
            transform: `translateX(-${(activeCarouselItem - 1) * 100}%)`,
          }}
        >
          {carouselItems.map((item, index) => (
            <div key={index} className="carousel-item w-full relative">
              <img
                src={item.image}
                className="w-full"
                alt={`Carousel Item ${index + 1}`}
              />
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute inset-0 flex justify-center items-center flex-col">
                <span className="text-white text-5xl font-bold tracking-wider mb-4  px-4 py-1">
                  {item.text}
                </span>
                <button
                  onClick={() =>
                    menuRef.current.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-white hover:bg-black text-xl font-bold hover:text-white transition-all duration-500 px-5 py-3 rounded-lg bg-buttons "
                >
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveCarouselItem(index + 1)}
            className="btn btn-xs"
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <img
          src={land}
          className="h-screen mt-14 bg-center bg-cover"
          alt="background"
        />
        <div className="absolute flex justify-center items-center">
          <div
            className="rounded-3xl w-[1000px] p-8 shadow-2xl border-[1px] border-gray-300"
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(1px)",
            }}
            ref={menuRef}
          >
            <p className="mt-4 font-extrabold text-black text-4xl flex items-center justify-center mb-4">
              Todays Menu
            </p>
            <div className="flex justify-between items-center mb-6">
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

            <div className="flex justify-center">
              <button
                onClick={handleOrderClick} // Updated onClick handler
                className="text-white hover:bg-black text-lg font-bold hover:text-white  transition-all duration-500 px-6 py-3 rounded-lg bg-buttons "
              >
                Order Meal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
