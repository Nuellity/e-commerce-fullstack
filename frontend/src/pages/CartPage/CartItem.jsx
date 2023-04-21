import React from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/CartSlice";

function CartItem() {
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <>
      {cart.map((value, index) => {
        return (
          <ListItem
            key={index}
            component={"div"}
            alignItems="flex-start"
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleClick(value._id)}
              >
                <DeleteIcon />
              </IconButton>
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
    </>
  );
}

export default CartItem;
