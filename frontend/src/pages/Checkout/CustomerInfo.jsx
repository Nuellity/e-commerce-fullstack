/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { multiStepDetails } from "./StepDetails";

function CustomerInfo() {
  const { setCurrentStep, userData, setUserData } =
    useContext(multiStepDetails);
  const [formErrors, setFormErrors] = useState({});
  const [errorState, setErrorState] = useState(false);

  const validate = (data) => {
    const errors = {};
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

    return errors;
  };

  function handleNext(e) {
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
      setCurrentStep(2);
    }
  }, [formErrors]);

  return (
    <form autoComplete="off" onSubmit={handleNext}>
      <div className="row">
        <div className="col-lg-6">
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
        <div className="col-lg-6">
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
            type="email"
            name="email"
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
        <div className="d-flex justify-content-end">
          <Button type="submit" variant="contained">
            NEXT
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CustomerInfo;
