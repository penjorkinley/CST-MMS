import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/Logo.PNG";
import { FaSignOutAlt } from "react-icons/fa";

export default function RegularNav() {
  // Mock-up state to keep track of the user's login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="bg-cute p-4 border-b-4 h-[120px] sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-[100px] border-none " />
        </div>
        <ul className="flex space-x-4 font-semibold text-black text-2xl mr-7 ">
          <li>
            <Link to="/" className="text-black hover:text-blue-300">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/order" className="text-black hover:text-blue-300">
              Order
            </Link>
          </li>
          <li>
            <Link to="/feedback" className="text-black hover:text-blue-300">
              Feedback
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="text-black hover:text-blue-300">
              About
            </Link>
          </li>

          <>
            <li>
              <Link
                to="/signin"
                className="text-white hover:bg-white text-lg hover:text-black hover:border-blackText hover:border-2 transition-all duration-500 px-5 py-2 rounded-lg bg-buttons border-2"
              >
                Sign Up
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className="text-white hover:bg-white text-lg hover:text-black hover:border-buttons hover:border-2 transition-all duration-500 px-5 py-2 rounded-lg bg-blackText border-2"
              >
                Login
              </Link>
            </li>
          </>
        </ul>
      </div>
    </div>
  );
}
