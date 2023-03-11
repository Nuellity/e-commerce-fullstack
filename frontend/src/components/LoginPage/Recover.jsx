/* eslint-disable react-hooks/exhaustive-deps */
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../redux/ApiCalls";
import { loginDetails } from "./LoginDetails";

function Recover() {
  const { setRecover, userData, setUserData, submitData } =
    useContext(loginDetails);
  const [formErrors, setFormErrors] = useState({});
  const [errorState, setErrorState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { forgetError, errorMessage } = useSelector((state) => state.user);
  const isForget = useSelector((state) => state.user.isForget);
  console.log(isForget);
  console.log(isForget, forgetError, errorMessage);
  const dispatch = useDispatch();

  const email = userData.recoverEmail;
  const password = userData.recoverPassword;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validate = (data) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!data.recoverEmail) {
      errors.recoverEmail = "Email is required";
    }
    if (!regex.test(data.recoverEmail)) {
      errors.recoverEmail = "This is not a valid email format";
    }
    if (!data.recoverPassword) {
      errors.recoverpassword = "Password is required";
    }
    if (!data.confirmrRecoverPassword) {
      errors.confirmRecoverPassword = "Password is required";
    } else if (data.confirmRecoverPassword !== data.recoverPassword) {
      errors.confirmRecoverPassword = "Password does not match!";
    }

    return errors;
  };

  function handleSubmit(e) {
    e.preventDefault();
    setFormErrors(validate(userData));
    setErrorState(true);
    forgetPassword(dispatch, { email, password });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && errorState) {
      submitData();
    }
  }, [email, password]);

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="col">
          <TextField
            name="recoverEmail"
            label="Email"
            value={userData.recoverEmail}
            onChange={handleChange}
            helperText={formErrors.recoverEmail}
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
              name="recoverPassword"
              type={showPassword ? "text" : "password"}
              value={userData.recoverPassword}
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
              label="recoverPassword"
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
              name="confirmRecoverPassword"
              type={showPassword ? "text" : "password"}
              value={userData.confirmRecoverPassword}
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
        <div className="col">
          <div className="d-flex justify-content-between pt-3">
            <Button variant="outlined" onClick={() => setRecover(false)}>
              Cancel
            </Button>

            {isForget ? (
              <Button
                type="submit"
                variant="contained"
                disabled={isForget}
                fullWidth
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </Button>
            ) : (
              <Button type="submit" variant="contained">
                Recover
              </Button>
            )}
          </div>
        </div>
      </form>
      {forgetError && (
        <p className="mt-3" style={{ color: "red", fontSize: "15px" }}>
          {errorMessage}
        </p>
      )}
    </>
  );
}

export default Recover;
