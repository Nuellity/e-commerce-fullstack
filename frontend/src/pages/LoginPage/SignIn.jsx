/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { loginDetails } from "./LoginDetails";
import LoginIcon from "@mui/icons-material/Login";
import { login } from "../../redux/ApiCalls";
import { useDispatch, useSelector } from "react-redux";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

function SignIn() {
  const { setRecover, userData, setUserData, setSignUp, submitData } =
    useContext(loginDetails);
  const [formErrors, setFormErrors] = useState({});
  const [errorState, setErrorState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isFetching, error, errorMessage } = useSelector(
    (state) => state.user
  );

  const email = userData.loginEmail;
  const password = userData.loginPassword;

  const validate = (data) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!data.loginEmail) {
      errors.loginEmail = "Email is required";
    } else if (!regex.test(data.loginEmail)) {
      errors.loginEmail = "This is not a valid email format";
    }
    if (!data.loginPassword) {
      errors.loginPassword = "Password is required";
    }

    return errors;
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleSubmit(e) {
    e.preventDefault();
    setFormErrors(validate(userData));
    setErrorState(true);
    login(dispatch, { email, password });
  }

  const handleClick = () => {
    setRecover(true);
  };

  const handleSignUp = () => {
    setSignUp(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && errorState) {
      submitData();
    }
  }, [formErrors]);

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="col">
          <TextField
            name="loginEmail"
            type="email"
            label="Email"
            value={userData.loginEmail}
            onChange={handleChange}
            helperText={formErrors.loginEmail}
            margin="normal"
            variant="outlined"
            required
            color="secondary"
            fullWidth
          />
        </div>
        <div className="col">
          <FormControl margin="normal" required fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              name="loginPassword"
              type={showPassword ? "text" : "password"}
              value={userData.loginPassword}
              onChange={handleChange}
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
            <FormHelperText>{formErrors.password}</FormHelperText>
          </FormControl>
        </div>
        <div className="d-flex justify-content-end pb-2">
          <h6 onClick={handleClick} style={{ fontSize: "13px" }}>
            Forgot password?
          </h6>
        </div>
        <div>
          {isFetching ? (
            <Button
              type="submit"
              variant="contained"
              disabled={isFetching}
              fullWidth
            >
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              endIcon={<LoginIcon fontSize="small" />}
            >
              Log In
            </Button>
          )}

          <p
            onClick={handleSignUp}
            className="text-center py-3"
            style={{ cursor: "pointer", fontSize: "13px" }}
          >
            Create A New Account? Click Here!
          </p>
        </div>
      </form>
      {error && (
        <p className="mt-3" style={{ color: "red", fontSize: "15px" }}>
          {errorMessage}
        </p>
      )}
    </>
  );
}

export default SignIn;
