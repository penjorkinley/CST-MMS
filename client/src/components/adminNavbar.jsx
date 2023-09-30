import React from "react";
import {TbDeviceDesktopAnalytics} from "react-icons/tb";
import {BiSolidAddToQueue} from "react-icons/bi";
import {VscFeedback} from "react-icons/vsc";

export default function adminNavbar() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <ul className="menu p-4 w-80 min-h-full text-blackText bg-adminDash">
          <li>
            <a className="text-2xl items-center"><TbDeviceDesktopAnalytics/> Dashboard</a>
          </li>
          <li>
            <a className="text-2xl items-center"><BiSolidAddToQueue/> Add Menu</a>
          </li>
          <li>
            <a className="text-2xl items-center"><VscFeedback/> View Feedback</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
