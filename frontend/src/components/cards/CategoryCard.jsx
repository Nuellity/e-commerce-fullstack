import React from "react";

function CategoryCard(props) {
  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-6 col-6">
        <div className="card-category">
          <div className="card-category-header">
            <h4>{props.title}</h4>
          </div>
          <div className="card-category-body">
            <a href="2">
              <div>
                <img src={props.image} alt={props.title}  className="img-fluid" />
              </div>
            </a>
          </div>

          <div className="card-category-footer">
            <a href="2">{props.action}</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryCard;
