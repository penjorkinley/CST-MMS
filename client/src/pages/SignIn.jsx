import React from "react";
import signInImg from "../assets/SignUp.png";

function SignIn({ changePage }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-1/2 bg-white p-5 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-10 text-center">Sign In</h2>
        <input
          className="mb-4 w-full px-3 py-2 placeholder-gray-300 border rounded-md"
          placeholder="Name"
        />
        <input
          className="mb-4 w-full px-3 py-2 placeholder-gray-300 border rounded-md"
          placeholder="Student ID"
        />
        <input
          className="mb-4 w-full px-3 py-2 placeholder-gray-300 border rounded-md"
          placeholder="Phone Number"
        />
        <input
          className="mb-4 w-full px-3 py-2 placeholder-gray-300 border rounded-md"
          placeholder="Email"
          type="email"
        />
        <input
          className="mb-4 w-full px-3 py-2 placeholder-gray-300 border rounded-md"
          placeholder="Password"
          type="password"
        />
        <button className="w-full p-2 bg-blue-600 text-white rounded-md">
          Sign Up
        </button>
      </div>
      <div className="m-auto w-1/2">
        <img
          className="h-full w-full object-cover"
          src={signInImg}
          alt="Sign In Illustration"
        />
      </div>
    </div>
  );
}

export default SignIn;
