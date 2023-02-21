import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function HomeNewSection() {
  return (
    <>
      <div className="new-section  w-100">
        <div className="row p-0 m-0">
        
          <div className="first col-lg-4 col-md-12 p-0 ">
            <img className="img-fluid" src="images/img/new/1.jpg" alt="" />
            <div className="shop-now">
              <h2>Extreme Rare Sneakers</h2>
              <Link style={{textDecoration: "none", color: "inherit"}} to="/products/footwears">
              <Button className="butn text-uppercase " variant="outlined">
                Shop now
              </Button>
              </Link>
            </div>
          </div>
         
          <div className="first col-lg-4 col-md-12 p-0 ">
            <img className="img-fluid" src="images/img/new/2.jpg" alt="" />
            <div className="shop-now">
              <h2>Awesome Blank Outift</h2>
              <Link style={{textDecoration: "none", color: "inherit"}} to="/products/blank-outfits">
              <Button className="butn text-uppercase" variant="outlined">
                Shop now
              </Button>
              </Link>
            </div>
          </div>
          <div className="first col-lg-4 col-md-12 p-0 ">
            <img className="img-fluid" src="images/img/new/3.jpg" alt="" />
            <div className="shop-now">
              <h2>SportWear Up to 50% Off</h2>
              <Link style={{textDecoration: "none", color: "inherit"}} to="/products/sportwears">
              <Button className=" butn text-uppercase" variant="outlined">
                Shop now
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeNewSection;
