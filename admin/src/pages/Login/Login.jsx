import React from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/ApiCalls";
import CircularProgress from "@mui/material/CircularProgress";

const initialValues = {
  email: "",
  password: "",
};

const userSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { isFetching, error, errorMessage } = useSelector(
    (state) => state.user
  );

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(colors.grey[100]),
    backgroundColor: colors.greenAccent[400],
    width: "8rem",
    "&:hover": {
      backgroundColor: colors.greenAccent[600],
    },
  }));

  const handleFormSubmit = (values) => {
    const email = values.email;
    const password = values.password;
    login(dispatch, { email, password });
  };
  return (
    <Box m="20px">
      <Header
        title="Admin Login"
        subTitle="Log in to access your Account dashboard"
      />
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
                    label="Password"
                    variant="filled"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={
                      touched.password && errors.password ? errors.password : ""
                    }
                    InputLabelProps={{
                      style: { color: colors.greenAccent[400] },
                    }}
                    fullWidth
                  />
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <ColorButton type="submit" disabled={isFetching}>
                    Login
                    {isFetching && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: colors.grey[500],
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                  </ColorButton>
                </div>
              </form>
            </div>
            {error && (
              <p className="mt-3" style={{ color: "red", fontSize: "15px" }}>
                {errorMessage}
              </p>
            )}
          </div>
        )}
      </Formik>
      <p> DEMO EMAIL: ayaba@mail.com</p>
      <p>DEMO PASSWORD: demopass</p>
    </Box>
  );
}

export default Login;
