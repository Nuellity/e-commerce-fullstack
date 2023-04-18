import React from "react";
import "../account.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { Button, Chip, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function OrderDetails() {
  const navigate = useNavigate();

  return (
    <div className="card main-card">
      <p className="card-header header">
        <IconButton onClick={() => navigate("/profile/orders")}>
          <ArrowBackIcon />
        </IconButton>
        Order Details
      </p>
      <div className="container">
        <p className="order-title">Order nº 1548345222</p>
        <p className="order-text">
          1 Items <br />
          Placed on 27-09-2022 <br />
          Total: $23.00
        </p>
        <hr />
        <span className="order-item px-3">ITEMS IN YOUR ORDER</span>
        <div className="container">
          <div className="row g-4">
            <div className="col-md-12">
              <div
                className="w-100"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.175)",
                  borderRadius: "5px",
                  padding: "1.5em",
                }}
              >
                <div className="row d-flex g-4">
                  <div className="col-lg-4" style={{ width: "8rem" }}>
                    <img
                      src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Avatar"
                      style={{
                        width: "8rem",
                        height: "8rem",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="px-4">
                      <span className="order-name">
                        Anti Blue Ray Light Glasses For Screens Black-Gold Frame
                      </span>
                      <br /> <span className="order-id">QTY: 1 </span> <br />
                      <div style={{ paddingTop: "8px" }}>
                        <div className="">
                          <Chip
                            label="DELIVERED"
                            color="success"
                            sx={{ marginRight: "7px", marginBottom: "5px" }}
                          />
                          <Chip
                            label="NON-REFUNDABLE"
                            color="secondary"
                            sx={{ marginBottom: "5px" }}
                          />
                        </div>

                        <br />
                        <div>
                          <span className="order-price ">$23.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 ms-auto">
                    <div>
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          color: "white",
                          fontSize: "0.95em",
                          width: "8rem",
                        }}
                        onClick={() => {
                          navigate("/profile/order-details");
                        }}
                      >
                        BUY AGAIN
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="pt-3">
                  <SettingsBackupRestoreIcon /> The return period ended on
                  (06-10-2022){" "}
                  <Link to="/return" style={{ textDecoration: "none" }}>
                    Access our Return Policy.
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 w-100">
                <p className="card-header">PAYMENT INFORMATION</p>
                <div className="card-body">
                  <div>
                    <p className="card-title">Payment Method</p>
                    <p className="card-text">Pay on delivery</p>
                  </div>
                  <div className="pt-4">
                    <p className="card-title">Payment Details</p>
                    <p className="card-text">
                      items total: $23.00 <br />
                      Delivery Fees: FREE
                    </p>
                    <p>Total: $23.00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 w-100">
                <p className="card-header">DELIVERY INFORMATION</p>
                <div className="card-body">
                  <div>
                    <p className="card-title">Delivery Method</p>
                    <p className="card-text">Door Delivery</p>
                  </div>
                  <div className="pt-4">
                    <p className="card-title">Shipping Address</p>
                    <p className="card-text">
                      Emmanuel Abhulimhen <br />
                      30 pius eze street, <br />
                      Iyana Ipaja (Aboru), Lagos
                    </p>
                  </div>
                  <div className="pt-4">
                    <p className="card-title">Shipping Details</p>
                    <p className="card-text">
                      Door Delivery. <br />
                      Delivery between 30 September and 01 October
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
