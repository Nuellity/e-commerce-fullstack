import React from "react";
import { colorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import TopBar from "./pages/Global/TopBar";
import DashBoard from "./pages/Dashboard/DashBoard";
import Bar from "./pages/Bar/Bar";
import Pie from "./pages/Pie/Pie";
import UserList from "./pages/Users/UserList";
import UserInfo from "./pages/Users/UserInfo";
import SingleUser from "./pages/Users/SingleUser";
import NewUser from "./pages/Users/NewUser";
import Menubar from "./pages/Global/Menubar";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import ProductList from "./pages/Product/ProductList";

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
              <Route path="/" element={<DashBoard />} />
              <Route path="pie" element={<Pie />} />
              <Route path="line" element={<UserList />} />
              <Route path="products/:productId" element={<SingleUser />} />
              <Route path="products" element={<ProductList/>} />
              <Route path="newproduct" element={<Bar />} />
              <Route path="newuser" element={<NewUser />} />
              <Route path="users" element={<SingleUser/>} />
              <Route path="users/:userId" element={<NewUser />} />
              <Route path="mail" element={<SingleUser />} />
              <Route path="team" element={<UserInfo />} />
              <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </colorModeContext.Provider>
  );
}

export default App;
