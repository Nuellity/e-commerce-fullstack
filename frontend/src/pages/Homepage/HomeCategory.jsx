import React from "react";
import ProductCard, {
  BigCard,
} from "../../components/Cards/ProductCard/ProductCard";

function HomeCategory() {
  return (
    <div className="container">
      <div>
        <h3 className="main-header pb-5">Explore New And Popular Styles</h3>
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
