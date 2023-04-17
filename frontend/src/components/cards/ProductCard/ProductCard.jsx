import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./card.css";
import { Link } from "react-router-dom";

function ProductCard({ isHot, isSale }) {
  return (
    <div className="col-md-6 ">
      <div className="card-container w-100">
        <img
          src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Avatar"
          className="image img-fluid"
        />
        {isSale && (
          <div className="sale-overlay">
            <div>SALE</div>
          </div>
        )}
        {isHot && (
          <div className="hot-overlay">
            <div>HOT</div>
          </div>
        )}
        <div className="overlay">
          <div>Pants</div>
          <div>300 Products</div>
        </div>
      </div>
    </div>
  );
}

export const BigCard = () => {
  return (
    <div className="col-lg-6">
      <div className="big-card-container w-100">
        <img
          src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Avatar"
          className="big-image img-fluid"
        />
        <div className="big-overlay">
          <div>Pants</div>
          <div>200 Products</div>
        </div>
      </div>
    </div>
  );
};

export const BuyCard = ({ isHot, isSale, image, title, price, id }) => {
  return (
    <div className="col-lg-3 col-md-6 mt-5">
      <div className="buy-card-container w-100">
        <img src={image} alt={title} className="buy-image img-fluid" />
        {isSale && (
          <div className="sale-overlay">
            <div>SALE</div>
          </div>
        )}
        {isHot && (
          <div className="hot-overlay">
            <div>HOT</div>
          </div>
        )}
        <div className="buy-overlay">
          <div>
            <FavoriteBorderIcon sx={{ marginRight: "18px" }} />{" "}
            <Link
              to={`/product/${id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <SearchIcon className="icon" />
            </Link>
          </div>
          <div className="icon">
            <ShoppingBagIcon /> <span>Shop Now</span>
          </div>
        </div>
      </div>
      <div className="mx-1 mt-3 product-name">
        <div className="mb-3">
          <span className="buy-title">{title}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="buy-name">Dress</span>
          <span className="buy-price ">${price}</span>
        </div>
      </div>
    </div>
  );
};

export const SocialCard = () => {
  return (
    <div className="col-lg-2 col-md-4 col-sm-6">
      <div className="social-container">
        <img
          src="https://images.pexels.com/photos/982585/pexels-photo-982585.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Avatar"
          className="social-image"
        />
        <div className="social-overlay">
          <InstagramIcon className="social-icon" sx={{ fontSize: 80 }} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
