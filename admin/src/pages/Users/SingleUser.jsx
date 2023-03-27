import React, { useState } from "react";
import {
  useTheme,
  Box,
  Typography,
  Button,
  Avatar,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LocationSearchingOutlinedIcon from "@mui/icons-material/LocationSearchingOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../fireBase";
import { updateCustomer } from "../../redux/ApiCalls";

function SingleUser() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [file, setFile] = useState(null);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [address, setAddress] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customerId = location.pathname.split("/")[2];
  const customer = useSelector((state) =>
    state.customer.customers.find((customer) => customer._id === customerId)
  );

  const handleInputChange = (event) => {
    setInput((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  const handleAddressChange = (event) => {
    setAddress((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let product = {};

    const updatedCustomer = {};
    Object.keys(input).forEach((key) => {
      if (input[key]) {
        updatedCustomer[key] = input[key];
      }
    });
    const updatedAddress = {};
    Object.keys(address).forEach((key) => {
      if (address[key]) {
        updatedAddress[key] = address[key];
      }
    });
    if (file && typeof file !== "undefined") {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = {
              ...updatedCustomer,
              address: updatedAddress,
              img: downloadURL,
            };
            console.log(product);
            updateCustomer(customerId, product, dispatch);
            navigate("/users");
          });
        }
      );
    } else {
      product = {
        ...updatedCustomer,
        address: updatedAddress,
      };
      updateCustomer(customerId, product, dispatch);
      navigate("/users");
      console.log(product);
    }
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(colors.grey[100]),
    backgroundColor: colors.blueAccent[400],
    "&:hover": {
      backgroundColor: colors.blueAccent[600],
    },
  }));

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="container">
          <div>
            <Header title="Edit User" subTitle="Edit User Details" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 ">
          <Box
            component="div"
            backgroundColor={colors.primary[400]}
            sx={{
              height: "100%",
              padding: "20px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <div className="d-flex align-items-center">
              <Avatar src={customer.img} alt="" />
              <div className="mx-3">
                <Typography color={colors.greenAccent[100]} fontWeight="600">
                  {customer.firstName} {customer.lastName}
                </Typography>
                <Typography
                  color={colors.greenAccent[100]}
                  fontSize="13px"
                  fontWeight="300"
                >
                  {" "}
                  {customer.isAdmin ? "Admin" : "Customer"}
                </Typography>
              </div>
            </div>

            <div className="mt-5">
              <Typography className="my-3" color={colors.grey[200]}>
                Contact Details
              </Typography>

              <div className="my-2">
                <MailOutlineOutlinedIcon sx={{ marginRight: "7px" }} />
                <span style={{ color: colors.greenAccent[400] }}>
                  {customer.email}
                </span>
              </div>
              <div className="my-2">
                <LocationSearchingOutlinedIcon sx={{ marginRight: "7px" }} />
                <span style={{ color: colors.greenAccent[400] }}>
                  {/* {customer.address.state}| {customer.address.country} */}
                </span>
              </div>
            </div>
          </Box>
        </div>
        <div className="col-lg-9">
          <Box
            backgroundColor={colors.primary[400]}
            component="div"
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              padding: "20px",
              height: "100%",
            }}
          >
            <Typography variant="h4" fontWeight="600" color={colors.grey[200]}>
              Edit
            </Typography>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-7">
                  <div className="col my-2">
                    <TextField
                      name="firstName"
                      label="First Name"
                      onChange={handleInputChange}
                      value={input.firstName}
                      variant="standard"
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="col my-2">
                    <TextField
                      name="lastName"
                      label="Last Name"
                      variant="standard"
                      onChange={handleInputChange}
                      value={input.lastName}
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="col my-2">
                    <TextField
                      name="email"
                      type="email"
                      label="Email"
                      variant="standard"
                      onChange={handleInputChange}
                      value={input.email}
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="col my-2">
                    <TextField
                      name="address"
                      label="Address"
                      variant="standard"
                      onChange={handleAddressChange}
                      value={address.address}
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="col my-2">
                    <TextField
                      name="city"
                      label="City"
                      variant="standard"
                      onChange={handleAddressChange}
                      value={address.city}
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="col my-2">
                    <TextField
                      name="state"
                      label="State"
                      variant="standard"
                      onChange={handleAddressChange}
                      value={address.state}
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="col my-2">
                    <TextField
                      name="country"
                      label="Country"
                      variant="standard"
                      onChange={handleAddressChange}
                      value={address.country}
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="col my-2">
                    <TextField
                      name="zipcode"
                      label="ZipCode"
                      type="number"
                      variant="standard"
                      onChange={handleAddressChange}
                      value={address.zipcode}
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="">
                    <div className="w-50">
                      <div>
                        <Typography
                          variant="h6"
                          sx={{
                            color: colors.greenAccent[400],
                            marginBottom: "5px",
                          }}
                        >
                          Change profile picture
                        </Typography>
                        <input
                          type="file"
                          id="file"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <ColorButton type="submit" style={{ width: "120px" }}>
                    UPDATE USER
                  </ColorButton>
                </div>
              </div>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default SingleUser;
