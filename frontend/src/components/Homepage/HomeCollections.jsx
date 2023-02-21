import React from "react";
import collectionData from "../../Data/collectionData";
import CategoryCard from "../cards/CategoryCard";

function HomeCollections() {
  return (
    <>
      <div className="container  ">
        <h4>VIEW OUR COLLECTIONS</h4>
        <div className="row g-2">
          {collectionData.map((value, index) => {
            return (
              <CategoryCard
                title={value.title}
                image={value.imgURL}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomeCollections;
