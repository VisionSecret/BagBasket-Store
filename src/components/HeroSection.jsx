import React, { useEffect, useState } from "react";
import { addToCart } from "../features/cart/cartSlice"; // Correct import
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch = useDispatch();
  const [cartLoading, setCartLoading] = useState({});
  const [loader, setLoader] = useState(false);

  // Fetch products from the API
  useEffect(() => {
    setLoader(true); // Correctly dispatch the action
    setTimeout(() => {
      setLoader(false); // Correctly dispatch the action
    }, 3000);
  }, [dispatch]);

  const handleAddToCart = (product) => {
    setCartLoading((prevState) => ({
      ...prevState,
      [product.id]: true,
    }));
    dispatch(addToCart(product));
    notify();

    setTimeout(() => {
      setCartLoading((prevState) => ({
        ...prevState,
        [product.id]: false,
      }));
    }, 2000);
  };

  const notify = () =>
    toast.success("Item successfully added to your cart!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const navigate = useNavigate();

  const handleShop = () => {
    setTimeout(() => {
      navigate("/shop");
    }, 700);
  };

  const accessories = [
    {
      id: 31,
      title: "Classic Leather Wallet",
      description:
        "A sleek and stylish leather wallet with multiple card slots.",
      thumbnail: "images/accessories/wallet.jpg",
      price: 29.99,
      category: "accessories",
    },
    {
      id: 32,
      title: "Elegant Silver Watch",
      description: "A timeless silver watch that complements any outfit.",
      thumbnail: "images/accessories/watch.jpg",
      price: 199.99,
      category: "accessories",
    },
    {
      id: 33,
      title: "Vintage Sunglasses",
      description: "Retro-inspired sunglasses that provide UV protection.",
      thumbnail: "images/accessories/sunglasses.webp",
      price: 49.99,
      category: "accessories",
    },
    {
      id: 34,
      title: "Stylish Backpack",
      description: "A fashionable backpack perfect for daily use or travel.",
      thumbnail: "images/accessories/Bags.jpeg",
      price: 89.99,
      category: "accessories",
    },
  ];

  const electronics = [
    {
      id: 35,
      title: "Wireless Bluetooth Headphones",
      description:
        "High-quality sound and comfort with up to 20 hours of battery life.",
      thumbnail: "images/electronics/headphones.webp",
      price: 79.99,
      category: "electronics",
    },
    {
      id: 36,
      title: "4K Ultra HD Smart TV",
      description: "Experience stunning visuals with this 55-inch 4K Smart TV.",
      thumbnail: "/images/electronics/smarttv.webp",
      price: 599.99,
      category: "electronics",
    },
    {
      id: 37,
      title: "Portable Power Bank",
      description: "Stay charged on the go with this 20,000mAh power bank.",
      thumbnail: "images/electronics/powerbank.webp",
      price: 29.99,
      category: "electronics",
    },
    {
      id: 38,
      title: "Smartwatch with Fitness Tracker",
      description:
        "Track your fitness goals and receive notifications on your wrist.",
      thumbnail: "images/electronics/smartwatch.webp",
      price: 149.99,
      category: "electronics",
    },
  ];

  const smartphones = [
    {
      id: 39,
      title: "Smartphone X Pro",
      description:
        "The latest smartphone with a stunning display and advanced camera features.",
      thumbnail: "/images/smartphone/smartphone1.webp",
      price: 999.99,
      category: "smartphones",
    },
    {
      id: 40,
      title: "Samsung Smartphone",
      description:
        "A reliable smartphone with essential features for everyday use.",
      thumbnail: "/images/smartphone/samsung.webp",
      price: 299.99,
      category: "smartphones",
    },
    {
      id: 41,
      title: "Oppo Smartphone Z",
      description:
        "Designed for gamers with high performance and a vibrant display.",
      thumbnail: "/images/smartphone/oppo.webp",
      price: 799.99,
      category: "smartphones",
    },
    {
      id: 42,
      title: "Iphone 12 pro max",
      description:
        "Capture stunning photos with the triple-camera system and AI features.",
      thumbnail: "/images/smartphone/iphone.webp",
      price: 649.99,
      category: "smartphones",
    },
  ];

  if (loader) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <div className="hero relative">
        <div className="absolute top-32 sm:top-44 left-8 sm:left-10 w-[90%] sm:w-[38vw] z-30 p-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-3 whitespace-normal sm:whitespace-nowrap">
            Welcome to{" "}
            <span className="font-bold text-5xl sm:text-6xl">BagBasket</span>
          </h1>
          <p className="text-base  sm:text-lg mt-4 sm:mt-6 mb-6 leading-5 sm:leading-6 font-medium">
            Discover the perfect blend of style and functionality at BagBasket,
            your ultimate destination for chic bags that elevate any outfit.
          </p>
          <button
            onClick={handleShop}
            className="flex items-center justify-between gap-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 sm:py-3 sm:px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Shop Now <AiOutlineArrowRight />
          </button>
        </div>

        <div
          className="min-h-[90vh] w-full sm:min-h-[90vh] bg-cover bg-right flex items-center justify-center z-20"
          style={{
            backgroundImage: `url("/images/hero1.jpg")`,
          }}
        ></div>

        <div className="bg-[#E3E6E6]">
          <div className="px-4 sm:px-10 py-10">
            {/* Accessories Section */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800 mt-12">
              Accessories:
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {accessories.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 shadow-md bg-[#FFFFFF] hover:shadow-lg transition-shadow duration-200"
                >
                  <h2 className="text-lg sm:text-xl text-black font-semibold mb-3 sm:mb-4">
                    {product.title}
                  </h2>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-40 sm:h-48 object-cover rounded-md mb-3 sm:mb-4"
                  />
                  <p className="text-gray-600 mb-2 text-sm sm:text-base line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-zinc-800 font-bold text-lg mb-4 hover:underline">
                    ${product.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-white font-bold py-2 px-4 rounded-md w-full"
                  >
                    {cartLoading[product.id] ? (
                      <img
                        className="h-6 w-6 rounded-full"
                        src="\images\Loading.gif"
                        alt="Loading..."
                      />
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Electronics Section */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800 mt-12">
              Electronics:
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {electronics.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 shadow-md bg-[#FFFFFF] hover:shadow-lg transition-shadow duration-200"
                >
                  <h2 className="text-lg sm:text-xl text-black font-semibold mb-3 sm:mb-4">
                    {product.title}
                  </h2>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-40 sm:h-48 object-cover rounded-md mb-3 sm:mb-4"
                  />
                  <p className="text-gray-600 mb-2 text-sm sm:text-base line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-zinc-800 font-bold text-lg mb-4 hover:underline">
                    ${product.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-white font-bold py-2 px-4 rounded-md w-full"
                  >
                    {cartLoading[product.id] ? (
                      <img
                        className="h-6 w-6 rounded-full"
                        src="\images\Loading.gif"
                        alt="Loading..."
                      />
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Smartphones Section */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800 mt-12">
              Smartphones:
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {smartphones.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 shadow-md bg-[#FFFFFF] hover:shadow-lg transition-shadow duration-200"
                >
                  <h2 className="text-lg sm:text-xl text-black font-semibold mb-3 sm:mb-4">
                    {product.title}
                  </h2>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-40 sm:h-48 object-cover rounded-md mb-3 sm:mb-4"
                  />
                  <p className="text-gray-600 mb-2 text-sm sm:text-base line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-zinc-800 font-bold text-lg mb-4 hover:underline">
                    ${product.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-white font-bold py-2 px-4 rounded-md w-full"
                  >
                    {cartLoading[product.id] ? (
                      <img
                        className="h-6 w-6 rounded-full"
                        src="\images\Loading.gif"
                        alt="Loading..."
                      />
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-16 mb-8 flex justify-center">
              <button
                onClick={handleShop}
                className="flex items-center justify-between gap-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                View All Products <IoMdArrowDropdown />
              </button>
            </div>

            <ToastContainer
              position="top-right"
              autoClose={2000}
              limit={3}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
