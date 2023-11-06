import React, { useState } from "react";
import { BiSolidUserPlus } from "react-icons/bi";



export default function AddUser() {
  const [formData, setFormData] = useState({
    username: "",
    studentId: "",
    email: "",
    phoneNumber: "",
    role: "user",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/admin/addu  ser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.status === 201) {
        // Assuming 201 is a success status
        console.log("User added successfully:", responseData);
        alert("User added successfully!");

        // Reset form
        setFormData({
          username: "",
          email: "",
          phoneNumber: "",
          role: "user",
          password: "",
        });
      } else {
        if (responseData.error.includes("username")) {
          alert("Username already exists.");
        } else if (responseData.error.includes("studentId")) {
          alert("Student ID already exists.");
        } else if (responseData.error.includes("email")) {
          alert("Email already exists.");
        } else if (responseData.error.includes("phoneNumber")) {
          alert("Phone number already exists.");
        } else {
          alert(
            responseData.error || "Failed to add user for an unknown reason."
          );
        }
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please check your connection and try again.");
    }
  };

  return (
    <div className="flex-row w-1/2 items-center max-w-xl">
      <div className="flex items-center space-x-2 mb-5">
        <BiSolidUserPlus className="text-5xl" />
        <h1 className="text-4xl font-bold">Add New User</h1>
      </div>

    <div className="  min-h-fit  mt-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl px-8 pt-6 pb-8 mb-2"
      >
        {/* Name Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="username"
          >
            User Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="User Name"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Student ID Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="studentId"
          >
            Student ID
          </label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            placeholder="Student ID"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Contact Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Contact Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Contact Number"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Role Selection */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="role"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>
        {/* Password Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-black hover:bg-buttons border border-cute text-lg text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}
