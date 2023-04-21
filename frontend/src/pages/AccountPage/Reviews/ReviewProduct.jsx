import React from "react";
import { Button, IconButton, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "../account.css";
import { RateCard } from "../../../components/Cards/ProductCard/ProductCard";

function ReviewProduct() {
  const navigate = useNavigate();
  return (
    <div className="card main-card">
      <p className="card-header header">
        <IconButton onClick={() => navigate("/profile/reviews")}>
          <ArrowBackIcon />
        </IconButton>
        Rate & Review
      </p>
      <div className="container">
        <p className="review-title">SELECT THE STARS TO RATE THE PRODUCT</p>
        <hr />
        <div className="container">
          <RateCard />
        </div>
        <p className="review-title">LEAVE A REVIEW</p>
        <hr />
        <div>
          <div className="row">
            <div className="col-md-6">
              <TextField
                fullWidth
                margin="normal"
                label="Review Title"
                variant="outlined"
              />
            </div>
            <div className="col-md-6">
              <TextField
                fullWidth
                margin="normal"
                label="Your name"
                variant="outlined"
              />
            </div>
            <div className="col-md-12">
              <TextField
                multiline
                rows={8}
                fullWidth
                margin="normal"
                label="Detailed Review"
                placeholder="Tell us more about your rating!"
                variant="outlined"
              />
            </div>
            <div className="col-md-12">
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  fontSize: "1.1em",
                  backgroundColor: "skyblue",
                  "&:hover": {
                    backgroundColor: "#4a90e2",
                  },
                }}
              >
                SUBMIT REVIEW
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewProduct;
