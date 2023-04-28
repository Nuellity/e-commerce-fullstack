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

function CartListItem({ item, index, handleClick }) {
  return (
    <ListItem
      key={index}
      component={"div"}
      alignItems="flex-start"
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleClick}>
          <DeleteIcon />
        </IconButton>
      }
      sx={{ width: "100%" }}
    >
      <ListItemAvatar>
        <Avatar
          alt={item.title}
          src={item.img[0].original}
          sx={{ height: "60px", width: "60px", marginRight: "20px" }}
        />
      </ListItemAvatar>
      <ListItemText
        variant="span"
        primary={item.title}
        secondary={
          <>
            <span className="d-flex flex-column">
              {!item.size.length ? (
                ""
              ) : (
                <Typography variant="span" sx={{ padding: "5px 0" }}>
                  SIZE: {item.size}
                </Typography>
              )}
              <Typography variant="span" sx={{ padding: "5px 0" }}>
                Quantity: {item.quantity}
              </Typography>
              <Typography
                variant="span"
                sx={{ padding: "5px 0", fontSize: "20px" }}
              >
                $ {(item.price * item.quantity).toFixed(2)}
              </Typography>
            </span>
            <Divider component="li" />
          </>
        }
      />
    </ListItem>
  );
}

export default CartListItem;
