import React, { useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InventoryIcon from "@mui/icons-material/Inventory";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";

function UserAccount() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="container " style={{ paddingTop: "4em" }}>
          <div className="row">
            <div className="col-md-3 ">
              <Box
                component="div"
                sx={{
                  height: "100%",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderRadius: "5px",
                  background: "rgba(30, 40, 50, 0.05)",
                }}
              >
                <List sx={{ margin: 0, paddingTop: 0 }}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedIndex === 0}
                      onClick={(event) => handleListItemClick(event, 0)}
                      sx={{
                        minHeight: 48,
                        py: 3,
                        backgroundColor:
                          selectedIndex === 0 ? "lightblue" : "transparent",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: "1em",
                          justifyContent: "center",
                        }}
                      >
                        <PersonOutlineIcon sx={{ fontSize: 30 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="My Ayaba Account"
                        primaryTypographyProps={{ fontSize: "1em" }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ backgroundColor: "gray" }} />
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedIndex === 1}
                      onClick={(event) => handleListItemClick(event, 1)}
                      sx={{
                        minHeight: 48,
                        py: 3,
                        backgroundColor:
                          selectedIndex === 1 ? "lightblue" : "transparent",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: "1em",
                          justifyContent: "center",
                        }}
                      >
                        <InventoryIcon sx={{ fontSize: 30 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Orders"
                        primaryTypographyProps={{ fontSize: "1em" }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedIndex === 2}
                      onClick={(event) => handleListItemClick(event, 2)}
                      sx={{
                        minHeight: 48,
                        py: 3,
                        backgroundColor:
                          selectedIndex === 2 ? "lightblue" : "transparent",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: "1em",
                          justifyContent: "center",
                        }}
                      >
                        <RateReviewIcon sx={{ fontSize: 30 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Pending Reviews"
                        primaryTypographyProps={{ fontSize: "1em" }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      selected={selectedIndex === 3}
                      onClick={(event) => handleListItemClick(event, 3)}
                      sx={{
                        minHeight: 48,
                        py: 3,
                        backgroundColor:
                          selectedIndex === 3 ? "lightblue" : "transparent",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: "1em",
                          justifyContent: "center",
                        }}
                      >
                        <LocalActivityIcon sx={{ fontSize: 30 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Voucher"
                        primaryTypographyProps={{ fontSize: "1em" }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedIndex === 4}
                      onClick={(event) => handleListItemClick(event, 4)}
                      sx={{
                        minHeight: 48,
                        py: 3,
                        backgroundColor:
                          selectedIndex === 4 ? "lightblue" : "transparent",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: "1em",
                          justifyContent: "center",
                        }}
                      >
                        <FavoriteBorderIcon sx={{ fontSize: 30 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Saved Items"
                        primaryTypographyProps={{ fontSize: "1em" }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ backgroundColor: "gray" }} />
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedIndex === 5}
                      onClick={(event) => handleListItemClick(event, 5)}
                      sx={{
                        minHeight: 48,
                        py: 3,
                        backgroundColor:
                          selectedIndex === 5 ? "lightblue" : "transparent",
                      }}
                    >
                      <ListItemText
                        primary="Account Management"
                        primaryTypographyProps={{ fontSize: "1em" }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedIndex === 6}
                      onClick={(event) => handleListItemClick(event, 6)}
                      sx={{
                        minHeight: 48,
                        py: 3,
                        backgroundColor:
                          selectedIndex === 6 ? "lightblue" : "transparent",
                      }}
                    >
                      <ListItemText
                        primary="Address Book"
                        primaryTypographyProps={{ fontSize: "1em" }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedIndex === 7}
                      onClick={(event) => handleListItemClick(event, 7)}
                      sx={{
                        minHeight: 48,
                        py: 3,
                        backgroundColor:
                          selectedIndex === 7 ? "lightblue" : "transparent",
                      }}
                    >
                      <ListItemText
                        primary="NewsLetter Preference"
                        primaryTypographyProps={{ fontSize: "1em" }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedIndex === 8}
                      onClick={(event) => handleListItemClick(event, 8)}
                      sx={{
                        minHeight: 48,
                        py: 3,
                        backgroundColor:
                          selectedIndex === 8 ? "lightblue" : "transparent",
                      }}
                    >
                      <ListItemText
                        primary="Close Account"
                        primaryTypographyProps={{ fontSize: "1em" }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ backgroundColor: "gray" }} />
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="text"
                      sx={{
                        justifyContent: "center",
                        color: "red",
                        fontSize: "1.2rem",
                      }}
                      endIcon={<LogoutIcon />}
                    >
                      SIGN OUT
                    </Button>
                  </div>
                </List>
              </Box>
            </div>
            <div className="col-md-9">
              <Box
                component="div"
                sx={{
                  height: "100%",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderRadius: "5px",
                }}
              >
                <h3 className="p-2">Account Overview</h3>
                <hr />
                <div className="container">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="card h-100">
                        <p className="card-header">ACCOUNT DETAILS</p>
                        <div className="card-body py-3">
                          <p className="card-title">Test Name</p>
                          <p className="card-text">test@gmail.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card h-100">
                        <div class="card-header d-flex justify-content-between">
                          ADDRESS BOOK
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </div>
                        <div className="card-body py-3">
                          <p className="card-title">
                            Your default shipping address:
                          </p>
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
                              sx={{ marginRight: "1rem" }}
                            />
                            <span>$ 0.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card h-100">
                        <p className="card-header">NEWSLETTER</p>
                        <div className="card-body">
                          <p className="card-title">
                            You are currently not subscribed to any of our
                            newsletters.
                          </p>
                        </div>
                        <div className="card-footer">
                          <Button variant="text">
                            EDIT NEWSLETTER REFERENCE
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserAccount;
