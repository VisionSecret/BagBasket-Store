import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryPage = () => {
  const { categoryId } = useParams(); // Get category from URL params
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Fetch products when categoryName changes
  useEffect(() => {
    if (categoryId) {
      axios
        .get(`https://dummyjson.com/products/category/${categoryId}`)
        .then((res) => {
          setProducts(res.data.products);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          console.error("Error fetching category products:", error);
        });
    }
  }, [categoryId]); // Add categoryId as dependency

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

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  return (
    <div>
      <h1 className="text-xl sm:text-3xl text-center font-semibold text-gray-700 my-10">
        Search Category:{" "}
        <span className="font-medium underline tracking-tighter text-blue-500">
          {categoryId}
        </span>
      </h1>

      {/* Display category name */}
      <div className="category-products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-8 lg:p-12">
        {products.map((product) => (
          <div
            key={product.id}
            className="product bg-white p-4 rounded-lg shadow-md transition transform hover:shadow-lg"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg md:text-xl font-bold">{product.title}</h2>
            <p className="text-gray-700 text-sm md:text-base">
              {product.description}
            </p>
            <span className="text-lg font-semibold text-green-600">
              ${product.price}
            </span>
            <button
              className="mt-4 w-full bg-yellow-500 flex items-center justify-center hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition duration-300"
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
        ))}
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default CategoryPage;
