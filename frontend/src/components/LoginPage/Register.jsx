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
} from "@mui/material";

import { loginDetails } from "./LoginDetails";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/ApiCalls";

function Register() {
  const { setRegister, userData, setUserData, submitData } =
    useContext(loginDetails);
  const [formErrors, setFormErrors] = useState({});
  const [errorState, setErrorState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isSignUp, signUpError } = useSelector(
    (state) => state.user
  );
  const firstName = userData.firstName;
  const lastName = userData.lastName;
  const email = userData.email;
  const password = userData.password
  

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

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && errorState) {
      submitData();
      signup(dispatch, { firstName, lastName, email, password })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            fullWidth
          />
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
            />
            <FormHelperText>{formErrors.confirmPassword}</FormHelperText>
          </FormControl>
        </div>
        <div>
        {
          isSignUp ? ( <Button
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
          </Button>) : ( <Button type="submit" variant="contained" fullWidth>
            Create an Account
          </Button>)
        }
        {signUpError && (
        <p className="mt-3" style={{ color: "red", fontSize: "15px" }}>
          Error occured!!! Please try again.
        </p>
      )}
          
          <p
            onClick={() => setRegister(false)}
            className="text-center py-3"
            style={{ cursor: "pointer", fontSize: "13px" }}
          >
            Already have an account? Click here!
          </p>
        </div>
      </form>
    </>
  );
}

export default Register;
