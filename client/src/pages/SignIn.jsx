import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.PNG";
import SignUpImg from "../assets/SignUp.png";
import {
  UserIcon,
  IdentificationIcon,
  PhoneIcon,
  MailIcon,
  LockClosedIcon,
} from "@heroicons/react/solid";

function SignIn({ changePage }) {
  const [formData, setFormData] = useState({
    name: "",
    studentID: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "Name is required.";
    tempErrors.studentID = formData.studentID ? "" : "Student ID is required.";
    tempErrors.phoneNumber = formData.phoneNumber
      ? ""
      : "Phone Number is required.";
    tempErrors.email = formData.email ? "" : "Email is required.";
    tempErrors.password = formData.password ? "" : "Password is required.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("All validations passed!");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex justify-center items-center bg-card">
        <div className="rounded-lg">
          <h2 className="text-6xl font-bold mb-10 text-center text-white">
            Sign Up
          </h2>

          {/* Input Fields */}
          <div className="mb-4 relative">
            <UserIcon className="absolute w-6 h-6 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              className="pl-10 w-full px-3 py-2  border rounded-md "
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && (
              <div className="text-red-500 text-sm">{errors.name}</div>
            )}
          </div>

          <div className="mb-4 relative">
            <IdentificationIcon className="absolute w-6 h-6 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              className="pl-10 w-full px-3 py-2 placeholder-gray-300 border rounded-md bg-F0F7F9"
              placeholder="Student ID"
              value={formData.studentID}
              onChange={(e) =>
                setFormData({ ...formData, studentID: e.target.value })
              }
            />
            {errors.studentID && (
              <div className="text-red-500 text-sm">{errors.studentID}</div>
            )}
          </div>

          <div className="mb-4 relative">
            <PhoneIcon className="absolute w-6 h-6 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              className="pl-10 w-full px-3 py-2 placeholder-gray-300 border rounded-md bg-F0F7F9"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
            {errors.phoneNumber && (
              <div className="text-red-500 text-sm">{errors.phoneNumber}</div>
            )}
          </div>

          <div className="mb-4 relative">
            <MailIcon className="absolute w-6 h-6 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              className="pl-10 w-full px-3 py-2 placeholder-gray-300 border rounded-md bg-F0F7F9"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>

          <div className="mb-4 relative">
            <LockClosedIcon className="absolute w-6 h-6 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              className="pl-10 w-full px-3 py-2 placeholder-gray-300 border rounded-md bg-F0F7F9"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full p-2 bg-61BDD5 text-white rounded-md"
          >
            Sign Up
          </button>

          <div className="bg-white h-1 w-full mt-2"></div>

          <button className="w-full p-2 bg-white text-61BDD5 mt-2 border border-gray-300 rounded-md">
            Continue with Google
          </button>

          <div className="text-center mt-4">
            Already have an account?
            <Link to="/login" className="text-61BDD5 underline ml-1">
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="w-1/2 relative bg-F0F7F9">
        <img
          src={Logo}
          alt="Logo"
          className="absolute top-5 right-5 w-30 h-20"
        />
        <img
          className="h-150 w-150 object-cover"
          src={SignUpImg}
          alt="Sign In Illustration"
        />
      </div>
    </div>
  );
}

export default SignIn;
