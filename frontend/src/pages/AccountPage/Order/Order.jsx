import React, { useEffect, useState } from "react";
import "../account.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { OrderCard } from "../../../components/Cards/ProductCard/ProductCard";
import { Button, Skeleton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../../utils/axiosRequest";

const OrderSkeleton = () => {
  return (
    <>
      <div className="d-flex justify-content-between  flex-lg-row flex-sm-column w-100">
        <div className="p-3">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={150}
            height={100}
          />
        </div>
        <div className="p-3">
          <Skeleton animation="wave" height={40} width={410} />
        </div>
        <div className="p-3">
          <Skeleton animation="wave" width={120} height={60} />
        </div>
      </div>
    </>
  );
};

const NoOrder = () => {
  const navigate = useNavigate();
  return (
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
        <p className="card-title pt-3 pb-2">You currently have no orders.</p>
        <p className="card-text pb-4">All your orders will be displayed here</p>
        <Button
          onClick={() => navigate("/")}
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
  );
};

const NoClosedOrder = () => {
  const navigate = useNavigate();
  return (
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
          You currently have no closed orders.
        </p>
        <p className="card-text pb-4">
          All your closed orders will be displayed here
        </p>
        <Button
          onClick={() => navigate("/")}
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
  );
};

function Order() {
  const [value, setValue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const transactionOrders = orders.slice().reverse();

  const deliveredOrders = transactionOrders.filter(
    (order) => order.status === "completed"
  );
  const pendingOrders = transactionOrders.filter(
    (order) => order.status === "pending"
  );

  const user = useSelector((state) => state.user.currentUser._id);

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

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await userRequest.get(`orders/find/${user}`);
        setOrders(res.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.reload();
        }
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

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
            <div className="order-list">
              <div className="container p-0 ">
                {loading ? (
                  <OrderSkeleton />
                ) : pendingOrders.length === 0 ? (
                  <NoOrder />
                ) : (
                  pendingOrders.map((value) => (
                    <OrderCard
                      key={value._id}
                      title={value.products}
                      image={value.products[0].img}
                      status={value.status}
                      orderId={value._id}
                      orderDate={value.updatedAt}
                    />
                  ))
                )}
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="order-list">
              <div className="container p-0 ">
                {loading ? (
                  <OrderSkeleton />
                ) : deliveredOrders.length === 0 ? (
                  <NoClosedOrder />
                ) : (
                  deliveredOrders.map((value) => (
                    <OrderCard
                      key={value._id}
                      title={value.products}
                      image={value.products[0].img}
                      status={value.status}
                      orderId={value._id}
                      orderDate={value.updatedAt}
                    />
                  ))
                )}
              </div>
            </div>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export default Order;
