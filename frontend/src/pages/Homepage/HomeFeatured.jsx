import React from "react";

import { BuyCard } from "../../components/Cards/ProductCard/ProductCard";

function HomeFeatured() {
  return (
    <div className="container pt-3 pb-5">
      <div className="pt-5 pb-2 d-flex justify-content-center">
        <h2 className="main-header">Check out trending items</h2>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 mt-5">
          <BuyCard
            title="Geometric Print Scarf"
            price="150.00"
            id="63ed045b7e2b59aabbf0ff5b"
            image={
              "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          />
        </div>
        <div className="col-lg-3 col-md-6 mt-5">
          <BuyCard
            isHot
            title="Geometric Print Scarf"
            price="150.00"
            id="63ed045b7e2b59aabbf0ff5b"
            image={
              "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          />
        </div>
        <div className="col-lg-3 col-md-6 mt-5">
          <BuyCard
            title="Geometric Print Scarf"
            price="150.00"
            id="63ed045b7e2b59aabbf0ff5b"
            image={
              "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          />
        </div>
        <div className="col-lg-3 col-md-6 mt-5">
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
        <div className="col-lg-3 col-md-6 mt-5">
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
        <div className="col-lg-3 col-md-6 mt-5">
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
        <div className="col-lg-3 col-md-6 mt-5">
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
        <div className="col-lg-3 col-md-6 mt-5">
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

export default HomeFeatured;
