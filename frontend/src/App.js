/* eslint-disable no-unused-vars */

import React from "react";
import "./components/Homepage/home.css";
import Log from "./components/LoginPage/Log";

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Homepage/Home";

import AboutUs from "./components/Company/AboutUs";
import PrivacyPolicy from "./components/Company/PrivacyPolicy";
import Terms from "./components/Company/Terms";
import Blog from "./components/BlogPage/Blog";
import Frequent from "./components/FAQ/Frequent";
import Return from "./components/FAQ/Return";
import Shipping from "./components/FAQ/Shipping";
import Payment from "./components/FAQ/Payment";
import NoMatch from "./components/NoMatch";
import Check from "./components/Checkout/Check";
import ProductInfo from "./components/ProductPage/ProductDetails/ProductInfo";
import PaymentSuccess from "./components/Checkout/PaymentSuccess";
import ProductList from "./components/ProductPage/ProductList";
import Stripe from "./components/Checkout/Stripe/Stripe";
import Order from "./components/Order"
import { useSelector } from "react-redux";
import SavedItems from "./components/SavedItems";
import UserAccount from "./components/UserAccount";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={user ? <Navigate to="/" /> : <Log />} />
        <Route path="checkout" element={<Check />} />
        <Route path="order" element={<Order/>} />
        <Route path="about" element={<AboutUs />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="blog" element={<Blog />} />
        <Route path="wishlist" element={<SavedItems/>} />
        <Route path="profile" element={<UserAccount/>} />
        <Route path="faq" element={<Frequent />} />
        <Route path="return" element={<Return />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="payment" element={<Payment />} />
        <Route path="paymentsuccess" element={<PaymentSuccess />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:category" element={<ProductList />} />
        <Route path="product/:id" element={<ProductInfo />} />
        <Route path="stripe" element={<Stripe/>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
