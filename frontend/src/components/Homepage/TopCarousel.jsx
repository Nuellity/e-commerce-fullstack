import React from "react";
import Button from "@mui/material/Button";

function TopCarousel() {
  return (
    <>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="false"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.pexels.com/photos/2528116/pexels-photo-2528116.jpeg?auto=compress&cs=tinysrgb&w=800"
              className="d-block w-100"
              alt="..."
            />
            <div className="text-block">
              <h2>Welcome to Ayaba store!</h2>
              <Button variant="contained">SHOP NOW</Button>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="d-block w-100"
              alt="..."
            />
            <div className="text-block">
              <h2>Check out our wide range of computer</h2>
              <Button variant="contained">SHOP NOW</Button>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg"
              className="d-block w-100"
              alt="..."
            />
            <div className="text-block">
              <h2>Great selection of high-quality home gadgets</h2>
              <Button variant="contained">SHOP NOW</Button>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default TopCarousel;
