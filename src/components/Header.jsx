import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartSidebar from "./CartSidebar"; // Import the sidebar component
import BottomHeader from "./BottomHeader";
import axios from "axios";

const Header = () => {
  const [inputFocus, setInputFocus] = useState(false);
  const itemsLength = useSelector((state) => state.cart.items);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchProduct, setSearchProduct] = useState([]); // Store categories here
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products to display
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
  const [searchQuery, setSearchQuery] = useState(""); // Search query text
  const navigate = useNavigate();

  const handleInputFocus = () => {
    setInputFocus(true);
  };

  const handleInputBlur = () => {
    setInputFocus(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  // Fetch categories
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((response) => {
        console.log("Fetched categories successfully:", response.data);
        setSearchProduct(response.data); // Set the categories
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on category and search query
  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`https://dummyjson.com/products/category/${selectedCategory}`)
        .then((response) => {
          const filtered = response.data.products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredProducts(filtered);
        })
        .catch((error) => {
          console.error("Error fetching category products:", error);
        });
    } else {
      axios
        .get(`https://dummyjson.com/products/search?q=${searchQuery}`)
        .then((response) => {
          const filtered = response.data.products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredProducts(filtered);
        })
        .catch((error) => {
          console.error("Error fetching search products:", error);
        });
    }
  }, [selectedCategory, searchQuery]);

  const handleSearchBtn = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searchQuery.trim() !== "") {
        navigate(`/products/search?q=${searchQuery}`); // Navigate to search results
      } else {
        navigate("/shop"); // Default to showing all products or handle the empty query case
      }
      setSearchQuery(""); // Clear the search query after navigation
    }
  };

  const productsData = filteredProducts.slice(0, 6);

  return (
    <>
      <header className="bg-gray-800 w-full">
        <div className="flex items-center justify-between h-20 w-full px-1 md:px-5">
          {/* Logo and Location */}
          <div className="flex items-center md:justify-around gap-6 h-full w-1/5 md:w-[14%] md:mr-2">
            <Link href="/">
              <img
                src="/images/BagBasket-logo.webp"
                alt="Amazon Logo"
                className="w-10 md:w-20 object-cover object-center rounded-full"
              />
            </Link>
            <div className="hidden md:flex items-center gap-1 text-white hover:border hover:border-white hover:p-2">
              <FaLocationDot className="text-xl" />
              <h2 className="text-gray-300 text-[0.9rem] tracking-wider leading-tight">
                Deliver to{" "}
                <span className="font-bold text-white">Pakistan</span>
              </h2>
            </div>
          </div>

          {/* Search Bar - hidden on mobile */}
          <div
            className={`flex relative items-center ${
              inputFocus
                ? "bg-yellow-500 shadow-[0_2px_8px_0_rgba(255,193,7,0.4)]"
                : "bg-white"
            } rounded-md md:p-0.5 w-3/5 md:w-[54%] h-8 md:h-12 mr-1 md:mr-3`}
          >
            <select
              name="category"
              id="category"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className={`px-2 ${
                inputFocus
                  ? "border-yellow-400 shadow-[0_2px_8px_0_rgba(255,193,7,0.4)] text-black"
                  : "bg-gray-100 text-gray-700 "
              } text-sm h-full hidden md:block border cursor-pointer focus:outline-none border-gray-300 rounded-l-md`}
            >
              <option value="">All Categories</option>
              {searchProduct.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleSearchBtn}
              className="px-1 md:px-2.5 h-full w-full md:h-full md:w-full text-black text-sm rounded-l-md rounded-b-none placeholder:text-sm placeholder:tracking-tighter md:rounded-none focus:outline-none"
              placeholder="What on your mind?"
            />

            <button
              onClick={handleSearchBtn}
              className="bg-yellow-500 hover:bg-yellow-600 px-2 md:px-4 rounded-r-md rounded-b-none flex items-center justify-center h-full md:h-full"
            >
              <IoSearchSharp className="text-lg md:text-3xl text-black font-extralight" />
            </button>

            {productsData.length > 0 ? (
              <div
                className={`absolute top-[100%] w-full bg-white shadow-md rounded-b-md sm:rounded-md py-2 sm:p-2 z-50 transition-opacity duration-300 ${
                  inputFocus ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                role="menu"
              >
                {productsData.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.title}`}
                    className="cursor-pointer text-xs sm:text-xl font-bold border-b-2 border-zinc-200 w-full py-2 px-3 flex justify-between hover:underline transition-all duration-500 z-50"
                  >
                    {product.title}
                    <span>
                      <IoSearchSharp className="text-lg sm:text-3xl text-black font-extralight" />
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div
                className={`absolute top-[100%] left-0 w-full bg-white shadow-md rounded-md p-2 z-50 ${
                  inputFocus ? "block" : "hidden"
                }`}
              >
                <h3 className="text-lg font-bold text-center text-gray-800">
                  Not found
                </h3>
              </div>
            )}
          </div>

          {/* Right Section (Signup, Cart, etc.) */}
          <div className="flex items-center justify-evenly text-white w-1/5 md:w-[30%]">
            {/* Language Selector */}
            <div className="cursor-pointer hidden md:flex items-center hover:border hover:border-white hover:h-full p-2">
              <img
                src="https://flagcdn.com/w20/us.png"
                alt="American Flag"
                className="w-5 h-3 mr-1"
              />
              <select className="bg-transparent text-white text-lg font-semibold cursor-pointer focus:outline-none">
                <option className="text-black" value="en-US">
                  EN
                </option>
                <option className="text-black" value="es-ES">
                  ES
                </option>
                <option className="text-black" value="fr-FR">
                  FR
                </option>
                <option className="text-black" value="de-DE">
                  DE
                </option>
              </select>
            </div>

            {/* Sign In Section */}
            <div className="cursor-pointer hidden md:flex hover:border hover:border-white hover:h-full md:p-2">
              <Link to="/signup">
                <p className="text-xs text-white">Hello, Sign in</p>
              </Link>
            </div>

            {/* Orders Section */}
            <div className="cursor-pointer hidden md:flex hover:border hover:border-white hover:h-full p-2">
              <Link to="/returnspolicy">
                <p className="text-xs text-white">Returns</p>
                <p className="font-bold text-sm text-white">& Orders</p>
              </Link>
            </div>

            {/* Cart Section */}
            <div className="relative cursor-pointer" onClick={toggleSidebar}>
              <span className="absolute top-0 right-0 bg-yellow-500 text-black rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {itemsLength.length}
              </span>
              <img
                className="h-10 w-10 md:h-14 md:w-14 invert"
                src="/images/cartIcon.gif"
                alt="Cart"
              />
              <p className="font-bold text-sm ml-3">Cart</p>
            </div>
          </div>
        </div>
      </header>
      <BottomHeader />

      {/* Sidebar */}
      <CartSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default Header;
