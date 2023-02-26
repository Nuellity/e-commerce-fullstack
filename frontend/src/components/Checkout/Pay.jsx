/* eslint-disable react-hooks/exhaustive-deps */
import { Button, FormHelperText } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { multiStepDetails } from "./StepDetails";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stripe from "./Stripe/Stripe";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

function Pay() {
  const { setCurrentStep, userData, setUserData, submitData} =
    useContext(multiStepDetails);
  const [formErrors, setFormErrors] = useState({});
  const [errorState, setErrorState] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePay = () => {
    if (userData.paymentType === "Credit/Debit Cards") {
      handleClickOpen();
    } else {
      console.log("bad pay");
    }
  };

  const validate = (data) => {
    const errors = {};
    if (!data.paymentType) {
      errors.paymentType = "Payment Type is required";
      setError(true);
    }

    return errors;
  };

  const handleNext = (e) => {
    e.preventDefault();
    setFormErrors(validate(userData));
    setErrorState(true);
    handlePay();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && errorState) {
      submitData();
    }
  }, [formErrors, errorState]);

  return (
    <div className="row">
      <div className="py-4">
        <div className="delivery d-flex justify-content-between p-2">
          <div className="contact">
            <strong>
              Contact <br /> Information{" "}
            </strong>
          </div>
          <div className="contact-info text-left">
            {userData.firstName + " " + userData.lastName} <br />{" "}
            {userData["email"]}
          </div>
          <div className="edit" onClick={() => setCurrentStep(1)}>
            <p>Change</p>{" "}
          </div>
        </div>
        <div className="delivery d-flex justify-content-between p-2">
          <div className="contact">
            <strong> Delivery address </strong>
          </div>
          <div className="contact-info text-left">
            {userData.address}, {userData.city},<br /> {userData.state},{" "}
            {userData.country}, {userData.postalCode}
          </div>
          <div className="edit" onClick={() => setCurrentStep(2)}>
            <p>Change</p>{" "}
          </div>
        </div>
      </div>
      <form autoComplete="off" onSubmit={handleNext}>
        <div className="py-2">
          <FormControl error={error}>
            <FormLabel
              id="demo-controlled-radio-buttons-group"
              sx={{ color: "black" }}
            >
              <strong>Payment Method: </strong>{" "}
            </FormLabel>

            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="paymentType"
              value={userData.paymentType || ""}
              onChange={handleChange}
              defaultValue="Paypal Express Checkout"
            >
              <FormControlLabel
                value="Paypal Express Checkout"
                control={<Radio />}
                label="Paypal Express Checkout"
              />
              <FormControlLabel
                value="Credit/Debit Cards"
                control={<Radio />}
                label="Credit/Debit Cards (Stripe)"
              />
              <FormControlLabel
                value="Bitcoin"
                control={<Radio />}
                label="Bitcoin"
              />
            </RadioGroup>
            <FormHelperText>{formErrors.paymentType}</FormHelperText>
          </FormControl>
        </div>
        <div className="d-flex justify-content-between pt-2">
          <Button onClick={() => setCurrentStep(2)}>BACK</Button>

          <Button
            variant="contained"
            color="success"
            sx={{ height: "50px" }}
            type="submit"
          >
            COMPLETE ORDER
          </Button>
        </div>
      </form>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Pay with Stripe"}</DialogTitle>
        <DialogContent>
          <Stripe />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Pay;
