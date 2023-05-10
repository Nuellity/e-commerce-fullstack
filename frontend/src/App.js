/* eslint-disable no-unused-vars */
import React from "react";
import "./pages/Homepage/home.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Homepage/Home";
import Log from "./pages/LoginPage/Log";
import Check from "./pages/Checkout/Check";
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
import ProductInfo from "./pages/ProductPage/ProductInfo";
import Stripe from "./pages/Checkout/Stripe/Stripe";
import NoMatch from "./pages/NoMatch";
import AccountSummary from "./pages/AccountPage/AccountSummary";
import Reviews from "./pages/AccountPage/Reviews/Reviews";
import Voucher from "./pages/AccountPage/Voucher";
import NewsLetter from "./pages/AccountPage/NewsLetter";
import ManageAccount from "./pages/AccountPage/ManageAccount/ManageAccount";
import Order from "./pages/AccountPage/Order/Order";
import OrderDetails from "./pages/AccountPage/Order/OrderDetails";
import ReviewProduct from "./pages/AccountPage/Reviews/ReviewProduct";
import ProfileDetails from "./pages/AccountPage/ManageAccount/ProfileDetails";
import ChangePassword from "./pages/AccountPage/ManageAccount/ChangePassword";
import DeleteAccount from "./pages/AccountPage/ManageAccount/DeleteAccount";
import AddressBook from "./pages/AccountPage/AddressBook/AddressBook";
import NewAddress from "./pages/AccountPage/AddressBook/NewAddress";
import DefaultAddress from "./pages/AccountPage/AddressBook/DefaultAddress";
import BlogDetails from "./pages/BlogPage/BlogDetails";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={user ? <Navigate to="/" /> : <Log />} />
        <Route path="checkout" element={<Check />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog-details" element={<BlogDetails />} />
        <Route
          path="profile"
          // element={user ? <UserAccount /> : <Navigate to="/login" />}
          element={<UserAccount />}
        >
          <Route path="orders" element={<Order />} />
          <Route path="order-details/:orderId" element={<OrderDetails />} />
          <Route path="summary" element={<AccountSummary />} />
          <Route path="wishlist" element={<SavedItems />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="review-product/:reviewId" element={<ReviewProduct />} />
          <Route path="vouchers" element={<Voucher />} />
          <Route path="address" element={<AddressBook />} />
          <Route path="new-address" element={<NewAddress />} />
          <Route path="default-address" element={<DefaultAddress />} />
          <Route path="newsletter" element={<NewsLetter />} />
          <Route path="close" element={<DeleteAccount />} />
          <Route path="manage" element={<ManageAccount />} />
          <Route path="change-name" element={<ProfileDetails />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="delete-account" element={<DeleteAccount />} />
        </Route>
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
