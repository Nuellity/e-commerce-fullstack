import {
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
  Typography,
  Box,
  Fab,
  Fade,
  useScrollTrigger,
  List,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Person2Icon from "@mui/icons-material/Person2";
import CustomerInfo from "./CustomerInfo";
import Pay from "./Pay";
import ShippingInfo from "./ShippingInfo";
import { multiStepDetails } from "./StepDetails";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

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
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#ccc",
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
  const [isVisible, setIsVisible] = useState(false);
  const { currentStep } = useContext(multiStepDetails);
  const cart = useSelector((state) => state.cart);
  const myTheme = useTheme();

  const isMatch = useMediaQuery(myTheme.breakpoints.down("md"));

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

  const handleAccount = () => setIsVisible(!isVisible);

  return (
    <>
      <Navbar />
      <div sx={{ padding: 0, margin: 0 }} id="back-to-top-anchor" />
      <div style={{ backgroundColor: "rgba(30, 40, 50, 0.05)", padding: " 0" }}>
        <div className={isMatch ? `container` : `container py-3`}>
          <div style={{ display: isMatch ? "block" : "none" }}>
            <List>
              <div className="d-flex justify-content-between pt-2">
                <div style={{ color: "skyblue" }}>
                  <div onClick={handleAccount}>
                    {isVisible ? (
                      <>
                        <ShoppingCartOutlinedIcon />{" "}
                        <span>Hide Order Summary</span>
                        <ExpandLess />{" "}
                      </>
                    ) : (
                      <>
                        <ShoppingCartOutlinedIcon />{" "}
                        <span>Show Order Summary</span>
                        <ExpandMore />
                      </>
                    )}
                  </div>
                </div>
                <div className="my-auto">
                  {" "}
                  <h5>${cart.total.toFixed(2)}</h5>
                </div>
              </div>
              <hr />
              <div style={{ display: isVisible ? "block" : "none" }}>
                {cart.products.map((value, index) => {
                  return (
                    <ListItem
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
                          <Typography sx={{ fontSize: "1.2em" }}>
                            ${(value.price * value.quantity).toFixed(2)}
                          </Typography>
                        </span>
                      }
                      sx={{ width: "100%" }}
                      key={index}
                    >
                      <ListItemAvatar>
                        <Badge badgeContent={value.quantity} color="secondary">
                          <Avatar
                            src={value.img[0].original}
                            alt={value.title}
                            sx={{ width: 40, height: 40 }}
                          />
                        </Badge>
                      </ListItemAvatar>

                      <ListItemText
                        sx={{
                          fontSize: "1em",
                          margin: "auto 1em",
                          "& .MuiListItemText-primary": { fontSize: "1em" },
                        }}
                        primary={value.title}
                      />
                    </ListItem>
                  );
                })}
                <hr />
                <div className="">
                  <TextField
                    label="Coupon Code"
                    variant="outlined"
                    style={{
                      paddingRight: "20px",
                      width: "3eem",
                      height: "1em",
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{ height: "3.5em", width: "7em" }}
                    color="secondary"
                  >
                    APPLY
                  </Button>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p>Subtotal</p>
                  <p style={{ fontSize: "1em" }}>${cart.total.toFixed(2)}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Shipping Fee</p>
                  <p>FREE</p>
                </div>
                <div className="d-flex justify-content-between">
                  <h6>You Pay</h6>
                  <h5>${cart.total.toFixed(2)}</h5>
                </div>
                <hr />
              </div>
            </List>
          </div>
          <img
            className="img-fluid pb-4"
            src="images/img/trust.png"
            alt="trust-img"
            style={{ display: isMatch ? "block" : "none" }}
          />
          <p
            className="text-center py-4 main-header"
            style={{ display: isMatch ? "none" : "block" }}
          >
            CHECKOUT
          </p>
          <div className="row g-4">
            <div className="col-lg-6 h-100">
              <div className="">
                <Box
                  className="p-2"
                  component="div"
                  sx={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    width: "100%",
                    borderRadius: "0.5em",
                    backgroundColor: "white",
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
              <div className="row py-5">
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
                className=" p-3 "
                component="div"
                sx={{
                  width: "100%",
                  border: "1px solid #E5E5E5",
                  display: isMatch ? "none" : "block",
                }}
              >
                <h4 style={{ fontSize: "20px", color: "violet" }}>
                  The Safe, Fun, Fast Way to Buy Your Favorite Merch!
                </h4>
                <p style={{ fontSize: "15px" }}>
                  We share your enthusiasm for all things awesome, while
                  offering fast, award-winning service, fast shipping to US and
                  a secure (but fun!) shopping experience. For help, contact our
                  support team.
                </p>
                <img
                  className="img-fluid"
                  src="images/img/trust.png"
                  alt="trust-img"
                />
              </Box>
            </div>
            <div className="col-lg-6 h-100">
              <Box
                className="p-3"
                component="div"
                sx={{
                  width: "100%",
                }}
              >
                <div
                  className="pb-5"
                  style={{ display: isMatch ? "none" : "block" }}
                >
                  {cart.products.map((value, index) => {
                    return (
                      <ListItem
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
                            <Typography
                              sx={{ fontSize: "1.9em", fontWeight: 400 }}
                            >
                              ${(value.price * value.quantity).toFixed(2)}
                            </Typography>
                          </span>
                        }
                        sx={{ width: "100%" }}
                        key={index}
                      >
                        <ListItemAvatar>
                          <Badge
                            badgeContent={value.quantity}
                            color="secondary"
                          >
                            <Avatar
                              src={value.img[0].original}
                              alt={value.title}
                              sx={{ width: 60, height: 60 }}
                            />
                          </Badge>
                        </ListItemAvatar>

                        <ListItemText
                          sx={{
                            fontSize: "1.1em",
                            margin: "auto 1em",
                            "& .MuiListItemText-primary": { fontSize: "1.1em" },
                          }}
                          primary={value.title}
                        />
                      </ListItem>
                    );
                  })}
                </div>

                <div className="pt-5">
                  <div style={{ display: isMatch ? "none" : "block" }}>
                    <TextField
                      label="Coupon Code"
                      variant="outlined"
                      sx={{ paddingRight: "20px", width: "70%" }}
                    />
                    <Button
                      variant="contained"
                      sx={{ height: "3.5em", width: "9em" }}
                      color="secondary"
                    >
                      APPLY
                    </Button>

                    <hr className="mt-5" />
                    <div className="d-flex justify-content-between">
                      <p>Subtotal</p>
                      <p style={{ fontSize: "1.4em" }}>
                        ${cart.total.toFixed(2)}
                      </p>
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
                  </div>

                  <div>
                    <h4 className="py-2">Why Buy From Us?</h4>
                    <div className="row mb-2">
                      <div className="col-3">
                        <img
                          src="images/img/payment/g1.png"
                          alt="guarantee"
                          style={{
                            width: isMatch ? "5em" : "7rem",
                            height: isMatch ? "5em" : "7rem",
                          }}
                        />
                      </div>
                      <div className="col-9 my-auto">
                        <h5 style={{ fontSize: "0.9em" }}>
                          <strong>100% Satisfaction Guarantee</strong>
                        </h5>
                        <p style={{ fontSize: "0.9em" }}>
                          If you are not 100% satisfied with your purchase, we
                          will make it right! No questions asked!
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3 ">
                        <img
                          src="images/img/payment/g2.png"
                          alt="guarantee"
                          style={{
                            width: isMatch ? "5em" : "7rem",
                            height: isMatch ? "5em" : "7rem",
                          }}
                        />
                      </div>
                      <div className="col-9 my-auto">
                        <h4 style={{ fontSize: "0.9em" }}>
                          <strong>
                            Over 400,000 Successfully Shipped Orders
                          </strong>
                        </h4>
                        <p style={{ fontSize: "0.9em" }}>
                          We make customers happy with every order we ship. You
                          simply have to join our family.
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Link to="/return" style={{ textDecoration: "none" }}>
                        Return Policy
                      </Link>
                      <Link to="/shipping" style={{ textDecoration: "none" }}>
                        Shipping Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollTop>
        <Fab size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon sx={{ fontSize: 40 }} />
        </Fab>
      </ScrollTop>
    </>
  );
}

export default Checkout;
