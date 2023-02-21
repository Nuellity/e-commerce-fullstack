import React from "react";

function ItemCard(props) {
  const itemInfo = props.info;

  return (
    <>
      <div className="row ">
        {itemInfo.map((value, index) => {
          return (
            <div className="col-lg-6 col-6" key={index}>
              <div className="image-container">
              
                <img
                  src={value.imgURL}
                  className="item-image"
                  alt={value.title}
                  style={{ height: "8em", width: "8em" }}
                  href="4"
                />
                <span>{value.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ItemCard;
