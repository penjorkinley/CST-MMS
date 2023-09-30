import React from "react";
import land from "../assets/LandingPage.svg";
import logo from "../assets/Logo.PNG"
function LandingPage() {
  return (
    <div className="h-screen bg-cute">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={land}
          className="h-screen bg-center bg-cover"
          alt="image please sho"
        />
      </div>
      <div className="z-10 flex justify-between items-center h-50 bg-transparent w-full">
          <img src={logo} alt="logo" className="h-32 w-34"/>
          
        </div>
    </div>
  );
}

export default LandingPage;
