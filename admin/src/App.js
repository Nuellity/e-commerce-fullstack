import React from "react";
import { colorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import TopBar from "./pages/Global/TopBar";
import DashBoard from "./pages/Dashboard/DashBoard";
import Pie from "./pages/Pie/Pie";
import UserList from "./pages/Users/UserList";
import UserInfo from "./pages/Users/UserInfo";
import SingleUser from "./pages/Users/SingleUser";
import ReviewList from "./pages/Reviews/ReviewList";
import Menubar from "./pages/Global/Menubar";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import ProductList from "./pages/Product/ProductList";
import SingleProduct from "./pages/Product/SingleProduct";
import NewProduct from "./pages/Product/NewProduct";
import NoMatch from "./NoMatch";
import Orders from "./pages/Transaction/OrderList";
import SingleOrder from "./pages/Transaction/SingleOrder";
import SingleReview from "./pages/Reviews/SingleReview";
import NewReview from "./pages/Reviews/NewReview";
import NewUser from "./pages/Users/NewUser";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const [theme, colorMode] = useMode();
  return (
    <colorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Menubar />
          <main className="content">
            <TopBar />
            <Routes>
              <Route path="/" element={user ? <DashBoard /> : <Login />} />
              <Route path="pie" element={<Pie />} />
              <Route path="line" element={<UserInfo />} />
              <Route
                path="products/:productId"
                element={user ? <SingleProduct /> : <Login />}
              />
              <Route
                path="products"
                element={user ? <ProductList /> : <Login />}
              />
              <Route
                path="newproduct"
                element={user ? <NewProduct /> : <Login />}
              />
              <Route
                path="transactions"
                element={user ? <Orders /> : <Login />}
              />
              <Route
                path="transactions/:transactionId"
                element={user ? <SingleOrder /> : <Login />}
              />
              <Route path="users" element={user ? <UserList /> : <Login />} />
              <Route path="newuser" element={user ? <NewUser /> : <Login />} />
              <Route
                path="users/:userId"
                element={user ? <SingleUser /> : <Login />}
              />
              <Route path="mail" element={<Pie />} />
              <Route
                path="reviews"
                element={user ? <ReviewList /> : <Login />}
              />
              <Route
                path="reviews/:reviewId"
                element={user ? <SingleReview /> : <Login />}
              />
              <Route
                path="newreview"
                element={user ? <NewReview /> : <Login />}
              />
              <Route path="*" element={<NoMatch />} />
              <Route
                path="login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </colorModeContext.Provider>
  );
}

export default App;
