import React from "react";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

function HomeAdvert() {
  return (
    <ThemeProvider theme={theme}>
      <div className="pt-5 pb-3">
        <div className="advert my-5 py-5">
          <div className=" py-5 advert-title d-flex justify-content-end">
            <div className="logo"></div>
            <div className="">
              <p>
                Lustrous yet understated. The new evening wear collection
                exclusively offered at the reopened Giorgio Armani boutique in
                Los Angeles.
              </p>
            </div>
            <Button
              variant="contained"
              className="text-capitalize"
              color="primary"
              style={{
                animationDelay: "3s",
                width: "14em",
                height: "4.5em",
                textTransform: "capitalize",
                fontSize: "1em",
              }}
            >
              see collection
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default HomeAdvert;
