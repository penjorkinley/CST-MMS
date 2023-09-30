import React from 'react';

export default function RegularNav() {
  return (
    <nav className="bg-transparent p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center"> {/* Container for logo and navigation */}
          <div>
            <img src="client\src\assets\Logo.PNG" alt="Logo" className="box-border h-32 w-32 p-4 border-4 ..." /> 
          </div>
          
        </div>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-black hover:text-blue-300">Menu</a></li>
          <li><a href="#" className="text-black hover:text-blue-300">Order</a></li>
          <li><a href="#" className="text-black hover:text-blue-300">Feedback</a></li>
          <li><a href="#" className="text-black hover:text-blue-300">About</a></li>
        </ul>
      </div>
    </nav>
  );
}
