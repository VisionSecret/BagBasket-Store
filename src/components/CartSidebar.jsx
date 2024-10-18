import { useDispatch, useSelector } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeFromCart } from "../features/cart/cartSlice";

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [cartLoading, setCartLoading] = useState(false);

  const handleCartClick = () => {
    setCartLoading(true);
    setTimeout(() => {
      setCartLoading(false);
    }, 1300);
  };

  const handleShop = () => {
    navigate("/shop");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".cart-sidebar")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (cartLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div
      className={`cart-sidebar fixed top-0 right-0 w-full md:w-96 h-full z-50 px-2 md:px-4 overflow-x-hidden overflow-y-auto bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-3 md:p-4 border-b">
        <h2 className="text-lg md:text-xl font-semibold">Your Cart</h2>
        <button onClick={onClose} className="text-2xl md:text-3xl font-bold">
          &times;
        </button>
      </div>

      {items.length > 0 ? (
        <div className="relative flex flex-col gap-2 w-full p-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between rounded-lg px-2 py-2 shadow-md bg-white w-full"
            >
              <div className="content flex space-x-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 md:h-20 object-cover object-center rounded-md"
                />
                <div className="flex flex-col justify-center items-start">
                  <h2 className="text-sm md:text-base text-black font-semibold">
                    {item.name}
                  </h2>
                  <p className="mb-2 text-xs md:text-sm">
                    Quantity: {item.quantity}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-black text-xs md:text-sm font-medium underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="price">
                <p className="text-black font-bold text-sm md:text-base">
                  ${item.price}
                </p>
              </div>
            </div>
          ))}

          <div className="w-full mt-4 p-3 md:p-4 border-t bg-white">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <span className="text-md md:text-lg font-semibold">Total:</span>
              <span className="text-md md:text-lg font-bold">
                $
                {items
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  onClose();
                  handleCartClick();
                  setTimeout(() => {
                    navigate("/checkout");
                  }, 700);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md w-full"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => {
                  onClose();
                  handleCartClick();
                  setTimeout(() => {
                    navigate("/cart");
                  }, 700);
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md w-full"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          {/* Empty Cart Message */}
          <div className="flex flex-col items-center justify-center gap-5 mt-24">
            <div className="svg w-16 h-16 md:w-20 md:h-20 font-extrabold text-3xl md:text-4xl rounded-full bg-gray-300 flex items-center justify-center">
              <TiShoppingCart className="font-extrabold text-3xl md:text-4xl" />
            </div>
            <p className="flex items-center justify-center text-sm md:text-base">
              Your cart is empty.
            </p>
            <button
              onClick={() => handleShop()}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
