import React, { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material/";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocation } from "react-router-dom";
import AllProducts from "./AllProducts";

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

function ProductList() {
  const [filter, setFilter] = useState("new");

  const location = useLocation();
  const category = decodeURIComponent(location.pathname.split("/")[2]);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div sx={{ padding: 0, margin: 0 }} id="back-to-top-anchor" />
      <div style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}>
        <div className="container">
          <h3 style={{ paddingTop: "2.4em" }}>
            {!category ? "All Products" : category}
          </h3>
          <div className="pt-2 d-flex justify-content-start">
            <Box sx={{ width: 250 }}>
              <FormControl fullWidth>
                <InputLabel>Filter</InputLabel>
                <Select value={filter} label="Filter" onChange={handleChange}>
                  <MenuItem value={"new"}>Newest</MenuItem>
                  <MenuItem value={"highPrice"}>Price: High to Low</MenuItem>
                  <MenuItem value={"lowPrice"}>Price: Low to High</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <AllProducts category={category} filter={filter} />
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

export default ProductList;
