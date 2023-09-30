import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminTopNavbar from "../components/AdminTopNavbar";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <div className="w-1/5">
        {" "}
        {/* Adjust the width as per your design */}
        <AdminNavbar />
      </div>
      <div className="w-4/5">
        {" "}
        {/* Adjust the width as per your design */}
        <AdminTopNavbar />
       
      </div>
    </div>
  );
}
