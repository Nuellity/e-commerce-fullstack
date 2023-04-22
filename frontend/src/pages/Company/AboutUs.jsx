import { Button, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
function AboutUs() {
  const myTheme = useTheme();

  const isMatch = useMediaQuery(myTheme.breakpoints.down("md"));

  return (
    <>
      <Navbar />
      <div className="about">
        <img
          src="/images/img/back.jpg"
          alt="about"
          className="about-image"
          style={{ width: "100%", height: isMatch ? "25rem" : "45rem" }}
        />
        <div className="about-us-details text-center ">
          <h1 style={{ paddingTop: isMatch ? "0.5em" : "2em" }}>About Us</h1>
          <hr />
          <p
            className="mx-auto pt-3"
            style={{ width: isMatch ? "100%" : "50%" }}
          >
            Welcome to Ayaba. We are a team of enthusiastic developers and
            entrepreneurs who decided to convert their common experience into
            this web store. We hope you’ll like it as much as we do and have a
            great shopping experience here. Our prime goal is to create a shop
            in which you can easily find whatever product you need.
          </p>
        </div>
      </div>

      <div className="row text-center container">
        <div className="core py-4">
          <h2 className="text-uppercase ">Core Values</h2>
          <hr />
        </div>

        <div className="col-md-3 ">
          <div className="about-icon">
            <img
              className="img-fluid "
              src="images/img/about/creative.svg"
              alt=""
            />
          </div>
          <p>Be Adventurous, Creative, and Open-Minded</p>
        </div>
        <div className="col-md-3">
          <div className="about-icon">
            <img
              className="img-fluid "
              src="images/img/about/handshake.svg"
              alt=""
            />
          </div>
          <p>Create Long-Term Relationships with Our Customers</p>
        </div>
        <div className="col-md-3">
          <div className="about-icon">
            <img
              className="img-fluid "
              src="images/img/about/growth.svg"
              alt=""
            />
          </div>
          <p>Pursue Growth and Learning</p>
        </div>
        <div className="col-md-3">
          <div className="about-icon">
            <img
              className="img-fluid "
              src="images/img/about/happy.svg"
              alt=""
            />
          </div>
          <p>Make Sure Our Customers are Pleased</p>
        </div>
      </div>

      <div className="about-banner">
        <div className="container mx-auto about-title">
          <h4>KEEP IN CONTACT WITH US</h4>
          <hr />
          <p className="pt-4">
            We're continually working on our online store and are open to any
            suggestions.
            <br />
            If you have any questions or proposals, please do not hesitate to
            contact us.
          </p>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/products"
          >
            <Button
              variant="contained"
              className="text-uppercase "
              sx={{ marginRight: "10px", backgroundColor: "skyblue" }}
              size="large"
            >
              Start Shopping
            </Button>
          </Link>
          <Button
            variant="outlined"
            className="text-uppercase "
            color="error"
            sx={{ color: "white", border: "1px solid white" }}
            size="large"
          >
            contact us
          </Button>
        </div>
      </div>
      <div className=" text-center partners partner-container py-5">
        <h2 className="text-uppercase">Our Partners</h2>
        <hr />
        <p className="py-4">
          We work with the world's most popular and trusted companies so you can
          enjoy safe shopping and fast delivery.
        </p>
        <div className="row partners py-4 container text-center">
          <div className="col">
            <img src="/images/img/abt/abt1.png" alt="abt-partners" />
          </div>
          <div className="col">
            <img src="/images/img/abt/abt2.png" alt="abt-partners" />
          </div>
          <div className="col">
            <img src="/images/img/abt/abt3.png" alt="abt-partners" />
          </div>
          <div className="col">
            <img src="/images/img/abt/abt4.png" alt="abt-partners" />
          </div>
          <div className="col">
            <img src="/images/img/abt/abt5.png" alt="abt-partners" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AboutUs;
