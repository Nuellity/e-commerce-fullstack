import React from "react";
import { colorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import TopBar from "./pages/global/TopBar";
import DashBoard from "./pages/dashboard/DashBoard";
import Team from "./pages/Team";
import Line from "./pages/Line";
import Invoices from "./pages/Invoices";
import FAQ from "./pages/FAQ";
import Contacts from "./pages/Contacts";
import Form from "./pages/Form";
import Sidebar from "./pages/global/Sidebar";

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
              <Route path="team" element={<Team />} />
              <Route path="line" element={<Line />} />
              <Route path="invoices" element={<Invoices />} />
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
