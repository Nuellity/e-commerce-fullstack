import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  useTheme,
  Typography,
  Avatar,
  Button,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Chart from "../../components/Chart";
import { userRequest } from "../../axiosRequest";

function SingleProduct() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [age, setAge] = useState("");
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
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
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
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(colors.grey[100]),
    backgroundColor: colors.blueAccent[400],
    "&:hover": {
      backgroundColor: colors.blueAccent[600],
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

  return (
    <>
      <div className="container">
        <div className=" my-3 d-flex justify-content-between align-items-center">
          <Header title="Product Details" subTitle="Edit product details" />
          <div>
            <ColorButton
              onClick={() => navigate("/newproduct")}
              style={{ width: "100px" }}
              variant="contained"
            >
              create
            </ColorButton>
          </div>
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
                  sx={{ width: 75, height: 75 }}
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
              <form>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="col my-2">
                      <TextField
                        label="Product Name"
                        variant="standard"
                        placeholder={product.title}
                        InputLabelProps={{
                          style: { color: colors.greenAccent[400] },
                        }}
                        fullWidth
                      />
                    </div>
                    <div className="col my-2">
                      <TextField
                        label="Product Description"
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
                        label="Price"
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
                        label="In Stock"
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
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          label="Status"
                          onChange={handleChange}
                        >
                          <MenuItem value={true}>Available</MenuItem>
                          <MenuItem value={false}>Out of Stock</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="d-flex justify-content-end my-3">
                      <div className="d-flex justify-content-evenly w-50">
                        <div className="px-2">
                          <Avatar
                            sx={{ width: 100, height: 100 }}
                            src={product.img[0].original}
                            alt=""
                          />
                        </div>
                        <div>
                          <label htmlFor="file">
                            <FileUploadOutlinedIcon /> Upload
                          </label>
                          <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <ColorButton
                      style={{
                        width: "100px",
                        backgroundColor: colors.greenAccent[400],
                      }}
                    >
                      Update
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
