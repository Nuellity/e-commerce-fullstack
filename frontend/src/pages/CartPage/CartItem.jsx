import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/CartSlice";
import CartListItem from "./CartListItem";

function CartItem() {
  const [open, setOpen] = useState(false);
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const handleClick = (index) => {
    dispatch(deleteProduct(index));
    setOpen(true);
  };

  const closeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {cart.map((value, index) => {
        return (
          <CartListItem
            key={index}
            item={value}
            index={index}
            handleClick={() => handleClick(index)}
          />
        );
      })}
      <Snackbar open={open} autoHideDuration={2000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity="warning" sx={{ width: "100%" }}>
          Item has been removed from Cart!
        </Alert>
      </Snackbar>
    </>
  );
}

export default CartItem;
