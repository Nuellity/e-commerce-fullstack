import React from "react";

import { BuyCard } from "../../components/Cards/ProductCard/ProductCard";

function HomeSeller() {
  return (
    <div
      className="my-5"
      style={{ paddingBottom: "50px", background: "#FFFFFF" }}
    >
      <div className="py-2 d-flex justify-content-center">
        <h2
          style={{
            color: "#000000",
            font: "Roboto",
            fontSize: "50px",
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          best sellers
        </h2>
      </div>
      <div className="container">
        <div className="row">
          <BuyCard
            title="Geometric Print Scarf"
            price="150.00"
            id="63ed045b7e2b59aabbf0ff5b"
            image={
              "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          />
          <BuyCard
            isHot
            title="Geometric Print Scarf"
            price="150.00"
            id="63ed045b7e2b59aabbf0ff5b"
            image={
              "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          />
          <BuyCard
            title="Geometric Print Scarf"
            price="150.00"
            id="63ed045b7e2b59aabbf0ff5b"
            image={
              "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          />
          <BuyCard
            isSale
            title="Geometric Print Scarf"
            price="150.00"
            id="63ed045b7e2b59aabbf0ff5b"
            image={
              "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default HomeSeller;
