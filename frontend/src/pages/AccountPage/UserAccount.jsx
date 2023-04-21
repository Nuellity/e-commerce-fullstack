import React, { useState } from "react";
import "./account.css";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InventoryIcon from "@mui/icons-material/Inventory";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";

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
          <div className="row g-4">
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
                  <Link
                    to="summary"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 0 ? "#4a90e2" : "transparent",
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
                  </Link>
                  <Divider sx={{ backgroundColor: "gray" }} />
                  <Link
                    to="orders"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 1 ? "#4a90e2" : "transparent",
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
                  </Link>
                  <Link
                    to="reviews"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 2 ? "#4a90e2" : "transparent",
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
                  </Link>
                  <Link
                    to="vouchers"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding sx={{ display: "block" }}>
                      <ListItemButton
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 3 ? "#4a90e2" : "transparent",
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
                  </Link>
                  <Link
                    to="wishlist"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedIndex === 4}
                        onClick={(event) => handleListItemClick(event, 4)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 4 ? "#4a90e2" : "transparent",
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
                  </Link>
                  <Divider sx={{ backgroundColor: "gray" }} />
                  <Link
                    to="manage"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedIndex === 5}
                        onClick={(event) => handleListItemClick(event, 5)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 5 ? "#4a90e2" : "transparent",
                        }}
                      >
                        <ListItemText
                          primary="Account Management"
                          primaryTypographyProps={{ fontSize: "1em" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link
                    to="address"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedIndex === 6}
                        onClick={(event) => handleListItemClick(event, 6)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 6 ? "#4a90e2" : "transparent",
                        }}
                      >
                        <ListItemText
                          primary="Address Book"
                          primaryTypographyProps={{ fontSize: "1em" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link
                    to="newsletter"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedIndex === 7}
                        onClick={(event) => handleListItemClick(event, 7)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 7 ? "#4a90e2" : "transparent",
                        }}
                      >
                        <ListItemText
                          primary="NewsLetter Preference"
                          primaryTypographyProps={{ fontSize: "1em" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link
                    to="close"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedIndex === 8}
                        onClick={(event) => handleListItemClick(event, 8)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 8 ? "#4a90e2" : "transparent",
                        }}
                      >
                        <ListItemText
                          primary="Close Account"
                          primaryTypographyProps={{ fontSize: "1em" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Divider sx={{ backgroundColor: "gray" }} />
                  <div className="d-flex justify-content-center pt-2">
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
                  padding: 0,
                }}
              >
                <Outlet />
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
