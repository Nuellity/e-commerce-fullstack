import React from "react";
import { colorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import TopBar from "./pages/global/TopBar";
import DashBoard from "./pages/dashboard/DashBoard";
import Line from "./pages/Line/Line";
import FAQ from "./pages/FAQ";
import Contacts from "./pages/Contacts";
import Form from "./pages/Form";
import Sidebar from "./pages/global/Sidebar";
import Bar from "./pages/Bar/Bar";
import Pie from "./pages/Pie/Pie";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <colorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <Sidebar/>
          <main className="content">
            <TopBar />
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="pie" element={<Pie/>} />
              <Route path="line" element={<Line />} />
              <Route path="invoices" element={<Bar/>} />
              <Route path="FAQ" element={<FAQ />} />
              <Route path="contact" element={<Contacts />} />
              <Route path="form" element={<Form />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </colorModeContext.Provider>
  );
}

export default App;
