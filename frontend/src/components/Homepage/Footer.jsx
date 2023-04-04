import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <div className="bottomcontainer py-2">
        <div className="container">
          <div className="row">
            <div className=" col-md-3">
              <h6>CONTACT US</h6>
              <p>
                <EmailIcon sx={{ paddingRight: "5px" }} />
                support@ayaba.com
              </p>
            </div>
            <div className=" col-md-3 ">
              <h6>COMPANY</h6>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/about"
              >
                <p>ABOUT US</p>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/privacy"
              >
                <p>PRIVACY POLICY</p>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/terms"
              >
                <p>TERMS AND CONDITIONS</p>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/blog"
              >
                <p>BLOG</p>
              </Link>
            </div>

            <div className=" col-md-3 ">
              <h6>NEED SOME HELP?</h6>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/payment"
              >
                <p>PAYMENT METHODS</p>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/shipping"
              >
                <p>SHIPPING AND DELIVERY</p>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/return"
              >
                <p>RETURNS POLICY</p>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/faq"
              >
                <p>FREQUENTLY ASKED QUESTIONS</p>
              </Link>
            </div>
            <div className=" col-md-3 ">
              <h6>FOLLOW US</h6>

              <FacebookIcon sx={{ margin: "5px" }} />
              <TwitterIcon sx={{ margin: "5px" }} />
              <InstagramIcon sx={{ margin: "5px" }} />
              <YouTubeIcon sx={{ margin: "5px" }} />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-6 ">
              <p>BUY WITH CONFIDENCE: </p>
              <img
                className="img-fluid conf"
                style={{ height: "40px", marginRight: "10px" }}
                src="images/img/secure/ssl.svg"
                alt="ssl"
              />
              <img
                className="img-fluid conf"
                style={{ height: "40px", marginRight: "10px" }}
                src="images/img/secure/norton.svg"
                alt="norton"
              />
              <img
                className="img-fluid conf"
                style={{ height: "40px", marginRight: "10px" }}
                src="images/img/secure/go_daddy.svg"
                alt="godaddy"
              />
            </div>
            <div className="col-lg-6 col-md-6 ">
              <p>PAYMENT METHODS: </p>
              <i className="fa-brands fa-cc-paypal fa-icon-style"></i>{" "}
              <i className="fa-brands fa-cc-mastercard fa-icon-style"></i>{" "}
              <i className="fa-brands fa-cc-visa fa-icon-style"></i>{" "}
              <i className="fa-brands fa-stripe fa-icon-style"></i>
              <i className="fa-brands fa-cc-amex fa-icon-style"></i>
              <i className="fa-brands fa-cc-discover fa-icon-style"></i>
            </div>
          </div>
          <hr />
          <p className="foot" style={{ textAlign: "center", color: "black" }}>
            © Ayaba {year}
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
