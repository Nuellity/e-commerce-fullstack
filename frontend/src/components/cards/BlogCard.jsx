import React from "react";

function BlogCard(props) {
  return (
    <>
      <div className="blog-img">
        <img className="img-fluid w-100" src={props.image} alt="" />
      </div>
      <h3 className="text-center font-weight-normal pt-3">{props.title}</h3>
      <p className="text-center" style={{ color: "grey" }}>
        {props.date}
      </p>
    </>
  );
}

export default BlogCard;
