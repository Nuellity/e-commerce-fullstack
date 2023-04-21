import React from "react";
import "./account.css";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton } from "@mui/material";

function AccountSummary() {
  return (
    <div className="card main-card">
      <p className="card-header header">Account Overview</p>

      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100">
              <p className="card-header">ACCOUNT DETAILS</p>
              <div className="card-body">
                <p className="card-title">Test Name</p>
                <p className="card-text">test@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between">
                ADDRESS BOOK
                <IconButton>
                  <EditIcon sx={{ color: "skyblue" }} />
                </IconButton>
              </div>
              <div className="card-body">
                <p className="card-title">Your default shipping address:</p>
                <p className="card-text">
                  Test Name <br />
                  20 adeoye street
                  <br />
                  Abule Egba, Lagos
                  <br />
                  100238
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
                <Button variant="text" sx={{ color: "skyblue" }}>
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
