import  React, { useState } from "react";
import { Drawer, List, Button, IconButton, Snackbar, Alert } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { removeProduct } from "../../redux/CartSlice";

function Cart(props) {
  const cart = useSelector(state => state.cart)
  const products = cart.products
  const [open, setOpen] = useState(false);
  console.log(products)
  const dispatch = useDispatch()

const removeItem = (index) => {
  dispatch(removeProduct(index))


}
const closeAlert = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }
  setOpen(false);
};




  function isEmpty(product) {
    return Object.keys(product).length === 0;
  }

  return (
    <>
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
            backgroundColor: "#75D2FF",
          },
        }}
      >
        <div className="cart-header">
          <div className="py-3 cart-title  ">
            <h5 className="text-uppercase mx-auto">shopping cart</h5>
            <IconButton onClick={props.closeCart}>
              <CancelIcon color="primary" />
            </IconButton>
          </div>
        </div>
        <List
          sx={{ width: "100%", maxWidth: 450, bgcolor: "inherit" }}
          subheader={<li />}
        >
          {isEmpty(products) ? (
            <>
              <h5 className="text-center p-2 ">Your Cart is Empty</h5>
              <img
                className="img-fluid pt-5 "
                src="images/img/about/empty.svg"
                alt="empty-cart"
                style={{ height: "200px", width: "100%" }}
              />
            </>
          ) : (
            <>
              {" "}
              <CartItem
                productItem={products}
                removeItem={removeItem}
              />{" "}
            </>
          )}
        </List>
        <div className=" cart-footer">
          <div className="cart-price m-3">
            <div className="sub-total">
              <h5>Subtotal</h5>
            </div>
            <div className="prod-price">
              <h5>${cart.total.toFixed(2)}</h5>
            </div>
          </div>

          <div className="checkout text-center ">
          <Link style={{textDecoration: "none", color: "inherit"}} to="/checkout">
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
            <p className="px-2" style={{fontSize: "15px"}}>Shipping & taxes calculated at checkout</p>
          </div>
        </div>
      </Drawer>
      <Snackbar open={open} autoHideDuration={2000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity="warning" sx={{ width: "100%" }}>
          Item has been removed from Cart!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Cart;
