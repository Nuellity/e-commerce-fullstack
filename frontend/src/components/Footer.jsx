import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <div className="container" style={{ position: "relative" }}>
        <div className="row">
          <div className=" col-md-3 mb-3">
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              <h3 className="footer-name  mb-4">AYABA</h3>
            </Link>
            <p className="footer-info">
              Discover the Latest Tech Marvels: Explore and Shop Cutting-Edge
              Devices from Leading Brands
            </p>
            <div>
              <FacebookIcon sx={{ margin: "10px" }} />
              <TwitterIcon sx={{ margin: "10px" }} />
              <InstagramIcon sx={{ margin: "10px" }} />
              <YouTubeIcon sx={{ margin: "10px" }} />
            </div>
          </div>
          <div className="footer-items col-md-3 mb-4">
            <h6 className="footer-list mb-4">CATALOG</h6>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/products/Gaming Chairs"
            >
              <p>Gaming Chairs</p>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/products/Audio"
            >
              <p>Speakers & Headphones</p>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/products/All Flat-Screen TVs"
            >
              <p>All Flat-Screen TVs</p>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/products/Laptops"
            >
              <p>Laptops</p>
            </Link>
          </div>
          <div className="footer-items col-md-3 mb-4">
            <h6 className="footer-list mb-4">ABOUT US</h6>

            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/privacy"
            >
              <p>privacy policy</p>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/terms"
            >
              <p>terms and conditions</p>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/blog"
            >
              <p>blog</p>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/about"
            >
              <p style={{ textTransform: "capitalize" }}>about us</p>
            </Link>
          </div>
          <div className="footer-items col-md-3 mb-4">
            <h6 className="footer-list mb-4">CUSTOMER SERVICES</h6>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/payment"
            >
              <p>payment methods</p>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/shipping"
            >
              <p>shipping & delivery</p>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/return"
            >
              <p>returns policy</p>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/faq"
            >
              <p>frequently asked questions</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="bottom-container w-100" style={{ position: "absolute" }}>
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col-md-4">
              <p>© Ayaba {year}</p>
            </div>
            <div className="col-md-4 bottom-pay ">
              <img
                src="/images/img/payment/f1.png"
                className="m-1"
                alt="pay-cert"
              />
              <img
                src="/images/img/payment/f3.png"
                className="m-1"
                alt="pay-cert"
              />
              <img
                src="/images/img/payment/f4.png"
                className="m-1"
                alt="pay-cert"
              />
              <img
                src="/images/img/payment/f5.png"
                className="m-1"
                alt="pay-cert"
              />
              <img
                src="/images/img/payment/f6.png"
                className="m-1"
                alt="pay-cert"
              />
              <img
                src="/images/img/payment/f2.png"
                className="m-1"
                alt="pay-cert"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
