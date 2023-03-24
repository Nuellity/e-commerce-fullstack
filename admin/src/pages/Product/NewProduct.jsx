import React, { useState } from "react";
import Header from "../../components/Header";
import {
  TextField,
  useTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  OutlinedInput,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { tokens } from "../../theme";
import e from "cors";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  "Home",
  "Tech",
  "Woman",
  "Man",
  "Pet",
  "Accessories",
  "Trending",
  "BestSeller",
  "Electronics",
  "Gadgets",
];

const sizes = ["XS", "S", "M", "L", "X", "XL", "XXL", "XXXL"];

function getStyles(name, category, theme) {
  return {
    fontWeight:
      category.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function NewProduct() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [category, setCategory] = useState([]);
  const [size, setSize] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
    inStock: "",
  });
  const [image, setImage] = useState(null);
  console.log(input, size, category);
  const handleFileChange = (event) => {
    setImage(event.target.files);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleSizeChange = (event) => {
    const {
      target: { value },
    } = event;
    setSize(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleInputChange = (event) => {
    setInput((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(colors.grey[100]),
    backgroundColor: colors.blueAccent[400],
    width: "100%",
    height: "40px",
    fontSize: "13px",
    "&:hover": {
      backgroundColor: colors.blueAccent[600],
    },
  }));

  return (
    <div className="container">
      <div className="p-1">
        <Header title="New Product" subTitle="Add a new product" />
      </div>
      <div className="row pb-5">
        <Box
          backgroundColor={colors.primary[400]}
          component="div"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            padding: "10px",
            height: "100%",
          }}
        >
          <div className="col-lg-5 p-3">
            <form onSubmit={handleSubmit}>
              <div className="col my-4">
                <div>
                  <label htmlFor="file" style={{ fontSize: "15px" }}>
                    <FileUploadOutlinedIcon /> Upload Image
                  </label>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="col my-4">
                <TextField
                  name="title"
                  value={input.title}
                  onChange={handleInputChange}
                  label="Name"
                  type="text"
                  variant="outlined"
                  placeholder="Enter product name"
                  InputLabelProps={{
                    style: { color: colors.greenAccent[400] },
                  }}
                  fullWidth
                />
              </div>
              <div className="col my-4">
                <TextField
                  name="description"
                  label="Description"
                  type="text"
                  value={input.description}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Enter product description"
                  InputLabelProps={{
                    style: { color: colors.greenAccent[400] },
                  }}
                  fullWidth
                />
              </div>
              <div className="col my-4">
                <TextField
                  name="price"
                  label="Price($)"
                  type="number"
                  value={input.price}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Enter product price"
                  InputLabelProps={{
                    style: { color: colors.greenAccent[400] },
                  }}
                  fullWidth
                />
              </div>
              <div className="col my-4">
                <TextField
                  name="count"
                  label="Stock"
                  type="number"
                  value={input.count}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Enter stock amount"
                  InputLabelProps={{
                    style: { color: colors.greenAccent[400] },
                  }}
                  fullWidth
                />
              </div>
              <div className="col my-4">
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      fontSize: "15px",
                      color: colors.greenAccent[400],
                      "&.Mui-focused": {
                        color: colors.greenAccent[400],
                      },
                    }}
                    id="demo-simple-select-label"
                  >
                    Status
                  </InputLabel>
                  <Select
                    name="inStock"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={input.inStock}
                    label="Status"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">
                      <em>Select option</em>
                    </MenuItem>
                    <MenuItem value={true}>Available</MenuItem>
                    <MenuItem value={false}>Out of Stock</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col my-4">
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-multiple-chip-label"
                    sx={{
                      fontSize: "15px",
                      color: colors.greenAccent[400],
                      "&.Mui-focused": {
                        color: colors.greenAccent[400],
                      },
                    }}
                  >
                    Sizes
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    displayEmpty
                    value={size}
                    label="Size"
                    onChange={handleSizeChange}
                    input={<OutlinedInput label="Chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                    variant="outlined"
                  >
                    <MenuItem value="" disabled>
                      <em>Select sizes</em>
                    </MenuItem>
                    {sizes.map((name) => {
                      const style = getStyles(name, size, theme);
                      return (
                        <MenuItem key={name} value={name} style={style}>
                          {name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="col my-4">
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-multiple-chip-label"
                    sx={{
                      fontSize: "15px",
                      color: colors.greenAccent[400],
                      "&.Mui-focused": {
                        color: colors.greenAccent[400],
                      },
                    }}
                  >
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    displayEmpty
                    value={category}
                    label="Categories"
                    onChange={handleChange}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                    variant="outlined"
                  >
                    <MenuItem value="" disabled>
                      <em>Select categories</em>
                    </MenuItem>
                    {categories.map((name) => {
                      const style = getStyles(name, category, theme);
                      return (
                        <MenuItem key={name} value={name} style={style}>
                          {name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="my-2 d-flex justify-content-end">
                <ColorButton type="submit">Add Product</ColorButton>
              </div>
            </form>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default NewProduct;
