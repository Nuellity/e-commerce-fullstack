import React from "react";
import { Button, useMediaQuery, useTheme } from "@mui/material";

function HomeAdvert() {
  const myTheme = useTheme();

  const isMatch = useMediaQuery(myTheme.breakpoints.down("md"));

  return (
    <div className="advert">
      <img
        src="/images/img/andrey-zvyagintsev-EQj1ZMpq_VM-unsplash 1.png"
        alt="advert-background"
        className="advert-image"
        style={{ width: "100%", height: isMatch ? "25rem" : "45rem" }}
      />
      <div className="advert-back">
        <img
          src="/images/img/Zara_Logo 1.png"
          alt="advert-logo"
          style={{ width: isMatch ? "20rem" : "100%", height: "auto" }}
        />
      </div>

      <div className="advert-title">
        <div>
          <img
            src="/images/img/Zara_Logo.png"
            alt="advert-logo"
            style={{ height: isMatch ? "3em" : "auto" }}
          />
        </div>
        <div style={{ padding: isMatch ? "1rem 0" : " 2.5rem 0" }}>
          <p>
            Lustrous yet understated. The new evening wear collection
            exclusively offered at the reopened Giorgio Armani boutique in Los
            Angeles.
          </p>
        </div>
        <Button
          variant="contained"
          className="text-capiltalize"
          style={{
            padding: "0.5em",
            textTransform: "capitalize",
            fontSize: isMatch ? "14px" : "1.5em",
            backgroundColor: "#FFFFFF",
            fontFamily: "Roboto",
            lineHeight: "2em",
            fontWeight: "400",
            color: "#1E2832",
          }}
        >
          see collection
        </Button>
      </div>
    </div>
  );
}

export default HomeAdvert;
