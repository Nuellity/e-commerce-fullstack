import React from "react";
import Marquee from "react-fast-marquee";

function HomeBrand() {
  return (
    <Marquee speed={100} gradient={false}>
      <div className="d-flex gap-3 justify-content-around py-5">
        <img src="images/img/brand/1.png" alt="brand" />
        <img src="images/img/brand/2.png" alt="brand" />
        <img src="images/img/brand/3.png" alt="brand" />
        <img src="images/img/brand/4.png" alt="brand" />
        <img src="images/img/brand/5.png" alt="brand" />
        <img src="images/img/brand/6.png" alt="brand" />
      </div>
    </Marquee>
  );
}

export default HomeBrand;
