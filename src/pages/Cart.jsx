import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../features/cart/cartSlice";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmpty = () => {
    setTimeout(() => {
      navigate("/shop");
    }, 1000);
  };
  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/checkout");
      setLoading(false);
    }, 1300);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="sm:flex gap-8 p-3 sm:p-7 min-h-[70vh]">
      <div className="w-full sm:w-3/5">
        <div className="flex items-center justify-between sm:w-4/5 border-b px-3 pb-4 mb-6 text-zinc-800">
          <h1 className="text-lg font-medium">Product</h1>
          <h1 className="text-lg font-medium">Total</h1>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 mt-24">
            <div className="svg w-20 h-20 font-extrabold text-4xl rounded-full bg-gray-300 flex items-center justify-center">
              <TiShoppingCart className="font-extrabold text-4xl" />
            </div>
            <p>Your cart is empty.</p>
            <button
              onClick={handleEmpty}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-7 w-full sm:w-3/4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between rounded-lg px-2 py-2 shadow-md bg-white w-full sm:h-24 h-20" // Adjusted height for mobile
              >
                <div className="content flex gap-4 sm:gap-6">
                  {" "}
                  {/* Adjust gap for mobile */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 sm:h-20 object-cover object-center rounded-md" // Smaller height on mobile
                  />
                  <div className="flex flex-col justify-center items-start">
                    <h2 className="text-[3vw] sm:text-lg text-black font-semibold">
                      {" "}
                      {/* Smaller text size on mobile */}
                      {item.name}
                    </h2>
                    <p className="mb-1 text-xs sm:text-sm">
                      Quantity: {item.quantity}
                    </p>{" "}
                    {/* Smaller text size on mobile */}
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-black text-xs sm:text-sm font-medium underline" // Smaller text size on mobile
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="price">
                  <p className="text-black font-bold text-sm sm:text-lg">
                    {" "}
                    {/* Smaller text size on mobile */}$
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full sm:w-2/5 h-full px-2 sm:px-0 mt-10 sm:mt-0">
        <div className="flex items-center justify-between border-b px-2 sm:px-3 pb-4 mb-6 text-zinc-800">
          <h1 className="text-sm font-medium">Cart Totals</h1>
          {items.length > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Clear Cart
            </button>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <h1 className="text-sm font-medium">Subtotal</h1>
            <span className="text-sm">
              $
              {items
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <h1 className="text-sm font-medium">Shipping</h1>
            <span className="text-sm">Free</span>
          </div>
          <div className="flex justify-between border-t pt-4">
            <h1 className="text-base font-semibold">Total</h1>
            <span className="text-base font-semibold">
              $
              {items
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
