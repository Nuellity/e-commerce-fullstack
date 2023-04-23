import React from "react";
import "../Homepage/home.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material/";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function BlogDetails() {
  return (
    <>
      <Navbar />
      <div sx={{ padding: 0, margin: 0 }} id="back-to-top-anchor" />
      <div style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}>
        <div className="container py-5">
          <div>
            <img
              src="/images/img/cart/cart.jpg"
              alt="blog-img"
              className="img-fluid"
            />
          </div>
          <div className="w-50 mx-auto">
            <div>
              <h1 className="text-center blog-title pt-5 pb-2">
                The World’s Most Dangerous Technology Ever Made.
              </h1>
              <p className="text-center pb-4 blog-date">May 7, 2019.</p>
            </div>
            <div className="blog-content">
              <p>
                Commodo labore ut nisi laborum amet eu qui magna ullamco ut
                labore. Aliquip consectetur labore consectetur dolor
                exercitation est minim quis. Magna non irure qui ex est laborum
                nulla excepteur qui. Anim Lorem dolore cupidatat pariatur ex
                tempor.
              </p>
              <p>
                Duis ea excepteur proident ex commodo irure est. Nisi commodo
                qui pariatur enim sint laborum consequat enim in officia.
                Officia fugiat incididunt commodo et mollit aliqua non aute.
                Enim dolor eiusmod aliqua amet ipsum in enim eiusmod.
              </p>
              <p>
                Quis exercitation sit velit duis. Est Lorem labore consectetur
                minim sit eu eiusmod mollit velit. Consectetur voluptate ex amet
                id eiusmod laborum irure. Aliquip ad qui id exercitation irure
                amet commodo nisi quis. Occaecat minim incididunt eiusmod
                nostrud veniam quis culpa. Nisi ipsum et consequat id deserunt
                excepteur. Cillum non pariatur culpa ut occaecat laboris eu.
                Ullamco ad Lorem et elit laboris eu qui irure nulla qui culpa
                et. Cupidatat sunt ipsum proident aute exercitation do tempor
                aliqua cupidatat quis non exercitation. Adipisicing do minim
                dolore nulla mollit. Adipisicing incididunt irure ipsum et in
                esse ipsum elit tempor. Aliquip mollit sunt qui irure
              </p>
              <p>
                Irure ullamco Lorem excepteur dolor qui ea ad quis. Enim fugiat
                cillum enim ad occaecat sint qui elit labore mollit sunt laborum
                fugiat consequat. Voluptate labore sunt duis eu deserunt.
                Occaecat do ut ut labore cillum enim dolore ad enim enim id.
                Aliquip do veniam ad excepteur ad cillum qui deserunt nostrud
                sunt aliqua duis sunt occaecat. Laborum incididunt commodo
                ullamco proident quis.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollTop>
        <Fab size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon sx={{ fontSize: 40 }} />
        </Fab>
      </ScrollTop>
    </>
  );
}

export default BlogDetails;
