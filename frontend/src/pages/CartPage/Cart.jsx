import React from "react";
import { Drawer, List, Button, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      main: "#212121",
    },
  },
});

function Cart(props) {
  const cart = useSelector((state) => state.cart);
  const products = cart.products;

  function isEmpty(product) {
    return Object.keys(product).length === 0;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Drawer
          open={props.openCart}
          onClose={props.closeCart}
          anchor="right"
          sx={{
            width: 450,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: { xs: 280, sm: 450, lg: 450 },
              boxSizing: "border-box",
              backgroundColor: "#ffffff",
            },
          }}
        >
          <div className="cart-header">
            <div className="py-3 cart-title  ">
              <h4 className="text-capitalize mx-auto">shopping cart</h4>
              <IconButton onClick={props.closeCart}>
                <CancelIcon color="primary" />
              </IconButton>
            </div>
          </div>
          <div className="cart-list">
            <div className="cart-list-container">
              {isEmpty(products) ? (
                <>
                  <h5 className="text-center p-2 ">Your Cart is Empty</h5>
                  <img
                    className="img-fluid pt-5 "
                    src="/images/img/about/empty.svg"
                    alt="empty-cart"
                    style={{ height: "200px", width: "100%" }}
                  />
                </>
              ) : (
                <>
                  <List
                    sx={{ width: "100%", maxWidth: 450, bgcolor: "inherit" }}
                    subheader={<li />}
                  >
                    <CartItem />
                  </List>
                </>
              )}
            </div>
          </div>
          <div className=" cart-footer">
            <div className="d-flex justify-content-between m-3">
              <div className="">
                <span style={{ fontSize: "1.3rem" }}>Subtotal</span>
              </div>
              <div>
                <span style={{ fontSize: "1.5rem" }}>
                  ${cart.total.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="text-center ">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/checkout"
              >
                <Button
                  variant="contained"
                  color="success"
                  sx={{ width: "80%", height: "50px", fontSize: "25px" }}
                >
                  Checkout
                </Button>
              </Link>
            </div>
            <div className="cart-ship text-center py-3">
              <p className="px-2 text-capitalize" style={{ fontSize: "1em" }}>
                Shipping & taxes calculated at checkout
              </p>
            </div>
          </div>
        </Drawer>
      </ThemeProvider>
    </>
  );
}

export default Cart;
