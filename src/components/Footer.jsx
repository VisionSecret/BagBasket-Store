import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#232F3E] text-white pb-4">
      {/* Top Section: Back to Top */}
      <div className="text-center mb-8 w-full bg-[#37475A] py-3">
        <a href="#top" className="text-sm font-bold hover:underline">
          Back to top
        </a>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Middle Section: Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold mb-4">Get to Know Us</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Press Releases
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  BagBasket Cares
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold mb-4">Make Money with Us</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Sell on BagBasket
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Affiliate Marketing
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Advertise Your Products
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                BagBasket Global Selling
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold mb-4">BagBasket Payment</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                BagBasket Pay
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Credit Card Offers
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  EMI Payment
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Currency Converter
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-bold mb-4">Let Us Help You</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Your Orders
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Returns & Refunds
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Help
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Customer Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Disclaimer */}
        <div className="text-center text-xs text-gray-400 mt-12">
          <p>
            &copy; {new Date().getFullYear()} BagBasket, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
