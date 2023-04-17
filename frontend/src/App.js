/* eslint-disable no-unused-vars */
import React from "react";
import "./pages/Homepage/home.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Homepage/Home";
import Log from "./pages/LoginPage/Log";
import Check from "./pages/Checkout/Check";
import Order from "./pages/AccountPage/Order";
import AboutUs from "./pages/Company/AboutUs";
import PrivacyPolicy from "./pages/Company/PrivacyPolicy";
import Terms from "./pages/Company/Terms";
import Blog from "./pages/BlogPage/Blog";
import SavedItems from "./pages/AccountPage/SavedItems";
import UserAccount from "./pages/AccountPage/UserAccount";
import Frequent from "./pages/FAQ/Frequent";
import Return from "./pages/FAQ/Return";
import Shipping from "./pages/FAQ/Shipping";
import Payment from "./pages/FAQ/Payment";
import PaymentSuccess from "./pages/Checkout/PaymentSuccess";
import ProductList from "./pages/ProductPage/ProductList";
import ProductInfo from "./pages/ProductPage/ProductDetails/ProductInfo";
import Stripe from "./pages/Checkout/Stripe/Stripe";
import NoMatch from "./pages/NoMatch";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={user ? <Navigate to="/" /> : <Log />} />
        <Route path="checkout" element={<Check />} />
        <Route path="order" element={<Order />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="blog" element={<Blog />} />
        <Route path="wishlist" element={<SavedItems />} />
        <Route path="profile" element={<UserAccount />} />
        <Route path="faq" element={<Frequent />} />
        <Route path="return" element={<Return />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="payment" element={<Payment />} />
        <Route path="paymentsuccess" element={<PaymentSuccess />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:category" element={<ProductList />} />
        <Route path="product/:id" element={<ProductInfo />} />
        <Route path="stripe" element={<Stripe />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
