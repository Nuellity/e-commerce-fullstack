import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  useTheme,
  Typography,
  Avatar,
  Button,
  TextField,
  FormControl,
  Chip,
  OutlinedInput,
  Select,
  InputLabel,
  MenuItem,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Chart from "../../components/Chart";
import { userRequest } from "../../axiosRequest";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../fireBase";
import { updateProduct } from "../../redux/ApiCalls";

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

function SingleProduct() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [size, setSize] = useState([]);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
    inStock: false,
    count: "",
  });
  const [productStats, setProductStats] = useState([
    { name: "Jan", Sales: 0 },
    { name: "Feb", Sales: 0 },
    { name: "Mar", Sales: 0 },
    { name: "Apr", Sales: 0 },
    { name: "May", Sales: 0 },
    { name: "Jun", Sales: 0 },
    { name: "Jul", Sales: 0 },
    { name: "Aug", Sales: 0 },
    { name: "Sep", Sales: 0 },
    { name: "Oct", Sales: 0 },
    { name: "Nov", Sales: 0 },
    { name: "Dec", Sales: 0 },
  ]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const isFetching = useSelector((state) => state.product.isFetching);

  const months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const handleFileChange = (event) => {
    setImages((prevImages) => [
      ...prevImages,
      {
        original: event.target.files[0],
        thumbnail: event.target.files[0],
      },
    ]);
  };

  const handleInputChange = (event) => {
    setInput((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
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
      const updatedProduct = {};
      Object.keys(input).forEach((key) => {
        if (input[key]) {
          updatedProduct[key] = input[key];
        }
      });
      if (category.length > 0) {
        updatedProduct.categories = category;
      }
      if (size.length > 0) {
        updatedProduct.size = size;
      }
      if (imgArray.length > 0) {
        updatedProduct.img = imgArray;
      }
      updateProduct(productId, updatedProduct, dispatch);
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

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get(`orders/income?pid=${productId}`);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setProductStats((prev) => {
            const index = prev.findIndex(
              (user) => user.name === months[item._id - 1]
            );
            if (index !== -1) {
              const updatedItem = {
                ...prev[index],
                Sales: item.totalOrders,
              };
              return [
                ...prev.slice(0, index),
                updatedItem,
                ...prev.slice(index + 1, 12),
              ];
            }
            return prev;
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, months]);

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
    <>
      <div className="container">
        <div className=" my-3  align-items-center">
          <Header title="Product Details" subTitle="Edit product details" />
        </div>
        <div className="row g-3">
          <div className="col-lg-5 ">
            <Box
              backgroundColor={colors.primary[400]}
              component="div"
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                padding: "10px",
                height: "100%",
              }}
            >
              <Box
                p="10px 20px 0 20px"
                className="d-flex justify-content-start align-items-center"
                component="div"
              >
                <Box component="div">
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    color={colors.greenAccent[300]}
                    mb="10px"
                  >
                    Sales Performance
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                component="div"
                mr="8px"
                height={120}
              >
                <Chart data={productStats} dataKey="Sales" />
              </Box>
            </Box>
          </div>
          <div className="col-lg-7 ">
            <Box
              backgroundColor={colors.primary[400]}
              component="div"
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                padding: "10px",
                height: "100%",
              }}
            >
              <div className="d-flex justify-content-start align-items-center ">
                <Avatar
                  src={product.img[0].original}
                  alt=""
                  sx={{ width: 100, height: 100 }}
                />
                <Typography
                  variant="h4"
                  fontWeight="600"
                  color={colors.redAccent[200]}
                  ml="15px"
                >
                  {product.title}
                </Typography>
              </div>
              <div className="d-flex flex-column col-5 mt-4">
                <div className="d-flex justify-content-between">
                  <Typography fontWeight="bold">id:</Typography>
                  <Typography>{product._id}</Typography>
                </div>
                <div className="d-flex justify-content-between">
                  <Typography fontWeight="bold">status:</Typography>
                  <Typography>
                    {product.inStock === true ? "Available" : "Out of Stock"}
                  </Typography>
                </div>
                <div className="d-flex justify-content-between">
                  <Typography fontWeight="bold">stock:</Typography>
                  <Typography>{product.count}</Typography>
                </div>
              </div>
            </Box>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <Box
              backgroundColor={colors.primary[400]}
              component="div"
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                padding: "20px",
              }}
            >
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="col my-2">
                      <TextField
                        name="title"
                        label="Product Name"
                        variant="standard"
                        value={input.title}
                        onChange={handleInputChange}
                        placeholder={product.title}
                        InputLabelProps={{
                          style: { color: colors.greenAccent[400] },
                        }}
                        fullWidth
                      />
                    </div>
                    <div className="col my-2">
                      <TextField
                        name="description"
                        label="Product Description"
                        value={input.description}
                        onChange={handleInputChange}
                        variant="standard"
                        placeholder={product.description}
                        InputLabelProps={{
                          style: { color: colors.greenAccent[400] },
                        }}
                        fullWidth
                      />
                    </div>
                    <div className="col my-2">
                      <TextField
                        name="price"
                        label="Price($)"
                        value={input.price}
                        onChange={handleInputChange}
                        type="number"
                        variant="standard"
                        placeholder={product.price.toString()}
                        InputLabelProps={{
                          style: { color: colors.greenAccent[400] },
                        }}
                        fullWidth
                      />
                    </div>
                    <div className="col my-2">
                      <TextField
                        name="count"
                        label="In Stock"
                        value={input.count}
                        onChange={handleInputChange}
                        type="number"
                        placeholder={product.count.toString()}
                        variant="standard"
                        InputLabelProps={{
                          style: { color: colors.greenAccent[400] },
                        }}
                        fullWidth
                      />
                    </div>
                    <div className="col mt-4">
                      <FormControl variant="standard" fullWidth>
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
                          <MenuItem value={true}>Available</MenuItem>
                          <MenuItem value={false}>Out of Stock</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col mt-4">
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
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
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
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Chip"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
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
                  </div>
                  <div className="col-lg-5">
                    <div className="d-flex justify-content-end my-3">
                      <div className="col my-4 ">
                        <div className="mb-2">
                          <Typography
                            fontWeight="600"
                            color={colors.greenAccent[500]}
                          >
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

                          <input
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div style={{ display: progress > 0 ? "block" : "none" }}>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        valueBuffer={buffer}
                        color="secondary"
                      />
                    </div>
                    <ColorButton type="submit">
                      {isFetching ? (
                        <CircularProgress color="success" />
                      ) : (
                        "Update Product"
                      )}
                    </ColorButton>
                  </div>
                </div>
              </form>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
