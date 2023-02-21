import React from "react";
import ItemCard from "../cards/ItemCard";


function HomeItem(props) {
    
    const data = props.info;
  return (
    <>
     
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card-category">
              <div className="card-category-header">
                <h4>{props.name}</h4>
              </div>
              <div className="card-category-body">
            
                    <ItemCard info={data} />
                  
              </div>

              <div className="card-category-footer">
                <a href="2">See more</a>
              </div>
            </div>
          </div>
        
    </>
  );
}

export default HomeItem;
