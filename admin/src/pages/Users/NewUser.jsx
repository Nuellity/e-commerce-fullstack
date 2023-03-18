import React from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "PhoneNumber not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});

function NewUser() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(colors.grey[100]),
    backgroundColor: colors.greenAccent[400],
    "&:hover": {
      backgroundColor: colors.greenAccent[600],
    },
  }));

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  return (
    <Box m="20px">
      <Header title="Create User" subTitle="Create a New User Profile" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
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
                        touched.email && errors.email
                        ? errors.email
                        : ""
                    }
                    InputLabelProps={{
                      style: { color: colors.greenAccent[400] },
                    }}
                    fullWidth
                  />
                </div>
                <div className="col my-2">
                  <TextField
                    label="Phone Number"
                    variant="filled"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contact}
                    name="contact"
                    error={!!touched.contact && !!errors.contact}
                    helperText={
                        touched.contact && errors.contact
                        ? errors.contact
                        : ""
                    }
                    InputLabelProps={{
                      style: { color: colors.greenAccent[400] },
                    }}
                    fullWidth
                  />
                </div>
                <div className="col my-2">
                  <TextField
                    label="Address 1"
                    variant="filled"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address1}
                    name="address1"
                    error={!!touched.address1 && !!errors.address1}
                    helperText={
                        touched.address1 && errors.address1
                        ? errors.address1
                        : ""
                    }
                    InputLabelProps={{
                      style: { color: colors.greenAccent[400] },
                    }}
                    fullWidth
                  />
                </div>
                <div className="col my-2">
                  <TextField
                    label="Address 2"
                    variant="filled"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address2}
                    name="address2"
                    error={!!touched.address2 && !!errors.address2}
                    helperText={
                        touched.address2 && errors.address2
                        ? errors.address2
                        : ""
                    }
                    InputLabelProps={{
                      style: { color: colors.greenAccent[400] },
                    }}
                    fullWidth
                  />
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
