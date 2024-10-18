import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Headerbar = ({ onClose }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="fixed top-0 inset-0 z-50 bg-black bg-opacity-50">
      <div className="bg-white py-4 px-3 md:py-6 md:px-4 rounded-lg shadow-lg w-full md:w-[30%] h-full">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h2 className="text-lg md:text-xl font-bold">Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-orange-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="space-y-2 md:space-y-3 mt-6 md:mt-8">
          <li>
            <Link
              to="/"
              className="block text-gray-700 hover:text-indigo-600 transition-all duration-200 hover:underline"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="block text-gray-700 hover:text-indigo-600 transition-all duration-200 hover:underline"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/returnspolicy"
              className="block text-gray-700 hover:text-indigo-600 transition-all duration-200 hover:underline"
            >
              Our Policy
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="block text-gray-700 hover:text-indigo-600 transition-all duration-200 hover:underline"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-indigo-600 transition duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>

        <Link to="/shop">
          <button className="mt-5 md:mt-6 w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-500 transition duration-200">
            Today's Deals
          </button>
        </Link>

        <div className="bg-[#fafafa] py-2 rounded-lg w-full mt-4">
          <h2 className="font-bold text-md md:text-lg underline mb-2">
            Categories:
          </h2>
          <ul className="flex flex-wrap gap-1 space-y-1 w-full">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/category/${category.slug}`}
                  className="block text-gray-800 hover:text-zinc-700 bg-zinc-200 rounded-lg py-1 px-3 md:py-2 md:px-4 text-sm font-semibold cursor-pointer transition-all duration-200"
                  tabIndex="0"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Headerbar;
