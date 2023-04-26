import React from "react";
import descriptionData from "../../Data/descriptionData";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LockIcon from "@mui/icons-material/Lock";
import LanguageIcon from "@mui/icons-material/Language";

function HomeDescription() {
  return (
    <>
      <div className="desc pt-4" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 g-2 desc-post ">
              <div>
                <PeopleIcon sx={{ padding: "5px", fontSize: 40 }} />
                <h6>{descriptionData[0].title}</h6>
                <p>{descriptionData[0].text}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 g-2 desc-post">
              <div>
                <LanguageIcon sx={{ padding: "5px", fontSize: 40 }} />
                <h6>{descriptionData[1].title}</h6>
                <p>{descriptionData[1].text}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 g-2 desc-post">
              <div>
                <LockIcon sx={{ padding: "5px", fontSize: 40 }} />
                <h6>{descriptionData[2].title}</h6>
                <p>{descriptionData[2].text}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 g-2 desc-post">
              <div>
                <LocalShippingIcon sx={{ padding: "5px", fontSize: 40 }} />
                <h6>{descriptionData[3].title}</h6>
                <p>{descriptionData[3].text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeDescription;
