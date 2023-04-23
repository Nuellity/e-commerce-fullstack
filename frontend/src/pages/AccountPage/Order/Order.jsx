import React, { useState } from "react";
import "../account.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { OrderCard } from "../../../components/Cards/ProductCard/ProductCard";
import { Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function Order() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className="card main-card">
      <p className="card-header header">Orders</p>

      <div className="container">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Open Orders"
                sx={{
                  fontSize: "1em",
                }}
                {...a11yProps(0)}
              />
              <Tab
                label="Closed Orders"
                sx={{ fontSize: "1em" }}
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="container p-0">
              <OrderCard />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div
              className="d-flex justify-content-center pt-5"
              style={{ textAlign: "center" }}
            >
              <div className="py-4">
                <div
                  style={{
                    background: "rgba(30, 40, 50, 0.05)",
                    padding: "1em",
                    height: "8em",
                    width: "8em",
                    borderRadius: "50%",
                    margin: "auto",
                  }}
                >
                  <ShoppingCartOutlinedIcon
                    sx={{
                      fontSize: "6em",
                      color: "skyblue",
                    }}
                  />
                </div>
                <p className="card-title pt-3 pb-2">
                  You currently have no closed order
                </p>
                <p className="card-text pb-4">
                  All your closed orders will be displayed here
                </p>
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "1rem",
                    backgroundColor: "skyblue",
                    "&:hover": {
                      backgroundColor: "#4a90e2",
                    },
                  }}
                >
                  CONTINUE SHOPPING
                </Button>
              </div>
            </div>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export default Order;
