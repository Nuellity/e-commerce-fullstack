import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { SocialCard } from "../../components/Cards/ProductCard/ProductCard";

function Subscribe() {
  return (
    <>
      <div
        className="container-fluid"
        style={{ background: "rgba(30, 40, 50, 0.05)", width: "100%" }}
      >
        <div>
          <h3 className="sub-title pb-5">
            follow products and discounts on instagram
          </h3>
        </div>
        <div className="container">
          <div className="row g-3">
            <SocialCard />
            <SocialCard />
            <SocialCard />
            <SocialCard />
            <SocialCard />
            <SocialCard />
          </div>
        </div>
        <div>
          <h3 className="sub-title pt-5 pb-3">or subscribe to newsletter</h3>
        </div>
        <div className="pb-5">
          <div className="col-lg-8  mx-auto">
            <div className="d-flex justify-content-between align-items-center">
              <TextField
                label="Email Address"
                placeholder="enter your email address here"
                variant="standard"
                fullWidth
              />
              <Button
                variant="outlined"
                size="large"
                sx={{
                  height: "100%",
                  marginLeft: "40px",
                  color: "black",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "1px solid black",
                }}
              >
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscribe;
