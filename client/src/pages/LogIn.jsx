import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginImg from "../assets/Login.png";
import { FcGoogle } from "react-icons/fc";
import { MailIcon, LockClosedIcon } from "@heroicons/react/solid";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = formData.email ? "" : "Email is required.";
    tempErrors.password = formData.password ? "" : "Password is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await response.json();

        if (response.status === 200) {
          console.log(data.message);
          localStorage.setItem("token", data.token);
          alert("Successfully logged in!");
          console.log(data);
          navigate(data.redirectURL); // use redirectURL to navigate
        } else {
          console.error(data.error);
          alert("Failed to login: " + data.error);
        }
      } catch (error) {
        console.error("Failed to login:", error);
        alert("Failed to login: " + error.message);
      }
    }
  };

  return (
    <div className="flex h-[83vh]">
      <div className="w-3/5 flex justify-center items-center relative bg-cute border-r-4">
        <img
          className="w-4/6 h-auto object-cover mx-auto my-auto"
          src={LoginImg}
          alt="Login Illustration"
        />
      </div>

      <div className="w-2/5 flex justify-center items-center bg-card">
        <div className="rounded-lg w-3/5">
          <h2 className="text-6xl font-bold mb-10 text-center text-white">
            Login
          </h2>

          {[
            {
              icon: MailIcon,
              placeholder: "Email",
              key: "email",
              errorKey: "email",
            },
            {
              icon: LockClosedIcon,
              placeholder: "Password",
              key: "password",
              errorKey: "password",
              type: "password",
            },
          ].map(({ icon: Icon, placeholder, key, errorKey, type = "text" }) => (
            <div key={key} className="mb-4 relative">
              <Icon className="absolute w-6 h-6 left-3 top-1/2 transform -translate-y-1/2 text-customIconColor" />
              <input
                type={type}
                className="pl-10 w-full px-3 py-2 border rounded-xl bg-cute"
                placeholder={placeholder}
                value={formData[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
              />
              {errors[errorKey] && (
                <div className="text-red-500 text-sm">{errors[errorKey]}</div>
              )}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="w-full p-2 bg-buttons text-white text-xl font-bold rounded-2xl mb-2 mt-5 transition duration-300 ease-in-out hover:scale-105"
          >
            Login
          </button>

          <hr className="border-white mb-2" />

          <button className="w-full p-2 bg-blackText text-white text-xl font-bold flex justify-center items-center rounded-2xl mb-2 transition duration-300 ease-in-out hover:scale-105">
            <FcGoogle className="mr-2" /> Continue with Google
          </button>

          <div className="text-white">
            Don't have an account?
            <Link
              to="/signin"
              className="text-white underline ml-1 "
              style={{ fontWeight: "bold" }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
