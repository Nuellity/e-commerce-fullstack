/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
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
import { loginDetails } from "./LoginDetails";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BusinessIcon from "@mui/icons-material/Business";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { googleAuth, signup } from "../../redux/ApiCalls";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../fireBase";

function Register() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.up("md"));
  const { userData, setUserData, submitData, setSignUp } =
    useContext(loginDetails);
  const [formErrors, setFormErrors] = useState({});
  const [errorState, setErrorState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isSignUp, signUpError } = useSelector((state) => state.user);
  const firstName = userData.firstName;
  const lastName = userData.lastName;
  const email = userData.email;
  const password = userData.password;
  const address = userData.address;
  const city = userData.city;
  const state = userData.state;
  const country = userData.country;
  const zipcode = userData.zipcode;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validate = (data) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!data.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!data.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!regex.test(data.email)) {
      errors.email = "This is not a valid email format";
    }
    if (!data.address) {
      errors.address = "Address is required";
    }
    if (!data.city) {
      errors.city = "City is required";
    }
    if (!data.state) {
      errors.state = "State is required";
    }
    if (!data.country) {
      errors.country = "Country is required";
    }
    if (!data.zipcode) {
      errors.zipcode = "Zipcode is required";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    if (!data.confirmPassword) {
      errors.confirmPassword = "Password is required";
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Password does not match!";
    }

    return errors;
  };

  function handleSubmit(e) {
    e.preventDefault();
    setFormErrors(validate(userData));
    setErrorState(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
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
      signup(dispatch, {
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        country,
        zipcode,
        password,
      });
    }
  }, [formErrors]);

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="col">
          <TextField
            name="firstName"
            label="First Name"
            value={userData.firstName}
            onChange={handleChange}
            helperText={formErrors.firstName}
            margin="normal"
            variant="outlined"
            required
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>
        <div className="col ">
          <TextField
            name="lastName"
            label="Last Name"
            value={userData.lastName}
            onChange={handleChange}
            helperText={formErrors.lastName}
            margin="normal"
            variant="outlined"
            required
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>
        <div className="col">
          <TextField
            name="email"
            type="email"
            label="Email"
            value={userData.email}
            onChange={handleChange}
            helperText={formErrors.email}
            margin="normal"
            variant="outlined"
            required
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>
        <div className="col">
          <TextField
            name="address"
            type="text"
            label="Address"
            value={userData.address}
            onChange={handleChange}
            helperText={formErrors.address}
            margin="normal"
            variant="outlined"
            required
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>
        <div className="row">
          <div className="col-lg-6">
            <TextField
              name="city"
              type="text"
              label="City"
              value={userData.city}
              onChange={handleChange}
              helperText={formErrors.city}
              margin="normal"
              variant="outlined"
              required
              color="secondary"
              fullWidth
            />
          </div>
          <div className="col-lg-6">
            <TextField
              name="state"
              type="text"
              label="State"
              value={userData.state}
              onChange={handleChange}
              helperText={formErrors.state}
              margin="normal"
              variant="outlined"
              required
              color="secondary"
              fullWidth
            />
          </div>
          <div className="col-lg-6">
            <TextField
              name="country"
              type="text"
              label="Country"
              value={userData.country}
              onChange={handleChange}
              helperText={formErrors.country}
              margin="normal"
              variant="outlined"
              required
              color="secondary"
              fullWidth
            />
          </div>
          <div className="col-lg-6">
            <TextField
              name="zipcode"
              type="number"
              label="Zipcode"
              value={userData.zipcode}
              onChange={handleChange}
              helperText={formErrors.zipcode}
              margin="normal"
              variant="outlined"
              required
              color="secondary"
              fullWidth
            />
          </div>
        </div>
        <div className="col">
          <FormControl margin="normal" required fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              name="password"
              type={showPassword ? "text" : "password"}
              value={userData.password}
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
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              }
            />
            <FormHelperText>{formErrors.password}</FormHelperText>
          </FormControl>
        </div>
        <div className="col pb-3">
          <FormControl margin="normal" required fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={userData.confirmPassword}
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
              label="Confirm Password"
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              }
            />
            <FormHelperText>{formErrors.confirmPassword}</FormHelperText>
          </FormControl>
        </div>
        <div>
          {isSignUp ? (
            <Button
              type="submit"
              variant="contained"
              disabled={isSignUp}
              fullWidth
            >
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </Button>
          ) : (
            <Button type="submit" variant="contained" fullWidth>
              Create an Account
            </Button>
          )}
          {signUpError && (
            <p className="mt-3" style={{ color: "red", fontSize: "15px" }}>
              Error occured!!! Please try again.
            </p>
          )}
        </div>
        <p
          className="text-center text-capitalize py-4"
          style={{
            cursor: "pointer",
            fontSize: "0.8em",
            display: isMatch ? "none" : "block",
          }}
          onClick={() => setSignUp(false)}
        >
          Log in instead? Click here
        </p>
      </form>

      <div className="py-5 d-flex justify-content-center">
        <Button
          variant="outlined"
          endIcon={<GoogleIcon />}
          onClick={handleGoogle}
          sx={{ borderColor: "red", color: "red" }}
        >
          Sign Up With Google
        </Button>
      </div>
    </>
  );
}

export default Register;
