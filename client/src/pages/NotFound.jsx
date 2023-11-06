import React from "react";
import notfound from "../assets/404updated.svg";

function NotFound() {
  return (
    <div className="flex justify-center items-center">
      <img src={notfound} alt="not found" className="w-[500px] pt-10" />
    </div>
  );
}

export default NotFound;
