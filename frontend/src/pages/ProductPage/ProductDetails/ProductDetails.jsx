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

import "react-image-gallery/styles/css/image-gallery.css";

import Cart from "../../CartPage/Cart";
import { ButtonGroup } from "@mui/material";

import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/CartSlice";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProductDetails(props) {
  const [size, setSize] = useState("");
  const [cartDraw, setCartDraw] = useState(false);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { product, itemPrice, title, image, sizes, desc, count } = props;

  // console.log(product);

  const handleChange = (event) => {
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

  return (
    <>
      <div style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}>
        <div className="container py-5 mb-5">
          <h3 className="justify-content-start py-4">{title}</h3>
          <div className="row">
            <div className="col-lg-5">
              <ImageGallery
                items={image}
                showNav={false}
                showPlayButton={false}
                showFullscreenButton={false}
                useBrowserFullscreen={false}
                originalHeight={{ height: "50px" }}
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
                      onChange={handleChange}
                    >
                      {props.sizes.map((value, index) => {
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
                autoHideDuration={3000}
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

              <h4 className="mt-5 mb-3">Product Details</h4>
              <span className="mb-5">{desc}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
