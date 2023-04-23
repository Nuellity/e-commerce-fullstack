import React from "react";

function BlogCard(props) {
  return (
    <>
      <div className="blog-img">
        <img className="img-fluid w-100" src={props.image} alt="" />
      </div>
      <h3 className="text-center blog-title pt-3">{props.title}</h3>
      <p className="text-center blog-date" style={{ color: "grey" }}>
        {props.date}
      </p>
    </>
  );
}

export const SmallBlogCard = (props) => {
  return (
    <>
      <div className="blog-col col-lg-4 col-md-6 pb-5">
        <div className="blog-img ">
          <img
            className="img-fluid  w-100"
            src={props.image}
            alt=""
            style={{ borderRadius: "30px" }}
          />
        </div>
        <h4 className="text-center small-blog font-weight-normal pt-3">
          {props.title}
        </h4>
      </div>
    </>
  );
};

export default BlogCard;
