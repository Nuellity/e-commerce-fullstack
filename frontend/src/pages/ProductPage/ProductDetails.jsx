import React, { useState, forwardRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ImageGallery from "react-image-gallery";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "react-image-gallery/styles/css/image-gallery.css";
import { ButtonGroup, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/CartSlice";
import Cart from "../CartPage/Cart";
import ProductReview from "./ProductReview";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProductDetails({
  product,
  itemPrice,
  title,
  image,
  sizes,
  desc,
  count,
  reviews,
}) {
  const [size, setSize] = useState("");
  const [cartDraw, setCartDraw] = useState(false);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const averageRating =
    reviews.reduce((total, review) => parseFloat(total + review.rating), 0) /
    reviews.length;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleSize = (event) => {
    setSize(event.target.value);
  };

  const handleDraw = () => {
    setCartDraw(!cartDraw);
  };

  const handleAddToCart = () => {
    const updatedProduct = { ...product, amount: quantity * product.price };
    const item = { ...updatedProduct, quantity, size };
    dispatch(addProduct(item));
    handleDraw();
    setOpen(true);
  };

  const handleClose = () => {
    setCartDraw(false);
  };

  const closeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function increment() {
    setQuantity(function (prevCount) {
      if (count - 1 >= prevCount) {
        return (prevCount += 1);
      } else {
        return prevCount;
      }
    });
  }

  function decrement() {
    setQuantity(function (prevCount) {
      if (prevCount > 1) {
        return (prevCount -= 1);
      } else {
        return (prevCount = 1);
      }
    });
  }
  const renderItem = (item) => {
    return (
      <div className="image-gallery-image">
        <img
          src={item.original}
          alt={item.originalAlt}
          srcSet={item.srcSet}
          sizes={item.sizes}
          style={{
            width: "30em",
            height: "40em",
            margin: "0 auto",
            objectFit: "contain",
          }}
        />
      </div>
    );
  };
  const renderThumbInner = (item) => {
    return (
      <div className="image-gallery-thumbnail-inner">
        <img
          src={item.thumbnail}
          alt={item.thumbnailAlt}
          style={{
            width: "4em",
            height: "4em",
          }}
        />
      </div>
    );
  };
  return (
    <>
      <div style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}>
        <div className="container py-5 mb-5">
          <h3 className="justify-content-start py-4">{title}</h3>
          <div className="row">
            <div className="col-lg-5 ">
              <ImageGallery
                items={image}
                showNav={false}
                showPlayButton={false}
                showFullscreenButton={false}
                useBrowserFullscreen={false}
                renderItem={renderItem}
                renderThumbInner={renderThumbInner}
              />
            </div>
            <div className="col-lg-6">
              <h2>${itemPrice}</h2>
              {!sizes.length ? (
                ""
              ) : (
                <Box className="my-3" sx={{ minWidth: 120 }}>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Size</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={size}
                      label="Size"
                      onChange={handleSize}
                    >
                      {sizes.map((value, index) => {
                        return (
                          <MenuItem value={value} key={index}>
                            {value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              )}
              <div className="mt-3">
                <p>Quantity: </p>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                  size="large"
                  sx={{ padding: "5px 0" }}
                >
                  <Button onClick={increment}>+</Button>
                  <Button>{quantity}</Button>
                  <Button onClick={decrement}>-</Button>
                </ButtonGroup>
              </div>
              <div className="mt-5">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleAddToCart()}
                >
                  Add to Cart
                </Button>
              </div>
              <Cart
                count={count}
                optional={size}
                openCart={cartDraw}
                closeCart={handleClose}
              />
              <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={closeAlert}
              >
                <Alert
                  onClose={closeAlert}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Item has been added to Cart!
                </Alert>
              </Snackbar>

              <div className="container pt-5">
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      sx={{
                        "& .MuiTabs-indicator": {
                          backgroundColor: "skyblue",
                        },
                        "& .MuiTab-textColorInherit": {
                          color: "red",
                        },
                      }}
                      aria-label="basic tabs example"
                    >
                      <Tab
                        label="Description"
                        sx={{
                          fontSize: "1.2em",
                        }}
                        {...a11yProps(0)}
                      />
                      <Tab
                        label="Reviews"
                        sx={{ fontSize: "1.2em" }}
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <div className="container p-0">{desc}</div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    {reviews.length > 0 ? (
                      <ProductReview
                        reviews={reviews}
                        image={image}
                        averageRating={averageRating}
                      />
                    ) : (
                      <Typography>
                        No reviews available for this product yet.
                      </Typography>
                    )}
                  </TabPanel>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
