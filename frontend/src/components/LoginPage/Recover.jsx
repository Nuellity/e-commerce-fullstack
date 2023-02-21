/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { loginDetails } from "./LoginDetails";

function Recover() {
  const { setRecover, userData, setUserData, submitData } =
    useContext(loginDetails);
  const [formErrors, setFormErrors] = useState({});
  const [errorState, setErrorState] = useState(false);

  const validate = (data) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!data.recoverEmail) {
      errors.recoverEmail = "Email is required";
    } else if (!regex.test(data.recoverEmail)) {
      errors.recoverEmail = "This is not a valid email format";
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
    }
  }, [formErrors]);

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
          <div className="d-flex justify-content-between pt-3">
            <Button variant="outlined" onClick={() => setRecover(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Recover
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Recover;
