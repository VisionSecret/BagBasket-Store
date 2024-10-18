import React from "react";
import { createRoot } from "react-dom/client"; // Keep this import
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"; // Import necessary hooks from react-router-dom
import App from "./App.jsx"; // Ensure this path is correct
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";
import Layout from "./components/Layout.jsx";
import Checkout from "./pages/Checkout.jsx";
import ThanksPage from "./pages/ThanksPage.jsx";
import ReturnsPolicy from "./pages/ReturnsPolicy.jsx";
import SignUp from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";

// Create root element
const root = createRoot(document.getElementById("root"));

// Create router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<App />} />{" "}
      {/* Change to index to load App at root */}
      <Route path="shop" element={<Shop />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="thankspage" element={<ThanksPage />} />
      <Route path="returnspolicy" element={<ReturnsPolicy />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="/products/:productId" element={<ProductsPage />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
    </Route>
  )
);

// Render the application
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
