import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  Typography,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  FilledInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../fireBase";
import { addCustomer } from "../../redux/ApiCalls";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipcode: "",
};

const userSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup.string().required("required"),
  address: yup.string().required("required"),
  city: yup.string().required("required"),
  state: yup.string().required("required"),
  country: yup.string().required("required"),
  zipcode: yup.string().required("required"),
});

function NewUser() {
  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(colors.grey[100]),
    backgroundColor: colors.greenAccent[400],
    "&:hover": {
      backgroundColor: colors.greenAccent[600],
    },
  }));

  const validate = (values) => {
    const errors = {};

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = (values) => {
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
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          const user = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            address: {
              address: values.address,
              city: values.city,
              state: values.state,
              country: values.country,
              zipcode: values.zipcode,
            },
            img: downloadURL,
          };
          console.log(user);
          addCustomer(user, dispatch);
        });
      }
    );
  };

  return (
    <Box m="20px">
      <Header title="Create User" subTitle="Create a New User Profile" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
        validate={validate}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <div className="row">
            <div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6 my-2">
                    <div>
                      <Typography
                        variant="h6"
                        sx={{
                          color: colors.greenAccent[400],
                          marginBottom: "5px",
                        }}
                      >
                        Upload profile picture
                      </Typography>
                      <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 my-2">
                    <TextField
                      label="First Name"
                      variant="filled"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={!!touched.firstName && !!errors.firstName}
                      helperText={
                        touched.firstName && errors.firstName
                          ? errors.firstName
                          : ""
                      }
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="col-lg-6 my-2">
                    <TextField
                      label="Last Name"
                      variant="filled"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={!!touched.lastName && !!errors.lastName}
                      helperText={
                        touched.lastName && errors.lastName
                          ? errors.lastName
                          : ""
                      }
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <FormControl
                      margin="normal"
                      required
                      fullWidth
                      variant="filled"
                    >
                      <InputLabel
                        htmlFor="filled-adornment-password"
                        sx={{ color: colors.greenAccent[400] }}
                      >
                        Password
                      </InputLabel>
                      <FilledInput
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.password && !!errors.password}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                      <FormHelperText>
                        {touched.password && errors.password
                          ? errors.password
                          : ""}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className="col-lg-6 pb-3">
                    <FormControl
                      margin="normal"
                      required
                      fullWidth
                      variant="filled"
                    >
                      <InputLabel
                        htmlFor="filled-adornment-confirmPassword"
                        sx={{ color: colors.greenAccent[400] }}
                      >
                        Confirm Password
                      </InputLabel>
                      <FilledInput
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched.confirmPassword && !!errors.confirmPassword
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm Password"
                      />
                      <FormHelperText>
                        {touched.confirmPassword && errors.confirmPassword
                          ? errors.confirmPassword
                          : ""}
                      </FormHelperText>
                    </FormControl>
                  </div>
                </div>
                <div className="col my-2">
                  <TextField
                    label="Email"
                    variant="filled"
                    type="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={
                      touched.email && errors.email ? errors.email : ""
                    }
                    InputLabelProps={{
                      style: { color: colors.greenAccent[400] },
                    }}
                    fullWidth
                  />
                </div>
                <div className="col my-2">
                  <TextField
                    label="Address"
                    variant="filled"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    name="address"
                    error={!!touched.address && !!errors.address}
                    helperText={
                      touched.address && errors.address ? errors.address : ""
                    }
                    InputLabelProps={{
                      style: { color: colors.greenAccent[400] },
                    }}
                    fullWidth
                  />
                </div>
                <div className="row">
                  <div className="col-lg-3 my-2">
                    <TextField
                      label="City"
                      variant="filled"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.city}
                      name="city"
                      error={!!touched.city && !!errors.city}
                      helperText={
                        touched.city && errors.city ? errors.city : ""
                      }
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="col-lg-3 my-2">
                    <TextField
                      label="State"
                      variant="filled"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.state}
                      name="state"
                      error={!!touched.state && !!errors.state}
                      helperText={
                        touched.state && errors.state ? errors.state : ""
                      }
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="col-lg-3 my-2">
                    <TextField
                      label="Country"
                      variant="filled"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.country}
                      name="country"
                      error={!!touched.country && !!errors.country}
                      helperText={
                        touched.country && errors.country ? errors.country : ""
                      }
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="col-lg-3 my-2">
                    <TextField
                      label="Zipcode"
                      variant="filled"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.zipcode}
                      name="zipcode"
                      error={!!touched.zipcode && !!errors.zipcode}
                      helperText={
                        touched.zipcode && errors.zipcode ? errors.zipcode : ""
                      }
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <ColorButton type="submit">create new user</ColorButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </Box>
  );
}

export default NewUser;
