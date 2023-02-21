/* eslint-disable no-lone-blocks */
import React from "react";

function ProductCard(props) {
  return (
 
    <div className="container">
          <div className="product-container">
            <div className="product-card">
              <div className="product-img">
                <img
                  src="./images/slide/slide-2.png"
                  alt=""
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="product-detail">
                <p>Product Name</p>
                <div className="rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half"></i>
                </div>
                <span>Product Description </span>
                <div className="buttons">
                  <div className="price">$50</div>
                  <button className="cart btn-style">Add to Cart</button>
                  <button className="favorite btn-style">
                    <i className="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="product-card">
              <div className="product-img">
                <img
                  src="./images/slide/slide-2.png"
                  alt=""
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="product-detail">
                <p>Product Name</p>
                <div className="rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half"></i>
                </div>
                <span>Product Description </span>
                <div className="buttons">
                  <div className="price">$50</div>
                  <button className="cart btn-style">Add to Cart</button>
                  <button className="favorite btn-style">
                    <i className="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> 
  );
}

export default ProductCard;
