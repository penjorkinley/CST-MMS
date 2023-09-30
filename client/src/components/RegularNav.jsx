import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.PNG'

export default function RegularNav() {
  return (
    <nav className="bg-cute p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center"> {/* Container for logo and navigation */}
          <div>
            <img src={logo} alt="Logo" className="h-32 w- p50-4 border-none " /> 
          </div>
        </div>
        <ul className="flex space-x-4 font-semibold text-black text-2xl mr-7 " >
          <li>
            <Link to="/menu" className="text-black hover:text-blue-300">
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
    </nav>
  );
}
