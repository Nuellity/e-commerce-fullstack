import React, { useState } from "react";
import { Button, Chip, Box, Rating } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InstagramIcon from "@mui/icons-material/Instagram";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import "./card.css";
import { Link, useNavigate } from "react-router-dom";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

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

export const OrderCard = () => {
  const navigate = useNavigate();
  return (
    <div
      className=""
      style={{
        border: "1px solid rgba(0, 0, 0, 0.175)",
        borderRadius: "5px",
        padding: "1.5em",
      }}
    >
      <div className="row d-flex g-4">
        <div className="col-lg-4 review-image" style={{ width: "8rem" }}>
          <img
            src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Avatar"
            style={{ width: "8rem", height: "100%", borderRadius: "5px" }}
          />
        </div>
        <div className="col-lg-6">
          <div className="review-details">
            <span className="order-name">
              Anti Blue Ray Light Glasses For Screens Black-Gold Frame
            </span>
            <br /> <span className="order-id">Order nº: 1548345222 </span>
            <br />
            <div className="pt-2">
              <Chip label="DELIVERED" color="success" /> <br />
              <span className="order-date">On 29-09-2022</span>
            </div>
          </div>
        </div>
        <div className="col-lg-2 ms-auto">
          <div className="rate-button">
            <Button
              variant="text"
              size="large"
              sx={{ color: "skyblue", fontSize: "0.95em" }}
              onClick={() => {
                navigate("/profile/order-details");
              }}
            >
              SEE DETAILS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReviewCard = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.175)",
        borderRadius: "5px",
        padding: "1.5em",
      }}
    >
      <div className="row d-flex g-4">
        <div className="col-lg-4 review-image" style={{ width: "8rem" }}>
          <img
            src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Avatar"
            style={{ width: "8rem", height: "100%", borderRadius: "5px" }}
          />
        </div>
        <div className="col-lg-6">
          <div className=" d-flex align-items-start flex-column review-details">
            <div className="mb-auto">
              <span className="order-name">
                Anti Blue Ray Light Glasses For Screens Black-Gold Frame
              </span>
            </div>
            <br />
            <div>
              <span className="order-id">Order nº: 1548345222</span>
            </div>
            <br />
            <div>
              <span className="review-date">Delivered on 29-09-2022</span>
            </div>
          </div>
        </div>
        <div className="col-lg-2 ms-auto">
          <div className="rate-button">
            <Button
              variant="text"
              size="large"
              sx={{
                color: "skyblue",
                fontSize: "0.95em",
              }}
              onClick={() => {
                navigate("/profile/review-product");
              }}
            >
              ADD REVIEW
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RateCard = () => {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  return (
    <div
      className=""
      style={{
        border: "none",
      }}
    >
      <div className="row d-flex g-4">
        <div className="col-lg-4 review-image" style={{ width: "8rem" }}>
          <img
            src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Avatar"
            style={{ width: "8rem", height: "100%", borderRadius: "5px" }}
          />
        </div>
        <div className="col-lg-6">
          <div className="review-details">
            <div>
              <span className="order-name">
                Anti Blue Ray Light Glasses For Screens Black-Gold Frame
              </span>
            </div>
            <br />
            <div>
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="wrap-rating">
                  <Rating
                    size="small"
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                  />
                </div>
                {value !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : value]}
                  </Box>
                )}
              </Box>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SavedCard = () => {
  return (
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.175)",
        borderRadius: "5px",
        padding: "1.5em",
      }}
    >
      <div className="row d-flex g-4">
        <div className="col-lg-4 review-image" style={{ width: "8rem" }}>
          <img
            src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Avatar"
            style={{ width: "8rem", height: "100%", borderRadius: "5px" }}
          />
        </div>
        <div className="col-lg-6">
          <div className=" d-flex align-items-start flex-column review-details">
            <div className="mb-auto">
              <span className="order-name">
                Anti Blue Ray Light Glasses For Screens Black-Gold Frame
              </span>
            </div>
            <br />
            <div>
              <span className="order-id">Order nº: 1548345222</span>
            </div>
            <br />
            <div>
              <span className="review-date">Delivered on 29-09-2022</span>
            </div>
          </div>
        </div>
        <div className="col-lg-2 ms-auto  ">
          <div className="save-btn ">
            <div className="rate-button mb-auto">
              <Button
                variant="contained"
                size="large"
                sx={{
                  color: "white",
                  fontSize: "0.95em",
                  backgroundColor: "skyblue",
                  "&:hover": {
                    backgroundColor: "#4a90e2",
                  },
                }}
              >
                BUY NOW
              </Button>
            </div>
            <div>
              <Button
                variant="text"
                startIcon={<DeleteIcon />}
                size="large"
                sx={{
                  color: "skyblue",
                  fontSize: "0.95em",
                }}
              >
                REMOVE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
