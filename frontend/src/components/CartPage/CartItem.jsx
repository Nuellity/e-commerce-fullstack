import React, { forwardRef, useState } from 'react'
import { useCart } from "react-use-cart"
import {
    Divider,
    ListItemAvatar,
    ListItem,
    ListItemText,
    Avatar,
    Typography,
    ButtonGroup,
    Button,
    IconButton,
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Remove = (props) => {
    return <IconButton edge="end" aria-label="delete" {...props}/>
}                                        

function CartItem(props) {
    const { 
        updateItemQuantity,
        removeItem,
        } = useCart();
    const [open, setOpen] = useState(false);

    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
        

  return (
    <>
    {props.productItem.map((value, index)=>{
        return(
            <>
            <ListItem
    alignItems="flex-start"
    secondaryAction={
      <Remove onClick={()=> removeItem(value.id) }>
        <DeleteIcon />
      </Remove>
    }
    sx={{width: "100%"}}
    key={index}
  >
    <ListItemAvatar>
      <Avatar
        alt={value.title}
        src={value.src[0].original}
        sx={{ height: "60px", width: "60px", marginRight: "20px" }}
      />
    </ListItemAvatar>
    <ListItemText
      primary={value.title}
      secondary={
        <>
        <Typography sx={{ padding: "5px 0" }}>SIZE: {props.option}</Typography>
          <Typography sx={{ padding: "5px 0" }}>${(value.price * value.quantity).toFixed(2)}</Typography>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            size="small"
            sx={{ padding: "5px 0" }}
          >
            <Button onClick={()=>  updateItemQuantity(value.id, value.quantity + 1)}>+</Button>
            <Button >{value.quantity}</Button>
            <Button onClick={()=> updateItemQuantity(value.id, value.quantity - 1)}>-</Button>
          </ButtonGroup>
        </>
      }
    />
  </ListItem>
  <Snackbar open={open} autoHideDuration={2000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity="warning" sx={{ width: '100%' }}>
          Item has been removed from Cart!
        </Alert>
      </Snackbar>
  
            </>
        )
    })}
    
  <Divider variant="inset" component="li" />
</>
  )
}

export default CartItem