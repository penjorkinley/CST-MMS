import React from "react";
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
        <ul className="menu  w-80 min-h-full text-blackText bg-adminDash">
          <li className=" py-5">
            <p className="text-4xl items-center">Hello, Admin</p>
          </li>
          <hr className="my-4 border-t-2 border-black w-full" />
          <li>
            <a className="text-2xl items-center">
              <TbDeviceDesktopAnalytics /> Dashboard
            </a>
          </li>
          <li>
            <a className="text-2xl items-center">
              <BiSolidAddToQueue /> Add Menu
            </a>
          </li>
          <li>
            <a className="text-2xl items-center">
              <TiTickOutline /> Daily Attendent
            </a>
          </li>
          <li>
            <a className="text-2xl items-center">
              <AiOutlineUserAdd /> Add User
            </a>
          </li>
          <li>
            <a className="text-2xl items-center">
              <VscFeedback /> View Feedback
            </a>
          </li>
          <li>
            <a className="text-2xl items-center">
              <TbLogout /> Log Out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
