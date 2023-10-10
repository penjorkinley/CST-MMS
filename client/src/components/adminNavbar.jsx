import { Link } from "react-router-dom";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { BiSolidAddToQueue } from "react-icons/bi";
import { VscFeedback } from "react-icons/vsc";
import { AiOutlineUserAdd } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { MdOutlineInventory2 } from "react-icons/md";

export default function adminNavbar() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <ul className="menu min-h-full w-72 text-blackText bg-adminDash border-r-4">
          <li className=" py-2">
            <p className="text-3xl items-center hover:bg-transparent">
              Hello, Admin
            </p>
          </li>
          <hr className="my-4 border-t-2 border-black w-full " />
          <li className="max-w-xs ">
            <Link
              to="/admin/dashboard"
              className="text-2xl items-center py-4 transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg dark:hover:shadow-black"
            >
              <TbDeviceDesktopAnalytics className="text-4xl " /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/addmenu"
              className="text-2xl items-center py-4  transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg dark:hover:shadow-black"
            >
              <BiSolidAddToQueue className="text-4xl" /> Add Menu
            </Link>
          </li>

          <li>
            <Link
              to="/admin/inventory"
              className="transition duration-300 ease-in-out hover:scale-105 text-2xl items-center py-4 hover:shadow-lg dark:hover:shadow-black"
            >
              <MdOutlineInventory2 className="text-4xl" /> Inventory
            </Link>
          </li>
          <li>
            <Link
              to="/admin/adduser"
              className="transition duration-300 ease-in-out hover:scale-105 text-2xl items-center py-4 hover:shadow-lg dark:hover:shadow-black "
            >
              <AiOutlineUserAdd className="text-4xl" /> Add User
            </Link>
          </li>
          <li>
            <Link
              to="/admin/viewfeedback"
              className=" transition duration-300 ease-in-out hover:scale-105 text-2xl items-center py-4 hover:shadow-lg dark:hover:shadow-black"
            >
              <VscFeedback className="text-4xl" /> View Feedback
            </Link>
          </li>

          <div className="mt-auto">
            {" "}
            {/* This ensures the item sticks to the bottom */}
            <li>
              <Link
                to=""
                className="transition duration-300 ease-in-out hover:scale-105 text-2xl items-center hover:text-white hover:bg-transparent"
              >
                <TbLogout className="text-4xl" /> Log Out
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
