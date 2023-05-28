import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Subscribe() {
  return (
    <div
      className="container-fluid py-5"
      style={{ background: "rgba(30, 40, 50, 0.05)", width: "100%" }}
    >
      <div>
        <h3 className="main-header "> subscribe to newsletter</h3>
      </div>

      <div className="col-lg-8  mx-auto">
        <div className="mx-auto">
          <div className="row">
            <div className="col-md-6">
              <TextField
                label="Email Address"
                placeholder="enter your email address here"
                variant="standard"
                margin="normal"
                fullWidth
              />
            </div>
            <div className="col-md-6 my-auto">
              <Button
                color="primary"
                variant="contained"
                style={{
                  width: "12em",
                  height: "3em",
                  alignItems: "center",
                  backgroundColor: "#1E2832",
                }}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
