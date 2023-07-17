import React from "react";
import Login from "./Login";
import LoginDetails from "./LoginDetails";
import ScrollToTop from "../../ScrollToTop";

function Log() {
  return (
    <>
      <ScrollToTop />
      <LoginDetails>
        <Login />
      </LoginDetails>
    </>
  );
}

export default Log;
