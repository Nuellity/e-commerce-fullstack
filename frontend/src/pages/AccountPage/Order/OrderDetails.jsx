import React, { useEffect, useState } from "react";
import "../account.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import {
  Button,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { userRequest } from "../../../axiosRequest";

const OrderTitleSkeleton = () => {
  return (
    <>
      <Skeleton animation="wave" height={20} width="60%" />
      <Skeleton animation="wave" height={20} width="30%" />
      <Skeleton animation="wave" height={20} width="30%" />
      <Skeleton animation="wave" height={20} width="30%" />
    </>
  );
};

const PaymentSkeleton = () => {
  return (
    <>
      <div className="p-3">
        <Skeleton animation="wave" height={40} width="50%" />
        <Skeleton animation="wave" height={20} width="30%" />
      </div>
      <div className="p-3">
        <Skeleton animation="wave" height={40} width="30%" />
        <Skeleton animation="wave" height={20} width="30%" />
        <Skeleton animation="wave" height={20} width="30%" />
      </div>
    </>
  );
};

const ShippingSkeleton = () => {
  return (
    <>
      <div className="p-3">
        <Skeleton animation="wave" height={40} width="50%" />
        <Skeleton animation="wave" height={20} width="30%" />
      </div>
      <div className="p-3">
        <Skeleton animation="wave" height={40} width="30%" />
        <Skeleton animation="wave" height={20} width="30%" />
        <Skeleton animation="wave" height={20} width="30%" />
      </div>
      <div className="p-3">
        <Skeleton animation="wave" height={40} width="30%" />
        <Skeleton animation="wave" height={20} width="30%" />
        <Skeleton animation="wave" height={20} width="70%" />
      </div>
    </>
  );
};

const OrderSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="30%"
        height={118}
      />
      <Skeleton animation="wave" height={20} width="30%" />
      <Skeleton animation="wave" height={20} width="30%" />
      <Skeleton animation="wave" height={40} width="30%" />
    </>
  );
};

function OrderDetails() {
  const myTheme = useTheme();
  const [order, setOrder] = useState([]);
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const isMatch = useMediaQuery(myTheme.breakpoints.down("md"));
  const products = order?.products || [];
  const date = moment(order.createdAt);
  const deliverDate = moment(order.updatedAt);
  const orderDate = date.format("MMMM Do, YYYY");
  const deliveryDate = deliverDate.add(2, "week").format("MMMM Do, YYYY");
  const shippingDate = date.add(6, "day").format("MMMM Do");
  const shippingDateTwo = date.add(1, "day").format("MMMM Do");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await userRequest.get(`orders/findbyid/${id}`);
        setOrder(res.data);
      } catch (error) {}
    };

    fetchOrder();
  }, [id]);

  return (
    <div className="card main-card">
      <p className="card-header header px-0">
        <IconButton onClick={() => navigate("/profile/orders")}>
          <ArrowBackIcon />
        </IconButton>
        Order Details
      </p>
      <div className="container">
        {order.length === 0 ? (
          <OrderTitleSkeleton />
        ) : (
          <>
            <p className="order-title">Order nº: {order._id}</p>
            <p className="order-text">
              {products.length > 1
                ? ` ${products.length} Items`
                : ` ${products.length} Item`}
              <br />
              Placed on {orderDate} <br />
              Total: ${order.amount}
            </p>
          </>
        )}

        <hr />
        <span className="order-item ">ITEMS IN YOUR ORDER</span>
        <div className="container">
          <div className="row g-4">
            <div className="col-md-12">
              <div
                className="w-100"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.175)",
                  borderRadius: "5px",
                  padding: "0 1.5em 1.5em 1.5em",
                }}
              >
                <div className="row">
                  <div className="order-details-list">
                    <div className="container p-0">
                      {order.length === 0 ? (
                        <OrderSkeleton />
                      ) : (
                        products.map((product, i) => {
                          return (
                            <div className="py-3" key={i}>
                              <div
                                className="col-lg-4"
                                style={{ width: "8rem" }}
                              >
                                <img
                                  src={product.img}
                                  alt="Avatar"
                                  style={{
                                    width: "8rem",
                                    height: "8rem",
                                    borderRadius: "5px",
                                  }}
                                />
                              </div>
                              <div className="col-lg-6 pt-2">
                                <div
                                  className="review-details p-0"
                                  style={{ padding: isMatch && 0 }}
                                >
                                  <span className="order-name">
                                    {product.name}
                                  </span>
                                  <br />{" "}
                                  <span className="order-id">
                                    QTY: {product.quantity}
                                  </span>{" "}
                                  <br />
                                  <div style={{ padding: "0.5em 0" }}>
                                    {order?.status === "pending" ? (
                                      <div>
                                        <Chip
                                          label="Processing"
                                          color="secondary"
                                        />
                                      </div>
                                    ) : (
                                      <>
                                        <Chip
                                          label="DELIVERED"
                                          color="success"
                                          sx={{
                                            marginRight: "7px",
                                          }}
                                        />
                                        <Chip
                                          label="NON-REFUNDABLE"
                                          color="secondary"
                                        />
                                        <br />
                                      </>
                                    )}

                                    <br />
                                    <div>
                                      <span className="order-price ">
                                        ${product.quantity * product.price}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-2">
                                <div className="">
                                  <Link to={`/product/${product.productId}`}>
                                    <Button
                                      variant="contained"
                                      sx={{
                                        backgroundColor: "skyblue",
                                        "&:hover": {
                                          backgroundColor: "#4a90e2",
                                        },
                                        width: isMatch ? "50%" : "100%",
                                      }}
                                      onClick={() => {
                                        navigate("/profile/order-details");
                                      }}
                                    >
                                      BUY AGAIN
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
                {order?.status === "completed" ? (
                  ""
                ) : order.length === 0 ? (
                  <Skeleton animation="wave" height={20} width="70%" />
                ) : (
                  <p
                    className="pt-3"
                    style={{ fontSize: isMatch ? "12px" : "inherit" }}
                  >
                    <SettingsBackupRestoreIcon /> The return period ended on{" "}
                    {deliveryDate}
                    <Link
                      to="/return"
                      style={{
                        textDecoration: "none",
                        color: "skyblue",
                        paddingLeft: "5px",
                      }}
                    >
                      Access our Return Policy.
                    </Link>
                  </p>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="card h-100 w-100">
                <p className="card-header">PAYMENT INFORMATION</p>
                {order.length === 0 ? (
                  <PaymentSkeleton />
                ) : (
                  <div className="card-body">
                    <div>
                      <p className="card-title">Payment Method</p>
                      <p className="card-text">{order?.paymentMethod}</p>
                    </div>
                    <div className="pt-4">
                      <p className="card-title">Payment Details</p>
                      <p className="card-text">
                        items total: ${order?.amount} <br />
                        Delivery Fees: FREE
                      </p>
                      <p>Total: ${order?.amount}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-12 ">
              <div className="card h-100 w-100">
                <p className="card-header">DELIVERY INFORMATION</p>
                {order.length === 0 ? (
                  <ShippingSkeleton />
                ) : (
                  <div className="card-body">
                    <div>
                      <p className="card-title">Delivery Method</p>
                      <p className="card-text">Door Delivery</p>
                    </div>
                    <div className="pt-4">
                      <p className="card-title">Shipping Address</p>
                      <p className="card-text">
                        {`${order?.userFirstName}  ${order?.userLastName}`}{" "}
                        <br />
                        {order?.address?.address} <br />
                        {`${order?.address?.city}, ${order?.address?.state}`}
                      </p>
                    </div>
                    <div className="pt-4">
                      <p className="card-title">Shipping Details</p>
                      <p className="card-text">
                        Door Delivery. <br />
                        {`Delivery between ${shippingDate} and ${shippingDateTwo}`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
