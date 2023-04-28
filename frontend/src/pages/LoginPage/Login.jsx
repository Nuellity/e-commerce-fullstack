import React, { useContext } from "react";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import { loginDetails } from "./LoginDetails";

import Recover from "./Recover";
import Register from "./Register";
import SignIn from "./SignIn";

function Login() {
  const { register, setRegister, recover, signUp } = useContext(loginDetails);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.up("md"));

  const handleRegister = () => {
    setRegister(true);
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}>
        <div className="container">
          <div className="row">
            {signUp ? (
              <>
                <div
                  style={{
                    display: isMatch ? "none" : "block",
                  }}
                >
                  <h1 className="text-center py-3" style={{ fontSize: "25px" }}>
                    Register
                  </h1>
                  <Register />
                </div>
              </>
            ) : (
              <div
                className="col-lg-6 login-form"
                style={{
                  display: signUp ? "none" : "block",
                }}
              >
                <div className="text-center p-5">
                  <h1 className="py-3" style={{ fontSize: "25px" }}>
                    Returning Customer
                  </h1>
                  {recover ? (
                    <>
                      <Recover />
                    </>
                  ) : (
                    <>
                      <SignIn />
                    </>
                  )}
                </div>
              </div>
            )}

            <div
              className="col-lg-6"
              style={{ display: isMatch ? "block" : "none" }}
            >
              <div className=" p-5">
                {register ? (
                  <>
                    <h1
                      className="text-center py-3"
                      style={{ fontSize: "25px" }}
                    >
                      Register
                    </h1>
                    <Register />
                  </>
                ) : (
                  <>
                    <h1
                      className="text-center py-3"
                      style={{ fontSize: "25px" }}
                    >
                      New Customer
                    </h1>
                    <p className="text-center">
                      Create an account today and enjoy these benefits:
                    </p>
                    <div className="d-flex justify-content-center">
                      <ul>
                        <li>Easy order tracking</li>
                        <li>Save shipping address</li>
                        <li>Special offers</li>
                        <li>Faster checkout</li>
                      </ul>
                    </div>
                    <div className="text-center pt-4">
                      <Button variant="outlined" onClick={handleRegister}>
                        Create an account
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
