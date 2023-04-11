import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ShopIcon from "@mui/icons-material/Shop";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#212121",
    },
  },
});

function TopCarousel() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <div>
        <section>
          <div className="mx-5 main-text">
            <h1>Collections</h1>
            <p>
              you can explore ans shop many differnt collection from various
              barands here.
            </p>
            <Button
              color="primary"
              onClick={() => navigate("/products")}
              variant="contained"
              className="animate__animated animate__fadeInUp"
              style={{ animationDelay: "3s" }}
              startIcon={<ShopIcon />}
            >
              Shop Now
            </Button>
          </div>
        </section>
        <div className="image-container">
          <div
            className="image"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80)",
              position: "absolute",
              width: "442px",
              height: "562px",
              left: "55%",
              top: "50%",
              zIndex: -1,
              transform: "translate(-50%, -50%)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default TopCarousel;
