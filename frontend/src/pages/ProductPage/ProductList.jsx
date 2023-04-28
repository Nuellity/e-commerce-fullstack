import React, { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Pagination from "@mui/material/Pagination";
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material/";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
  const category = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div sx={{ padding: 0, margin: 0 }} id="back-to-top-anchor" />
      <div style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}>
        <div className="container">
          <h3 style={{ paddingTop: "2em" }}>
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
                  <MenuItem value={"popular"}>Popularity</MenuItem>
                  <MenuItem value={"discount"}>Discount</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <AllProducts category={category} filter={filter} />
          <Stack mt={2} spacing={2} sx={{ padding: "1.5em 0" }}>
            <Pagination
              count={7}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                />
              )}
            />
          </Stack>
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
