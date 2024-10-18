import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Headerbar from "./Headerbar";
import { Link, useNavigate } from "react-router-dom";

const BottomHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="topbar flex items-center h-12 md:px-5 bg-[#232F3E]">
      <ul className="flex space-x-2 text-white">
        <li
          onClick={toggleSidebar}
          className="flex items-center justify-between gap-2 hover:border hover:border-white hover:h-full p-2"
        >
          <FiMenu className="font-extrabold text-xl cursor-pointer" />
          <button className="text-white text-sm font-semibold">All</button>
        </li>
        <li className="hover:border hover:border-white hover:h-full p-2">
          <Link to="/shop">
            <button className="text-white text-sm font-semibold">
              Today's Deals
            </button>
          </Link>
        </li>
        <li className="hover:border hover:border-white hover:h-full p-2">
          <Link to="/cart">
            <button className="text-white text-sm font-semibold">Cart</button>
          </Link>
        </li>
        <li className="hover:border hover:border-white hover:h-full p-2">
          <Link to="/login">
            <button className="text-white text-sm font-semibold">Login</button>
          </Link>
        </li>
      </ul>

      {isSidebarOpen && <Headerbar onClose={toggleSidebar} />}
    </div>
  );
};

export default BottomHeader;
