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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { loginDetails } from "./LoginDetails";
import LoginIcon from "@mui/icons-material/Login";
import { googleAuth, login } from "../../redux/ApiCalls";
import { useDispatch, useSelector } from "react-redux";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import { auth, provider } from "../../fireBase";
import { signInWithPopup } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";

function SignIn() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.up("md"));
  const { setRecover, userData, setUserData, setSignUp, submitData } =
    useContext(loginDetails);
  const [formErrors, setFormErrors] = useState({});
  const [errorState, setErrorState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isFetching, error, errorMessage } = useSelector(
    (state) => state.user
  );

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

  const handleClick = () => {
    setRecover(true);
  };

  const handleSignUp = () => {
    setSignUp(true);
  };

  function handleSubmit(e) {
    const email = userData.loginEmail;
    const password = userData.loginPassword;
    e.preventDefault();
    setFormErrors(validate(userData));
    setErrorState(true);
    login(dispatch, { email, password });
  }

  const handleGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      await googleAuth(dispatch, {
        email: data.user.email,
        googleId: data.user.uid,
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && errorState) {
      submitData();
    }
  }, [submitData]);

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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
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
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
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
            <Button type="submit" variant="contained" fullWidth>
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
            style={{
              cursor: "pointer",
              fontSize: "0.8em",
              display: isMatch ? "none" : "block",
            }}
          >
            Create A New Account? Click Here!
          </p>
        </div>
      </form>
      <div className="py-5">
        <Button
          variant="outlined"
          endIcon={<GoogleIcon />}
          onClick={handleGoogle}
          sx={{ borderColor: "red", color: "red" }}
        >
          Sign In With Google
        </Button>
      </div>
      {error && (
        <p className="mt-3" style={{ color: "red", fontSize: "15px" }}>
          {errorMessage}
        </p>
      )}
    </>
  );
}

export default SignIn;
