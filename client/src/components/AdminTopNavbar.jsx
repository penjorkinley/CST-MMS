import React from "react";
import logo from "../assets/Logo.PNG";

function AdminTopNavbar() {
  return (
    <div className="bg-cute p-3 border-b-4 h-[90px]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center"></div>
        <div className="ml-auto">
          <img src={logo} alt="Logo" className="h-[70px] border-none " />
        </div>
      </div>
    </div>
  );
}

export default AdminTopNavbar;
