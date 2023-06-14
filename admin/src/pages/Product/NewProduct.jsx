import React, { useState } from "react";
import Header from "../../components/Header";
import {
  TextField,
  useTheme,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  OutlinedInput,
  Box,
  Button,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { tokens } from "../../theme";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../fireBase";
import { addProduct } from "../../redux/ApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const categories = [
  "Gaming Chairs",
  "Audio",
  "All Flat-Screen TVs",
  "Laptops",
  "Trending",
  "BestSeller",
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
  const [images, setImages] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
    inStock: false,
    count: "",
  });
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const isFetching = useSelector((state) => state.product.isFetching);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setImages((prevImages) => [
      ...prevImages,
      {
        original: event.target.files[0],
        thumbnail: event.target.files[0],
      },
    ]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageStore = images.map((image) => {
      const now = new Date();
      const timestamp = now.getTime();
      const originalImage = `original_${timestamp}_${image.original.name}`;
      const thumbnailImage = `thumbnail_${timestamp}_${image.thumbnail.name}`;
      return {
        original: originalImage,
        thumbnail: thumbnailImage,
        originalFile: image.original,
        thumbnailFile: image.thumbnail,
      };
    });
    const storage = getStorage(app);

    try {
      const imgArray = [];
      for (const image of imageStore) {
        const originalRef = ref(storage, image.original);
        const thumbnailRef = ref(storage, image.thumbnail);

        const originalUploadTask = uploadBytesResumable(
          originalRef,
          image.originalFile
        );
        const thumbnailUploadTask = uploadBytesResumable(
          thumbnailRef,
          image.thumbnailFile
        );

        originalUploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
            console.log(`Original image upload is ${progress}% done`);
          },
          (error) => {
            console.error(error);
          },
          () => {
            console.log(`Original image upload completed: ${image.original}`);
          }
        );

        await new Promise((resolve, reject) => {
          thumbnailUploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setBuffer(progress);
              console.log(`Thumbnail image upload is ${progress}% done`);
            },
            (error) => {
              console.error(error);
              reject(error);
            },
            () => {
              console.log(
                `Thumbnail image upload completed: ${image.thumbnail}`
              );
              resolve();
            }
          );
        });

        const [originalUrl, thumbnailUrl] = await Promise.all([
          getDownloadURL(originalRef),
          getDownloadURL(thumbnailRef),
        ]);

        imgArray.push({ original: originalUrl, thumbnail: thumbnailUrl });
        console.log("Original image URL:", originalUrl);
        console.log("Thumbnail image URL:", thumbnailUrl);
      }
      const product = {
        ...input,
        img: imgArray,
        categories: category,
        size: size,
      };
      addProduct(product, dispatch);
      navigate("/products");
    } catch (error) {
      console.error(error);
    } finally {
      setProgress(0);
      setBuffer(0);
    }
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(colors.grey[100]),
    backgroundColor: colors.blueAccent[400],
    "&:hover": {
      backgroundColor: colors.blueAccent[600],
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: "8rem",
      height: "2.5rem",
      fontSize: "0.7rem",
    },
    [theme.breakpoints.up("md")]: {
      width: "12.5rem",
      height: "2.5rem",
      fontSize: "1rem",
    },
  }));

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        backgroundColor: colors.primary[400],
      },
    },
  };

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
              <div className="col my-4 ">
                <div className="mb-2">
                  <Typography fontWeight="600" color={colors.greenAccent[500]}>
                    <FileUploadOutlinedIcon />
                    Upload product images
                  </Typography>
                </div>
                <div className="">
                  <input
                    style={{ marginBottom: "10px" }}
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                  />

                  <input
                    style={{ marginBottom: "10px" }}
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                  />

                  <input
                    style={{ marginBottom: "10px" }}
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                  />

                  <input type="file" id="file" onChange={handleFileChange} />
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>
              <div className="col my-4">
                <FormControl fullWidth required>
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
                <FormControl fullWidth required>
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
              <div style={{ display: progress > 0 ? "block" : "none" }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  valueBuffer={buffer}
                  color="secondary"
                />
              </div>
              <div className="my-2 d-flex justify-content-end">
                <ColorButton type="submit">
                  {isFetching ? (
                    <CircularProgress color="success" />
                  ) : (
                    "Add Product"
                  )}
                </ColorButton>
              </div>
            </form>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default NewProduct;
