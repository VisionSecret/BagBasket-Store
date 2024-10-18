import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../features/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Category from "./Category";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [cartLoading, setCartLoading] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    if (search !== "") {
      console.log(search);
      axios
        .get(`${search}`)
        .then((response) => response.data)
        .then((finaldata) => setProducts(finaldata.products))
        .catch((error) => console.error(error));
    } else {
      axios
        .get("https://dummyjson.com/products/search?q=phone")
        .then((response) => response.data)
        .then((finaldata) => setProducts(finaldata.products))
        .catch((error) => console.error(error));
    }
  }, [search]);

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

  const handleAddToCart = (product) => {
    setCartLoading((prevState) => ({ ...prevState, [product.id]: true }));
    dispatch(addToCart(product));
    notify();

    setTimeout(() => {
      setCartLoading((prevState) => ({ ...prevState, [product.id]: false }));
    }, 2000);
  };

  const notify = () => {
    toast.success("Item successfully added to your cart!", {
      position: window.innerWidth < 640 ? "bottom-center" : "top-right", // Adjust position for mobile
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        fontSize: window.innerWidth < 640 ? "14px" : "16px", // Responsive font size
        width: "270px",
        height: "30px",
        marginLeft: "15px",
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-[95%] mx-auto px-2 sm:px-6 lg:px-2 py-12">
        {/* Category Section */}
        <div className="mb-20 mt-10">
          <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Accessories Category */}
            <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src="/images/accessories/watch.jpg"
                alt="Accessories"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="cursor-pointer text-white text-3xl font-bold opacity-0 hover:opacity-90 transition-opacity duration-500">
                  Accessories
                </h3>
              </div>
            </div>

            {/* Electronics Category */}
            <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src="/images/electronics/catHeadphone.jpg"
                alt="Electronics"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="cursor-pointer text-white text-3xl font-bold opacity-0 hover:opacity-90 transition-opacity duration-500">
                  Electronics
                </h3>
              </div>
            </div>

            {/* Smartphones Category */}
            <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src="/images/smartphone/catPhone.jpg"
                alt="Smartphones"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="cursor-pointer text-white text-3xl font-bold opacity-0 hover:opacity-90 transition-opacity duration-500">
                  Smartphones
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories Section */}
          <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <Category categories={categories} setSearch={setSearch} />
          </div>
          {/* Products Section */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border w-full h-full sm:h-fit rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-fit w-full sm:w-full sm:h-48 object-cover rounded-t-lg"
                  />
                  <div className="px-3 pb-4 sm:p-4">
                    <h2 className="text-sm sm:text-xl text-black font-semibold mb-2">
                      {product.title}
                    </h2>
                    <p className="text-gray-600 mb-2 text-sm line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-zinc-800 font-bold sm:text-lg mb-4">
                      ${product.price}
                    </p>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-white font-bold py-2 px-4 rounded-md w-full"
                      >
                        {cartLoading[product.id] ? (
                          <img
                            className="h-6 w-6 rounded-full"
                            src="/images/Loading.gif"
                            alt="Loading..."
                          />
                        ) : (
                          "Add to Cart"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Shop;
