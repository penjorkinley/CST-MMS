import { Link } from "react-router-dom";
import logo from "../assets/Logo.PNG";

export default function RegularNav() {
  return (
    <div className="bg-cute p-4 border-b-4 h-[120px]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {" "}
          {/* Container for logo and navigation */}
          <div>
            <img src={logo} alt="Logo" className="h-[100px] border-none " />
          </div>
        </div>
        <ul className="flex space-x-4 font-semibold text-black text-2xl mr-7 ">
          <li>
            <Link to="/" className="text-black hover:text-blue-300">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/order" className="text-black hover:text-blue-300">
              Order
            </Link>
          </li>
          <li>
            <Link to="/feedback" className="text-black hover:text-blue-300">
              Feedback
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="text-black hover:text-blue-300">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
