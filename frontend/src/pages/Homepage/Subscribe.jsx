import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useTheme, useMediaQuery, TextField, Button } from "@mui/material";

function Subscribe() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const myTheme = useTheme();

  const isMatch = useMediaQuery(myTheme.breakpoints.down("sm"));

  const handleSubscribe = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className="container-fluid py-5"
      style={{ background: "rgba(30, 40, 50, 0.05)", width: "100%" }}
    >
      <h3 className="main-header"> Subscribe to Newsletter</h3>
      <form onSubmit={handleSubscribe}>
        <div
          className={` d-flex ${
            isMatch && "flex-column"
          } justify-content-center`}
        >
          <TextField
            label="Name"
            name="name"
            placeholder="Enter your name "
            margin="normal"
            variant="outlined"
            sx={{ padding: "10px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            name="email"
            placeholder="Enter your email"
            margin="normal"
            variant="outlined"
            sx={{ padding: "10px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className=" d-flex align-items-center mt-2 px-2">
            <Button
              type="submit"
              variant="contained"
              style={{
                width: "5.5em",
                height: "4em",
                alignItems: "center",
                backgroundColor: "#1E2832",
                borderRadius: "10px",
              }}
            >
              <SendIcon />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Subscribe;
