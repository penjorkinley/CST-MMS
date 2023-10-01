import React from "react";
import { Link } from "react-router-dom";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { BiSolidAddToQueue } from "react-icons/bi";
import { VscFeedback } from "react-icons/vsc";
import { TiTickOutline } from "react-icons/ti";
import { AiOutlineUserAdd } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";

export default function adminNavbar() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <ul className="menu min-h-full w-72 text-blackText bg-adminDash border-r-4">
          <li className=" py-2">
            <p className="text-3xl items-center hover:bg-transparent">Hello, Admin</p>
          </li>
          <hr className="my-4 border-t-2 border-black w-full " />
          <li className="max-w-xs ">
            <Link to= "/dashboard" className="text-2xl items-center py-4 transition duration-300 ease-in-out hover:scale-105">
              <TbDeviceDesktopAnalytics className="text-4xl " /> Dashboard
            </Link>
            
          </li>
          <li>
            <Link to= "/addmenu" className="text-2xl items-center py-4  transition duration-300 ease-in-out hover:scale-105">
              <BiSolidAddToQueue className="text-4xl" /> Add Menu
            </Link>
          </li>
          <li>
            <Link to= "/dailyattendent" className="text-2xl items-center py-4  transition duration-300 ease-in-out hover:scale-105">
              <TiTickOutline className="text-4xl"/> Daily Attendent
            </Link>
          </li>
          <li>
            <Link to= "adduser" className="transition duration-300 ease-in-out hover:scale-105 text-2xl items-center py-4 ">
              <AiOutlineUserAdd className="text-4xl"/> Add User
            </Link>
          </li>
          <li>
            <Link to= "/admin/viewfeedback" className=" transition duration-300 ease-in-out hover:scale-105 text-2xl items-center py-4 ">
              <VscFeedback className="text-4xl" /> View Feedback
            </Link>
          </li>
          <div className="mt-auto"> {/* This ensures the item sticks to the bottom */}
          <li>
            <Link to= "" className="transition duration-300 ease-in-out hover:scale-105 text-2xl items-center py-4">
              <TbLogout className="text-4xl" /> Log Out
            </Link>
          </li>
        </div>
        </ul>
      </div>
    </div>
  );
}
