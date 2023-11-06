import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.PNG";
import { HiOutlineLogout } from "react-icons/hi";
import LogoutModal from "./LogoutModal.jsx";
import CustomModal from "./Modal.jsx";

export default function RegularNav() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isBlurry, setIsBlurry] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsBlurry(true);
    setIsLogoutModalOpen(true);
  };
  const handleOrderClick = () => {
    if (!isLoggedIn) {
      setModalMessage("Please login or sign up first!");
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("login");
      }, 1500);
    } else {
      navigate("/order");
    }
  };
  const handleFeedbackClick = () => {
    if (!isLoggedIn) {
      setModalMessage("Please login or sign up first!");
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("login");
      }, 1500);
    } else {
      navigate("/feedback");
    }
  };

  useEffect(() => {
    const handleLoginChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("loginChange", handleLoginChange);

    // Initial check
    handleLoginChange();

    return () => {
      window.removeEventListener("loginChange", handleLoginChange);
    };
  }, []);

  return (
    <div className={`bg-cute pl-3 py-4 border-b-4 h-[120px] sticky top-0 z-50`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-[100px] border-none " />
        </div>

        <ul className="flex space-x-4 font-semibold text-black text-2xl mr-7 ">
          {!isLoggedIn && (
            <li>
              <Link to="/" className="text-black hover:text-buttons">
                Menu
              </Link>
            </li>
          )}

          <li>
            <button
              onClick={handleOrderClick}
              className="text-black hover:text-buttons font-semibold text-2xl"
            >
              Order
            </button>
          </li>
          <li>
            <button
              onClick={handleFeedbackClick}
              className="text-black hover:text-buttons font-semibold text-2xl"
            >
              Feedback
            </button>
          </li>
          <li>
            <Link to="/aboutus" className="text-black hover:text-buttons">
              About
            </Link>
          </li>

          {!isLoggedIn && (
            <>
              <li>
                <Link
                  to="/signin"
                  className=" text-white hover:bg-white text-lg hover:text-black hover:border-buttons hover:border-2 transition-all duration-500 px-5 py-2 rounded-lg bg-buttons border-2"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:bg-white text-lg hover:text-black hover:border-buttons hover:border-2 transition-all duration-500 px-5 py-2 rounded-lg bg-black border-2"
                >
                  Login
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center mt-[-7px]"
              >
                <HiOutlineLogout
                  size={50}
                  className="text-buttons  hover:text-black "
                />
              </button>
            </li>
          )}
        </ul>
      </div>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onCancel={() => {
          setIsBlurry(false);
          setIsLogoutModalOpen(false);
        }}
        onConfirm={() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          navigate("/");
          window.dispatchEvent(new Event("loginChange"));
          setIsLogoutModalOpen(false);
        }}
      />

      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
}
