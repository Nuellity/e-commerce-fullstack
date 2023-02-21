import React from "react";
import newArrivalData from "../../Data/newArrivalData";
import BuyProductCard from "../cards/BuyProductCard";
import { Link } from "react-router-dom";




function HomeArrival() {

  return (
    <>
    
      <div className="container ">
        <h4>NEW ARRIVALS</h4>
        <div className="row ">
          {newArrivalData.map((value, index) => {
            const linkName = value.title;
            const  url = linkName.replace(/\s+/g, '-');
            return (
              <div className="col-lg-2 col-md-4 col-sm-6 col-6 g-1" key={index}>
              <Link  style={{ textDecoration: "none", color: "inherit"}}
                    to={`/products/${url}`}>
                <BuyProductCard
                  image={value.imgURL}
                  price={value.price}
                  title={value.title}
                />
                </Link>
              </div>
            );
          })}
        </div>
      

      </div>
     
    </>
  );
}

export default HomeArrival;
