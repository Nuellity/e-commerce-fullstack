import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function BuyProductCard(props) {

 const [isFav, setIsFav] = useState(false)

function favClick() {
  return setIsFav(!isFav)
  
} 




  return (
    <div className="card h-100">
      <img className="card-img-top img-fluid" src={props.image} alt={props.title} />

      <div className="card-body">
        <div>
          <h5 className="card-text">{props.title}</h5>
          <div className="rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half"></i>
              </div>
        </div>
        <div>
        <div className="card-foot">
                  <div className="price">$50</div>
                  <IconButton> <ShoppingBasketIcon sx={{color: "skyBlue"}} /> </IconButton>
                  <IconButton onClick={favClick}  >  {isFav ?  <FavoriteIcon sx={{color: "red"}} />  : <FavoriteBorderIcon sx={{color: "red"}} />} </IconButton>
                 
                </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default BuyProductCard;
