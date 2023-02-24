import React, { forwardRef, useState } from "react";
import { useCart } from "react-use-cart";
import {
  Divider,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Remove = (props) => {
  return <IconButton edge="end" aria-label="delete" {...props} />;
};

function CartItem(props) {
  const { productItem } = props;
  const productDetails = productItem.products;

  const { removeItem } = useCart();
  const [open, setOpen] = useState(false);

  const closeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {productDetails.map((value, index) => {
        return (
          <ListItem
            key={index}
            component={"div"}
            alignItems="flex-start"
            secondaryAction={
              <Remove onClick={() => removeItem(value._id)}>
                <DeleteIcon />
              </Remove>
            }
            sx={{ width: "100%" }}
          >
            <ListItemAvatar>
              <Avatar
                alt={value.title}
                src={value.img[0].original}
                sx={{ height: "60px", width: "60px", marginRight: "20px" }}
              />
            </ListItemAvatar>
            <ListItemText
              variant="span"
              primary={value.title}
              secondary={
                <>
                  <span className="d-flex flex-column">
                    {!value.size.length ? (
                      ""
                    ) : (
                      <Typography variant="span" sx={{ padding: "5px 0" }}>
                        SIZE: {value.size}
                      </Typography>
                    )}
                    <Typography variant="span" sx={{ padding: "5px 0" }}>
                      Quantity: {value.quantity}
                    </Typography>
                    <Typography
                      variant="span"
                      sx={{ padding: "5px 0", fontSize: "20px" }}
                    >
                      $ {value.price * value.quantity}
                    </Typography>
                  </span>
                  <Divider component="li" />
                </>
              }
            />
          </ListItem>
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
