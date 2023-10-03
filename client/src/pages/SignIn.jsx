import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpImg from "../assets/SignUp.png";
import { FcGoogle } from "react-icons/fc";
import {
  UserIcon,
  IdentificationIcon,
  PhoneIcon,
  MailIcon,
  LockClosedIcon,
} from "@heroicons/react/solid";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    studentID: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {
      name: formData.name ? "" : "Name is required.",
      studentID: formData.studentID ? "" : "Student ID is required.",
      phoneNumber: formData.phoneNumber ? "" : "Phone Number is required.",
      email: formData.email ? "" : "Email is required.",
      password: formData.password ? "" : "Password is required.",
    };
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost:3001/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.name,
            studentId: formData.studentID,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();
        if (response.status === 201) {
          alert("Successfully registered!");
          navigate("/order"); // Redirect to /order page
        } else {
          if (data.error.includes("username")) {
            alert("Username already exists.");
          } else if (data.error.includes("email")) {
            alert("Email already exists.");
          } else if (data.error.includes("phoneNumber")) {
            alert("Phone number already exists.");
          } else {
            alert(data.error || "Registration failed for an unknown reason.");
          }
        }
      } catch (error) {
        alert(
          "Failed to register. Please check your connection and try again."
        );
        console.error("Failed to register:", error);
      }
    }
  };

  return (
    <div className="flex h-[79vh]">
      <div className="w-2/5 flex justify-center items-center bg-card">
        <div className="rounded-lg w-3/5">
          <h2 className="text-6xl font-bold mb-10 text-center text-white">
            Sign Up
          </h2>
          {[
            { icon: UserIcon, placeholder: "Name", key: "name" },
            {
              icon: IdentificationIcon,
              placeholder: "Student ID",
              key: "studentID",
            },
            {
              icon: PhoneIcon,
              placeholder: "Phone Number",
              key: "phoneNumber",
            },
            { icon: MailIcon, placeholder: "Email", key: "email" },
            {
              icon: LockClosedIcon,
              placeholder: "Password",
              key: "password",
              type: "password",
            },
          ].map(({ icon: Icon, placeholder, key, type = "text" }) => (
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
              {errors[key] && (
                <div className="text-red-500 text-sm">{errors[key]}</div>
              )}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="w-full p-2 bg-buttons text-white text-xl font-bold rounded-2xl mb-2 mt-5 transition duration-300 ease-in-out hover:scale-105"
          >
            Sign Up
          </button>
          <hr className="border-white mb-2" />
          <button className="w-full p-2 bg-blackText text-white text-xl font-bold flex justify-center items-center rounded-2xl mb-2 transition duration-300 ease-in-out hover:scale-105">
            <FcGoogle className="mr-2" /> Continue with Google
          </button>
          <div className="text-white">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white underline ml-1"
              style={{ fontWeight: "bold" }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="w-3/5 flex justify-center items-center relative bg-cute border-l-4">
        <img
          src={SignUpImg}
          alt="Sign Up Illustration"
          className="w-3/5 h-auto object-cover mx-auto my-auto"
        />
      </div>
    </div>
  );
}

export default SignIn;
