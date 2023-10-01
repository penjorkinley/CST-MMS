import React from "react";
import AdminNavbar from "../components/adminNavbar";
import AdminTopNavbar from "../components/AdminTopNavbar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <div className="w-1/6">
        {" "}
        {/* Adjust the width as per your design */}
        <AdminNavbar />
      </div>
      <div className="w-5/6 bg-cute">
        {" "}
        {/* Adjust the width as per your design */}
        {/* <AdminTopNavbar /> */}
        <Outlet />
      </div>
    </div>
  );
}
