import React, { useEffect, useState } from "react";
import { TextField, Autocomplete, InputAdornment } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/ApiCalls";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchValue, setSearchValue] = useState(null);
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = () => {
      getProducts(dispatch);
    };
    fetchProduct();
  }, [dispatch]);

  useEffect(() => {
    const handleSearch = (searchValue) => {
      if (searchValue && searchValue.trim() !== "") {
        const selectedProduct = products.find(
          (product) => product.title === searchValue
        );

        if (selectedProduct) {
          navigate(`/product/${selectedProduct._id}`);
          window.location.reload();
        }
      }
    };

    handleSearch(searchValue);
  }, [searchValue, products, navigate]);

  return (
    <Autocomplete
      disableClearable
      options={products.map((option) => option.title)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          type="search"
          placeholder="Search..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon style={{ cursor: "pointer" }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      value={searchValue}
      onChange={(event, value) => {
        setSearchValue(value);
      }}
    />
  );
}

export default SearchBar;
