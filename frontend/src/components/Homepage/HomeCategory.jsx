import React from "react";
import ProductCard, { BigCard } from "../Cards/ProductCard/ProductCard";

function HomeCategory() {
  return (
    <div className="container">
      <div>
        <div className=" py-5">
          <h3>Explore</h3>
        </div>
        <div className="row g-4">
          <BigCard />

          <div className="col-lg-6">
            <div className="row g-4">
              <ProductCard isSale />
              <ProductCard />
              <ProductCard isHot />
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCategory;
