import React, { useState } from "react";
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
      <div className="w-1/2 flex justify-center items-center bg-ABB7BA ">
        <div className="rounded-lg ">
          <h2 className="text-5xl font-bold mb-10 text-center">Sign In</h2>

          {/* Input Fields */}
          <div className="mb-4 relative">
            <UserIcon className="absolute w-6 h-6 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              className="pl-10 w-full px-3 py-2 placeholder-gray-300 border rounded-md bg-white"
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
              className="pl-10 w-full px-3 py-2 placeholder-gray-300 border rounded-md bg-white"
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
              className="pl-10 w-full px-3 py-2 placeholder-gray-300 border rounded-md bg-white"
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
              className="pl-10 w-full px-3 py-2 placeholder-gray-300 border rounded-md bg-white"
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
              className="pl-10 w-full px-3 py-2 placeholder-gray-300 border rounded-md bg-white"
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
            className="w-full p-2 bg-61BDD5 text-black rounded-md"
          >
            Sign Up
          </button>
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
