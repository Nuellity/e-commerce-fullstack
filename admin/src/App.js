import React from "react";
import { colorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import TopBar from "./pages/global/TopBar";
import DashBoard from "./pages/dashboard/DashBoard";
import Line from "./pages/Line/Line";
import Bar from "./pages/Bar/Bar";
import Pie from "./pages/Pie/Pie";
import UserList from "./pages/Users/UserList";
import UserInfo from "./pages/Users/UserInfo";
import SingleUser from "./pages/Users/SingleUser";
import NewUser from "./pages/Users/NewUser";
import Menubar from "./pages/global/Menubar";

function App() {
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
              <Route path="line" element={<Line />} />
              <Route path="invoices" element={<Bar />} />
              <Route path="newuser" element={<NewUser />} />
              <Route path="customers" element={<UserInfo />} />
              <Route path="mail" element={<SingleUser />} />
              <Route path="team" element={<UserList />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </colorModeContext.Provider>
  );
}

export default App;
