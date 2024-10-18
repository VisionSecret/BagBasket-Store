import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsPage = () => {
  const { productId } = useParams(); // Get the product id from the URL
  const [searchProducts, setSearchProducts] = useState(null);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(""); // Store category for second fetch
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [cartLoading, setCartLoading] = useState({});

  // Fetch products based on search query
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/search?q=${productId}`)
      .then((response) => {
        const fetchedProducts = response.data.products;
        setSearchProducts(fetchedProducts);

        // If search results exist, set the category from the first product
        if (fetchedProducts.length > 0) {
          setCategory(fetchedProducts[0].category);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search products:", error);
        setLoading(false);
      });
  }, [productId]);

  // Fetch category-based products once we have the category from search results
  useEffect(() => {
    if (category) {
      axios
        .get(`https://dummyjson.com/products/category/${category}`)
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((error) => {
          console.error("Error fetching category products:", error);
          setLoading(false);
        });
    }
  }, [category]); // Trigger this effect when 'category' is set

  const relatedProducts = products.slice(0, 6);

  const handleAddToCart = (product) => {
    setCartLoading((prevState) => ({ ...prevState, [product.id]: true }));
    dispatch(addToCart(product));
    notify();

    setTimeout(() => {
      setCartLoading((prevState) => ({ ...prevState, [product.id]: false }));
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
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-8 md:p-5">
      <h1 className="font-bold sm:text-xl text-center text-gray-800 mb-4">
        Search Results for:{" "}
        <span className="text-blue-500 sm:text-2xl tracking-tighter">
          "{productId}"
        </span>
      </h1>

      {searchProducts && searchProducts.length > 0 ? (
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Search Results
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {searchProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-3 sm:p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.title}
                  </h3>
                  <span className="text-sm text-gray-500">{product.brand}</span>
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-4">
                    <span className="text-xl font-bold text-black">
                      ${product.price}
                    </span>
                  </div>
                  <button
                    className="mt-4 w-full flex items-center justify-center bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition-all"
                    onClick={() => handleAddToCart(product)}
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
            ))}
          </div>
        </div>
      ) : (
        // Fallback for no search results
        <div className="text-center text-gray-500 my-10">
          <h3 className="text-xl font-medium">
            No products found for your search.
          </h3>
        </div>
      )}

      {products.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Related Products in Category:{" "}
            <span className="text-blue-600">{category}</span>
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-3 sm:p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.title}
                  </h3>
                  <span className="text-sm text-gray-500">{product.brand}</span>
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-4">
                    <span className="text-xl font-semibold text-green-600">
                      ${product.price}
                    </span>
                  </div>
                  <button
                    className="mt-4 w-full flex items-center justify-center bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition-all"
                    onClick={() => handleAddToCart(product)}
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
            ))}
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default ProductsPage;
