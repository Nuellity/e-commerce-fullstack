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





const Remove = (props) => {
  return <IconButton edge="end" aria-label="delete" {...props} />;
};

function CartItem(props) {
  const { productItem, removeItem } = props;

  const handleRemove = (index) => {
    removeItem(index)
  }
 

  
  return (
    <>
      {productItem.map((value, index) => {
      
        return (
          <ListItem
            key={index}
            component={"div"}
            alignItems="flex-start"
            // secondaryAction={
            //   <Remove onClick={handleRemove(index)} >
            //     <DeleteIcon />
            //   </Remove>
            // }
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
                    <Typography variant="span" sx={{ padding: "5px 0" }}>
                       delete
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
