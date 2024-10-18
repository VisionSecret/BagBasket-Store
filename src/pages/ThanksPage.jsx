import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ThanksPage = () => {
  // Access cart state using the useSelector hook
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [shopLoading, setShopLoading] = useState(false);
  const handleShoping = () => {
    setShopLoading(true);
    setTimeout(() => {
      setShopLoading(false);
      navigate("/shop");
    }, 1300);
  };

  if (shopLoading) {
    return (
      <body className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </body>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <svg
          className="mx-auto h-16 w-16 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Thank You for Your Order!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          We appreciate your business and are processing your order now.
        </p>
  
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
          <p className="mt-2 text-sm text-gray-600">
            Order number: <strong>#12345</strong>
            <br />
            Estimated delivery: <strong>3-5 business days</strong>
          </p>
        </div>
  
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Items Purchased</h3>
          <ul className="mt-2 text-sm text-gray-600">
            {cart.items.length > 0 ? (
              cart.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${item.totalPrice.toFixed(2)}</span>
                </li>
              ))
            ) : (
              <li>No items in your order.</li>
            )}
          </ul>
          <div className="mt-4 font-semibold">
            <strong>Total: </strong>${cart.totalAmount.toFixed(2)}
          </div>
        </div>
  
        <div className="mt-8">
          <p className="text-sm text-gray-600">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
  
        <div className="mt-8">
          <button
            onClick={handleShoping}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default ThanksPage;
