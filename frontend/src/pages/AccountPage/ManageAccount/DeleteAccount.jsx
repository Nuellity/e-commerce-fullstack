import React, { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

function DeleteAccount() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="card main-card">
      <p className="card-header header">Delete Account</p>
      <div className="container">
        <p className="card-title mx-auto" style={{ textAlign: "center" }}>
          We hate to see you go.
        </p>
        <p
          className="card-text mx-auto"
          style={{ textAlign: "center", width: "80%" }}
        >
          Before you delete your account, we would want you to know that this
          action will delete your data across all Ayaba platforms. If that's
          what you want, please proceed with entering your password to confirm
          that it's you.
        </p>
        <div className="row">
          <div className="col-lg-12">
            <TextField
              fullWidth
              margin="normal"
              value="test@gmail.com"
              type="email"
              variant="filled"
            />
          </div>
          <div className="col-lg-12">
            <FormControl margin="normal" required fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                name="Password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <div className="col-lg-12 pt-2">
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
              DELETE ACCOUNT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccount;
