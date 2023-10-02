import React from "react";
import Marquee from "react-fast-marquee";

function HomeBrand() {
  return (
    <Marquee speed={100} gradient={false}>
      <div className="row m-0 py-5">
        <img
          className="img-fluid col-lg-2 col-md-4 col-6"
          src="images/img/brand/1.png"
          alt=""
        />
        <img
          className="img-fluid col-lg-2 col-md-4 col-6"
          src="images/img/brand/2.png"
          alt=""
        />
        <img
          className="img-fluid col-lg-2 col-md-4 col-6"
          src="images/img/brand/3.png"
          alt=""
        />
        <img
          className="img-fluid col-lg-2 col-md-4 col-6"
          src="images/img/brand/4.png"
          alt=""
        />
        <img
          className="img-fluid col-lg-2 col-md-4 col-6"
          src="images/img/brand/5.png"
          alt=""
        />
        <img
          className="img-fluid col-lg-2 col-md-4 col-6"
          src="images/img/brand/6.png"
          alt=""
        />
      </div>
    </Marquee>
  );
}

export default HomeBrand;
