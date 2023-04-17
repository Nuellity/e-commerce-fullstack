import {
  AppBar,
  Avatar,
  Badge,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext } from "react";
import { useTheme, styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Person2Icon from "@mui/icons-material/Person2";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomerInfo from "./CustomerInfo";
import Pay from "./Pay";
import ShippingInfo from "./ShippingInfo";
import { multiStepDetails } from "./StepDetails";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const navItems = ["images/img/mc_afee.svg", "images/img/google.svg"];
const StepTitle = [
  "Customer information",
  "Shipping Information",
  "Payment Method",
];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(to bottom, #0081c9, #1b8dd2, #2d98db, #3ba4e4, #49b0ed, #51b9f2, #5ac1f6, #63cafa, #6ad1fb, #73d8fd, #7cdefe, #86e5ff)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(to bottom, #0081c9, #1b8dd2, #2d98db, #3ba4e4, #49b0ed, #51b9f2, #5ac1f6, #63cafa, #6ad1fb, #73d8fd, #7cdefe, #86e5ff)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient(to bottom, #0081c9, #1b8dd2, #2d98db, #3ba4e4, #49b0ed, #51b9f2, #5ac1f6, #63cafa, #6ad1fb, #73d8fd, #7cdefe, #86e5ff)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient(to bottom, #0081c9, #1b8dd2, #2d98db, #3ba4e4, #49b0ed, #51b9f2, #5ac1f6, #63cafa, #6ad1fb, #73d8fd, #7cdefe, #86e5ff)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <Person2Icon />,
    2: <LocalShippingIcon />,
    3: <PaymentIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

function Checkout() {
  const { currentStep } = useContext(multiStepDetails);
  const cart = useSelector((state) => state.cart);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  function showStep(step) {
    switch (step) {
      case 1:
        return <CustomerInfo />;
      case 2:
        return <ShippingInfo />;
      case 3:
        return <Pay />;
      default:
        return "Unknown step";
    }
  }

  return (
    <>
      <AppBar
        sx={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}
        component="nav"
      >
        <Toolbar>
          <Link style={{ textDecoration: "none" }} to="/">
            <Typography
              sx={{
                fontFamily: "AmstelvarAlpha",
                fontStyle: "normal",
                fontWeight: "400px",
                fontSize: "28px",
                lineHeight: "34px",
                color: "#000000",
              }}
              href="/"
            >
              AYABA
            </Typography>
          </Link>
          <Typography
            className="text-uppercase mx-auto"
            sx={{
              visibility: matches ? "visible" : "hidden",
              ontStyle: "normal",
              fontWeight: "300px",
              fontSize: "25px",
              lineHeight: "24px",
              color: "#000000",
            }}
          >
            secure checkout
          </Typography>

          {navItems.map((item, index) => (
            <Box
              component="img"
              sx={{
                height: "auto",
                width: matches ? "140px" : "40px",
                margin: "0 10px",
              }}
              alt="Your-logo"
              src={item}
              key={index}
            />
          ))}
        </Toolbar>
      </AppBar>
      <div className="container pt-5">
        <div className="row">
          <div className="col-lg-6">
            <div className="pb-3">
              <Box
                className="p-2"
                component="div"
                sx={{
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  width: "100%",
                }}
              >
                <Stepper
                  alternativeLabel
                  activeStep={currentStep - 1}
                  orientation="horizontal"
                  connector={<ColorlibConnector />}
                >
                  {StepTitle.map((title, index) => {
                    return (
                      <Step key={index}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                          {title}
                        </StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                {showStep(currentStep)}
              </Box>
            </div>
            <div className="row  pb-5">
              <div className="col">
                <img
                  className="img-fluid"
                  src="images/img/payment/f1.png"
                  alt="payment-trust"
                />
              </div>
              <div className="col">
                <img
                  className="img-fluid"
                  src="images/img/payment/f2.png"
                  alt="payment-trust"
                />
              </div>
              <div className="col">
                <img
                  className="img-fluid"
                  src="images/img/payment/f3.png"
                  alt="payment-trust"
                />
              </div>
              <div className="col">
                <img
                  className="img-fluid"
                  src="images/img/payment/f4.png"
                  alt="payment-trust"
                />
              </div>
              <div className="col">
                <img
                  className="img-fluid"
                  src="images/img/payment/f5.png"
                  alt="payment-trust"
                />
              </div>
              <div className="col">
                <img
                  className="img-fluid"
                  src="images/img/payment/f6.png"
                  alt="payment-trust"
                />
              </div>
            </div>

            <Box
              className="checkout-trust p-3"
              component="div"
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: "100%",
              }}
            >
              <h4 style={{ fontSize: "20px", color: "violet" }}>
                The Safe, Fun, Fast Way to Buy Your Favorite Merch!
              </h4>
              <p style={{ fontSize: "15px" }}>
                We share your enthusiasm for all things awesome, while offering
                fast, award-winning service, fast shipping to US and a secure
                (but fun!) shopping experience. For help, contact our support
                team.
              </p>
              <img
                className="img-fluid"
                src="images/img/trust.png"
                alt="trust-img"
              />
            </Box>
          </div>
          <div className="col-lg-5 ">
            <Box
              className="p-3"
              component="div"
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: "100%",
              }}
            >
              <div className="pb-5">
                {cart.products.map((value, index) => {
                  return (
                    <ListItem
                      className="pb-4"
                      alignItems="flex-start"
                      secondaryAction={
                        <span className="d-flex flex-column">
                          {!value.size.length ? (
                            ""
                          ) : (
                            <Typography
                              variant="span"
                              sx={{ padding: "5px 0" }}
                            >
                              SIZE: {value.size}
                            </Typography>
                          )}
                          <Typography sx={{ fontSize: "25px" }}>
                            ${(value.price * value.quantity).toFixed(2)}
                          </Typography>
                        </span>
                      }
                      sx={{ width: "100%" }}
                      key={index}
                    >
                      <ListItemAvatar>
                        <Badge badgeContent={value.quantity} color="secondary">
                          <Avatar>
                            <img
                              alt={value.title}
                              src={value.img[0].original}
                              style={{ height: "100px", width: "100px" }}
                            />
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>

                      <ListItemText primary={value.title} />
                    </ListItem>
                  );
                })}
              </div>

              <div className="pt-5">
                <TextField
                  label="Coupon Code"
                  variant="outlined"
                  sx={{ paddingRight: "20px", width: "70%" }}
                />
                <Button
                  variant="contained"
                  sx={{ height: "55px", width: "100px" }}
                  color="secondary"
                >
                  APPLY
                </Button>
                <hr className="mt-5" />
                <div className="d-flex justify-content-between">
                  <p>Subtotal</p>
                  <p>${cart.total.toFixed(2)}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Shipping Fee</p>
                  <p>FREE</p>
                </div>
                <div className="d-flex justify-content-between">
                  <h6>You Pay</h6>
                  <h3>${cart.total.toFixed(2)}</h3>
                </div>
                <hr />
                <div>
                  <div className="row mb-2">
                    <div className="col-3">
                      <img
                        src="images/img/payment/g1.png"
                        className="img-fluid"
                        alt="guarantee"
                      />
                    </div>
                    <div className="col-9">
                      <h5 style={{ fontSize: "15px" }}>
                        <strong>100% Satisfaction Guarantee</strong>
                      </h5>
                      <p style={{ fontSize: "15px" }}>
                        If you are not 100% satisfied with your purchase, we
                        will make it right! No questions asked!
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <img
                        src="images/img/payment/g2.png"
                        className="img-fluid"
                        alt="guarantee"
                      />
                    </div>
                    <div className="col-9">
                      <h4 style={{ fontSize: "15px" }}>
                        <strong>
                          Over 400,000 Successfully Shipped Orders
                        </strong>
                      </h4>
                      <p style={{ fontSize: "15px" }}>
                        We make customers happy with every order we ship. You
                        simply have to join our family.
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <a href="/return">Return Policy</a>
                    <a href="/shipping">Shipping Policy</a>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
