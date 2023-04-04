import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ShopIcon from "@mui/icons-material/Shop";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#212121",
    },
  },
});

function TopCarousel() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <section className="main-home">
        <div className="mx-5 main-text">
          <h1>
            New Winter
            <br />
            Collection
          </h1>
          <p> There's Nothing like Trend</p>
          <Button
            color="primary"
            onClick={() => navigate("/products")}
            variant="contained"
            className="animate__animated animate__fadeInUp"
            style={{ animationDelay: "3s" }}
            startIcon={<ShopIcon />}
          >
            SHOP NOW
          </Button>
        </div>
      </section>
    </ThemeProvider>
  );
}

export default TopCarousel;

//  <div
//         id="carouselExampleCaptions"
//         className="carousel slide"
//         data-bs-ride="false"
//       >
//         <div className="carousel-indicators">
//           <button
//             type="button"
//             data-bs-target="#carouselExampleCaptions"
//             data-bs-slide-to="0"
//             className="active"
//             aria-current="true"
//             aria-label="Slide 1"
//           ></button>
//           <button
//             type="button"
//             data-bs-target="#carouselExampleCaptions"
//             data-bs-slide-to="1"
//             aria-label="Slide 2"
//           ></button>
//           <button
//             type="button"
//             data-bs-target="#carouselExampleCaptions"
//             data-bs-slide-to="2"
//             aria-label="Slide 3"
//           ></button>
//         </div>
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <img
//               src="https://images.pexels.com/photos/2528116/pexels-photo-2528116.jpeg?auto=compress&cs=tinysrgb&w=800"
//               className="d-block w-100"
//               alt="..."
//             />
//             <div className="text-block">
//               <h2>Welcome to Ayaba store!</h2>
//
//             </div>
//           </div>
//           <div className="carousel-item">
//             <img
//               src="https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//               className="d-block w-100"
//               alt="..."
//             />
//             <div className="text-block">
//               <h2>Check out our wide range of computer</h2>
//               <Button  onClick={() => navigate("/products")} variant="contained">SHOP NOW</Button>
//             </div>
//           </div>
//           <div className="carousel-item">
//             <img
//               src="https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg"
//               className="d-block w-100"
//               alt="..."
//             />
//             <div className="text-block">
//               <h2>Great selection of high-quality home gadgets</h2>
//               <Button  onClick={() => navigate("/products")} variant="contained">SHOP NOW</Button>
//             </div>
//           </div>
//         </div>
//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#carouselExampleCaptions"
//           data-bs-slide="prev"
//         >
//           <span
//             className="carousel-control-prev-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#carouselExampleCaptions"
//           data-bs-slide="next"
//         >
//           <span
//             className="carousel-control-next-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>

{
  /* <div
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
        alt="slide1"
      />
      <div className="carousel-caption">
        <h5
          className="animate__animated animate__fadeInDown"
          style={{ animationDuration: "1s" }}
        >
          Welcome to Ayaba Store!
        </h5>
        <p
          className="animate__animated animate__fadeInDown d-none d-md-block"
          style={{ animationDelay: "2s" }}
        >
          Some representative placeholder content for the first slide.
        </p>
        <Button
          color="error"
          onClick={() => navigate("/products")}
          variant="contained"
          className="animate__animated animate__fadeInUp"
          style={{ animationDelay: "3s" }}
        >
          SHOP NOW
        </Button>
      </div>
    </div>
    <div className="carousel-item">
      <img
        src="https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg"
        className="d-block w-100"
        alt="slide2"
      />
      <div className="carousel-caption">
        <h5
          className="animate__animated animate__fadeInDown"
          style={{ animationDuration: "1s" }}
        >
          Explore Wide Range of Computer Accesories
        </h5>
        <p
          className="animate__animated animate__fadeInDown d-none d-md-block"
          style={{ animationDelay: "2s" }}
        >
          Some representative placeholder content for the second slide.
        </p>
        <Button
          color="error"
          onClick={() => navigate("/products")}
          variant="contained"
          className="animate__animated animate__fadeInUp"
          style={{ animationDelay: "3s" }}
        >
          SHOP NOW
        </Button>
      </div>
    </div>
    <div className="carousel-item">
      <img
        src="https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        className="d-block w-100"
        alt="slide3"
      />
      <div className="carousel-caption">
        <h5
          className="animate__animated animate__fadeInDown"
          style={{ animationDuration: "1s" }}
        >
          Great Selection Of High-Quality Home Gadgets
        </h5>
        <p
          className="animate__animated animate__fadeInDown d-none d-md-block"
          style={{ animationDelay: "2s" }}
        >
          Some representative placeholder content for the third slide.
        </p>
        <Button
          color="error"
          onClick={() => navigate("/products")}
          variant="contained"
          className="animate__animated animate__fadeInUp"
          style={{ animationDelay: "3s" }}
        >
          SHOP NOW
        </Button>
      </div>
    </div>
  </div>
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExampleCaptions"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleCaptions"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>; */
}
