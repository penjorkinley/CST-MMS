import { useNavigate } from "react-router-dom";
import land from "../assets/Menu-Background.png";
import logo from "../assets/Logo.PNG";

function LandingPage() {
  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate("/signin");
  };

  return (
    <div className="relative h-screen bg-cute">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={land}
          className="h-screen bg-center bg-cover"
          alt="image please sho"
        />
      </div>
      <div className="z-10 flex justify-between items-center h-50 bg-transparent w-full pr-8">
        <img src={logo} alt="logo" className="h-32 w-34" />
        <button
          onClick={navigateToSignup}
          className="bg-btn h-11 w-40 rounded-md text-white font-semibold"
        >
          Get Meal
        </button>
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-white h-96 w-3/5 rounded-3xl">
            <div className="flex items-center justify-center font-extrabold text-black text-4xl">
              <p className="mt-4">Today's Menu</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
