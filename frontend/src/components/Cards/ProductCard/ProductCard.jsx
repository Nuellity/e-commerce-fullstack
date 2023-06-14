/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Box,
  Rating,
  Tooltip,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InstagramIcon from "@mui/icons-material/Instagram";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import "./card.css";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { userRequest } from "../../../axiosRequest";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/ApiCalls";
import { addProduct } from "../../../redux/CartSlice";
import Cart from "../../../pages/CartPage/Cart";

const labels = {
  0.5: "Useless",
  1: "Terrible",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function ProductCard({
  isHot,
  isSale,
  image,
  category,
  productQuantity,
  title,
  id,
}) {
  return (
    <div className="col-md-6 ">
      <div className="card-container w-100">
        <Link
          to={`/product/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={image}
            alt={title}
            className="image img-fluid"
            style={{ objectFit: "contain" }}
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
        </Link>
        <div className="overlay">
          <div>{category}</div>
          <div>{productQuantity} Products</div>
        </div>
      </div>
    </div>
  );
}

export const BigCard = ({ image, title, category, productQuantity, id }) => {
  return (
    <div className="col-lg-6">
      <div className="big-card-container w-100">
        <Link
          to={`/product/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={image}
            alt={title}
            className="big-image img-fluid"
            style={{ objectFit: "contain" }}
          />
        </Link>
        <div className="big-overlay">
          <div>{category}</div>
          <div>{productQuantity} Products</div>
        </div>
      </div>
    </div>
  );
};

export const BuyCard = ({
  isHot,
  isSale,
  image,
  title,
  price,
  id,
  category,
  product,
  count,
}) => {
  const [isFav, setIsFav] = useState(false);
  const user = useSelector((state) => state.user?.currentUser?._id);
  const [open, setOpen] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const [cartDraw, setCartDraw] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [fav, setFav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const closeAdd = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAddItem(false);
  };
  const closeFav = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFav(false);
  };

  const closeDuplicate = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDuplicate(false);
  };
  const handleFav = async () => {
    if (!user) {
      return;
    }
    const savedItem = { userId: user, productId: id };

    try {
      const res = await userRequest.get(`/wishlists/find/${user}`);
      const savedItems = res.data;
      const isProductSaved = savedItems.some((item) => item.productId === id);

      if (isProductSaved) {
        setDuplicate(true);
      } else {
        const saveRes = await userRequest.post("wishlists", savedItem);
        setIsFav(true);
        setFav(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        logout(dispatch);
        navigate("/login");
      } else if (error.response && error.response.status === 401) {
        setOpen(true);
        window.location.reload();
      } else if (error.response && error.response.status === 500) {
        setDuplicate(true);
      }
    }
  };

  const handleDraw = () => {
    setCartDraw(!cartDraw);
  };
  const handleClose = () => {
    setCartDraw(false);
  };

  const handleAddToCart = () => {
    const updatedProduct = { ...product, amount: 1 * product.price };
    const item = { ...updatedProduct, quantity: 1 };

    dispatch(addProduct(item));
    handleDraw();
    setAddItem(true);
  };

  useEffect(() => {
    const fetchSavedItem = async () => {
      if (!user) {
        return;
      }

      try {
        const res = await userRequest.get(`/wishlists/find/${user}`);
        const savedItems = res.data;
        const isFav = savedItems.some((item) => item.productId === id);
        setIsFav(isFav);
      } catch (error) {}
    };

    fetchSavedItem();
  }, [user, id]);

  return (
    <>
      <div className="buy-card-container w-100">
        <Link
          to={`/product/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
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
        </Link>
        <div className="buy-overlay  w-100">
          <div className="fav-icon" onClick={handleFav}>
            <Tooltip title="Add to Wishlist" placement="bottom" arrow>
              {isFav ? (
                <FavoriteIcon sx={{ marginRight: "18px", color: "#FF6F61" }} />
              ) : (
                <FavoriteBorderIcon
                  sx={{ marginRight: "18px", color: "#FF6F61" }}
                />
              )}
            </Tooltip>
          </div>
          <div className="icon" onClick={handleAddToCart}>
            <ShoppingBagIcon /> <span>Add to Cart</span>
          </div>
        </div>
      </div>
      <div className="mx-1 mt-3 product-name">
        <div className="mb-3">
          <span className="buy-title">{title}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="buy-name">{category}</span>
          <span className="buy-price ">${price}</span>
        </div>
      </div>
      <Cart count={count} openCart={cartDraw} closeCart={handleClose} />
      <Snackbar open={addItem} autoHideDuration={3000} onClose={closeAdd}>
        <Alert onClose={closeAdd} severity="success" sx={{ width: "100%" }}>
          Item has been added to cart
        </Alert>
      </Snackbar>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={closeAlert} severity="error" sx={{ width: "100%" }}>
          Error occured while saving product, please try again.
        </Alert>
      </Snackbar>
      <Snackbar
        open={fav}
        autoHideDuration={3000}
        onClose={closeFav}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={closeFav} severity="success" sx={{ width: "100%" }}>
          Product has been added to saved items.{" "}
        </Alert>
      </Snackbar>
      <Snackbar
        open={duplicate}
        autoHideDuration={3000}
        onClose={closeDuplicate}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={closeDuplicate} severity="error" sx={{ width: "100%" }}>
          This product has already been added to saved items.
        </Alert>
      </Snackbar>
    </>
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

export const OrderCard = ({ title, image, status, orderId, orderDate }) => {
  const navigate = useNavigate();
  const date = moment(orderDate);
  const formattedDate = date.format("MMMM Do YYYY");
  return (
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.175)",
        borderRadius: "5px",
        padding: "1.5em",
        margin: "5px 0",
      }}
    >
      <div className="row d-flex g-4">
        <div className="col-lg-4 review-image" style={{ width: "8rem" }}>
          <img
            src={image}
            alt="Avatar"
            style={{
              width: "8rem",
              height: "7rem",
              borderRadius: "5px",
              objectFit: "contain",
            }}
          />
        </div>
        <div className="col-lg-6">
          <div className="review-details">
            <span className="order-name">
              {title.length === 1
                ? title[0].name
                : `${title[0].name} & Other Items `}
            </span>
            <br /> <span className="order-id">Order nº: {orderId}</span>
            <br />
            <div className="pt-2">
              {status === "pending" ? (
                <>
                  <Chip label="Processing" color="secondary" /> <br />
                </>
              ) : (
                <>
                  <Chip label="Delivered" color="success" /> <br />
                </>
              )}

              <span className="order-date">
                {status === "completed" ? "" : `On ${formattedDate}`}
              </span>
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
                navigate(`/profile/order-details/${orderId}`);
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

export const ReviewCard = ({ title, image, orderId }) => {
  const navigate = useNavigate();
  const myTheme = useTheme();
  const isMatch = useMediaQuery(myTheme.breakpoints.down("sm"));

  return (
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.175)",
        borderRadius: "5px",
        padding: "1.5em",
        margin: "5px 0",
      }}
    >
      <div className="row d-flex g-4">
        <div
          className="col-lg-4 review-image"
          style={{ width: "10rem", padding: 0 }}
        >
          <img
            src={image}
            alt="Avatar"
            style={{
              width: "100%",
              height: "8rem",
              borderRadius: "5px",
              objectFit: "contain",
            }}
          />
        </div>
        <div className={`col-lg-6 ${isMatch ? "p-0" : "pl-3"}`}>
          <div className=" d-flex align-items-start  review-details m-auto p-0">
            <div className="mb-auto">
              <span className="order-name">{title}</span>
            </div>
            <br />
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
                navigate(`/profile/review-product/${orderId}`);
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

export const RateCard = ({ title, image, handleChange, value }) => {
  const [hover, setHover] = useState(-1);

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  return (
    <div
      style={{
        border: "none",
      }}
    >
      <div className="row d-flex g-4">
        <div className="col-lg-4 review-image" style={{ width: "8rem" }}>
          <img
            src={image}
            alt="Avatar"
            style={{
              width: "8rem",
              height: "8rem",
              borderRadius: "5px",
              objectFit: "contain",
            }}
          />
        </div>
        <div className="col-lg-6">
          <div className="review-details">
            <div>
              <span className="order-name">{title}</span>
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
                    onChange={handleChange}
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

export const SavedCard = ({ image, title, id, handleDelete }) => {
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
            src={image}
            alt="Avatar"
            style={{
              width: "8rem",
              height: "8rem",
              borderRadius: "5px",
              objectFit: "contain",
            }}
          />
        </div>
        <div className="col-lg-6">
          <div className=" d-flex align-items-start flex-column review-details">
            <div className="mb-auto">
              <span className="order-name">{title}</span>
            </div>
            <br />
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
                onClick={() => navigate(`/product/${id}`)}
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
                onClick={() => handleDelete(id)}
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
