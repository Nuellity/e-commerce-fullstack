import React from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useDispatch } from "react-redux";
import { login } from "../../redux/ApiCalls";

const initialValues = {
  email: "",
  password: "",

};

const userSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .required("required"),
  
});

function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch()

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(colors.grey[100]),
    backgroundColor: colors.greenAccent[400],
    "&:hover": {
      backgroundColor: colors.greenAccent[600],
    },
  }));

  const handleFormSubmit = (values) => {
    const email = values.email
    const password =  values.password
    console.log(email, password)
    login(dispatch, { email, password})
  };
  return (
    <Box m="20px">
      <Header title="Admin Login" subTitle="Log in to access your Account dashboard" />
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
                    label="Password"
                    variant="filled"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={
                        touched.password && errors.password
                        ? errors.password
                        : ""
                    }
                    InputLabelProps={{
                      style: { color: colors.greenAccent[400] },
                    }}
                    fullWidth
                  />
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <ColorButton type="submit">Login</ColorButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </Box>
  );
}

export default Login;
