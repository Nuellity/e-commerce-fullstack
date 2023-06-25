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
import PaymentIcon from "@mui/icons-material/Payment";

import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../../redux/OrderSlice";
import { useNavigate } from "react-router-dom";

function Pay() {
  const { setCurrentStep, userData, setUserData, submitData } =
    useContext(multiStepDetails);
  const [formErrors, setFormErrors] = useState({});
  const [errorState, setErrorState] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, address, city, country, state, postalCode } = userData;
  const billingAddress = {
    address,
    city,
    state,
    country,
    postalCode,
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
      quantity: cart.quantity,
      product: cart.products,
      price: cart.total,
    });
  };

  const handlePay = () => {
    if (userData.paymentMethod === "Credit/Debit Cards") {
      handleClickOpen();
    } else {
      navigate("/paymentsuccess");
    }
  };

  const validate = (data) => {
    const errors = {};
    if (!data.paymentMethod) {
      errors.paymentMethod = "Payment Type is required";
      setError(true);
    }

    return errors;
  };

  const order = {
    userId: user ? user._id : null,
    deliveryName: `${userData.firstName} ${userData.lastName}`,
    email,
    products: cart.products.map((item) => ({
      productId: item._id,
      name: item.title,
      img: item.img[0].original,
      size: item.size,
      price: item.price,
      quantity: item.quantity,
    })),
    amount: cart.total.toFixed(2),
    address: billingAddress,
    paymentMethod: userData.paymentMethod,
  };

  const handleNext = (e) => {
    e.preventDefault();
    setFormErrors(validate(userData));
    setErrorState(true);
    dispatch(addOrder(order));
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

  useEffect(() => {
    if (!user || !user._id) {
      navigate("/login");
    }
  }, [user, navigate]);

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
              name="paymentMethod"
              value={userData.paymentMethod || ""}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Credit/Debit Cards"
                control={<Radio />}
                label="Credit/Debit Cards (Stripe)"
              />
              <FormControlLabel
                value="Pay On Delivery"
                control={<Radio />}
                label="Pay On Delivery"
              />
            </RadioGroup>
            <FormHelperText>{formErrors.paymentMethod}</FormHelperText>
          </FormControl>
        </div>
        <div className="d-flex justify-content-between pt-2">
          <Button onClick={() => setCurrentStep(2)}>BACK</Button>

          <Button
            variant="contained"
            color="success"
            endIcon={<PaymentIcon />}
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
