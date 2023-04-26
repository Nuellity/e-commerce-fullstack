import React from "react";
import { Button } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";

function MainImage() {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}
    >
      <div className="row">
        <div className="col-lg-6">
          <div className="py-5 main-title">
            <h1
              className="animate__animated animate__lightSpeedInLeft"
              style={{ animationDelay: "1s" }}
            >
              Collections
            </h1>
            <p
              className="animate__animated animate__lightSpeedInRight"
              style={{ animationDelay: "2s" }}
            >
              you can explore and shop different collections from various brands
              here
            </p>
            <Button
              color="primary"
              onClick={() => navigate("/products")}
              variant="contained"
              className="animate__animated animate__fadeInUp"
              style={{
                animationDelay: "3s",
                width: "14em",
                height: "4.5em",
                backgroundColor: "#1E2832",
              }}
              startIcon={<ShoppingBagIcon />}
            >
              Shop Now
            </Button>
          </div>
        </div>
        <div className="col-lg-6 px-lg-5">
          <img
            className=" title-img"
            src="https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
            alt="advert"
          />
          <div className="img-line"></div>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
