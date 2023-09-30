import React from "react";
import {TbDeviceDesktopAnalytics} from "react-icons/tb";
import {BiSolidAddToQueue} from "react-icons/bi";
import {VscFeedback} from "react-icons/vsc";
export default function adminNavbar() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
      
        <ul className="menu p-4 w-80 min-h-full text-textBlack bg-adminDash">
          <li>
            <a>Dashboard <TbDeviceDesktopAnalytics/></a>
          </li>
          <li>
            <a>Add Menu <BiSolidAddToQueue/></a>
          </li>
          <li>
            <a>View Feedback<VscFeedback/> </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
