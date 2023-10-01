import { Link } from "react-router-dom"; // <-- import useLocation
import { useState } from "react";
import logo from "../assets/Logo.PNG";
import { HiOutlineLogout } from "react-icons/hi";

export default function RegularNav() {
  return (
    <div className="bg-cute py-4 pl-3 border-b-4 h-[120px] sticky top-0 z-50 flex justify-between items-center">
      <div className="container  flex justify-between  items-center ">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-[100px] border-none " />
        </div>
      
        <ul className="flex justify-between items-center space-x-4 font-semibold text-black text-2xl">
          <li>
            <Link to="/" className="text-black hover:text-buttons">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/order" className="text-black hover:text-buttons">
              Order
            </Link>
          </li>
          <li>
            <Link to="/feedback" className="text-black hover:text-buttons">
              Feedback
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="text-black hover:text-buttons">
              About
            </Link>
          </li>

          
            {location.pathname !== "/signin" && ( // <-- Conditionally render the Sign Up button
              <li>
                <Link
                  to="/signin"
                  className=" text-white hover:bg-white text-lg hover:text-black hover:border-buttons hover:border-2 transition-all duration-500 px-5 py-2 rounded-lg bg-buttons border-2"
                >
                  Sign Up
                </Link>
              </li>
            )}
            {location.pathname == "/signin" && ( // <-- Conditionally render the Login button
              <li>
                <Link
                  to="/login"
                  className="text-white hover:bg-white text-lg hover:text-black hover:border-buttons hover:border-2 transition-all duration-500 px-5 py-2 rounded-lg bg-buttons border-2"
                >
                  Login
                </Link>
              </li>
            )}

            {location.pathname !== "/signin" &&
              location.pathname !== "/login" && (
                <li>
                  <Link
                    to="/"
                    className="flex items-center justify-center mt-[-7px]"
                  >
                    <HiOutlineLogout size={50} />
                  </Link>
                </li>
              )}
          
        </ul>
      </div>
    </div>
  );
}
