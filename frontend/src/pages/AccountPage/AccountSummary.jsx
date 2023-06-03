import React from "react";
import "./account.css";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AccountSummary() {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  console.log(user);
  return (
    <div className="card main-card">
      <p className="card-header header">Account Overview</p>

      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100">
              <p className="card-header">ACCOUNT DETAILS</p>
              <div className="card-body">
                <p className="card-title">{user?.firstName}</p>
                <p className="card-title">{user?.lastName}</p>
                <p className="card-text">{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between">
                ADDRESS BOOK
                <Link
                  to="/profile/address"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <IconButton>
                    <EditIcon sx={{ color: "skyblue" }} />
                  </IconButton>
                </Link>
              </div>
              <div className="card-body">
                <p className="card-title">Your default shipping address:</p>
                <p className="card-text">
                  {user?.address}
                  <br />
                  {user?.city} <br />
                  {user?.state}
                  <br />
                  {user?.zipcode}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <p className="card-header">AYABA STORE CREDIT</p>
              <div className="card-body">
                <div className="card-credit">
                  <AccountBalanceWalletIcon
                    sx={{
                      marginRight: "0.5rem",
                      fontSize: "3rem",
                      color: "skyblue",
                    }}
                  />
                  <span style={{ fontSize: "1.2rem" }}>$ 0.00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <p className="card-header">NEWSLETTER</p>
              <div className="card-body">
                <p className="card-text">
                  You are currently not subscribed to any of our newsletters.
                </p>
              </div>
              <div className="card-footer" style={{ border: "none" }}>
                <Button
                  variant="text"
                  sx={{ color: "skyblue" }}
                  onClick={() => navigate("/profile/newsletter")}
                >
                  EDIT NEWSLETTER REFERENCE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSummary;
