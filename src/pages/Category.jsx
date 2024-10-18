import React from "react";
import { NavLink } from "react-router-dom";

const Category = ({ categories, setSearch }) => {
  const handleCategoryClick = (url) => {
    setSearch(url);
    // Optionally, you can add any other logic here
  };

  return (
    <div className="sm:sticky top-3 bg-[#fafafa] p-0 sm:p-3 rounded-lg">
      <ul className="sm:space-y-2 grid grid-cols-2 gap-1 sm:grid-cols-none">
        {categories.map((category) => (
          <NavLink
            onClick={() => handleCategoryClick(category.url)}
            key={category.slug}
            className={({ isActive }) =>
              `block text-gray-800 hover:text-zinc-700 bg-zinc-200 rounded-sm sm:rounded-lg py-1 px-2 sm:py-3 sm:hover:px-6 text-[4vw] sm:text-sm font-semibold cursor-pointer transition-all duration-200 ${
                isActive ? "bg-gray-800 px-2 sm:px-4" : ""
              }`
            }
            tabIndex="0" // Allow keyboard navigation
          >
            {category.name}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Category;
