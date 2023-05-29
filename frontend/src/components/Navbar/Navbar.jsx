import React, { useState } from "react";
import "./navbar.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
  Divider,
  ListItemIcon,
  useMediaQuery,
  Badge,
  useTheme,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Login";
import SearchBar from "./SearchBar/SearchBar";
import DrawerComp from "./DrawerComp";
import Cart from "../../pages/CartPage/Cart";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/ApiCalls";

const theme = createTheme({
  palette: {
    primary: {
      main: "#212121",
    },
  },
});

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [visible, setVisible] = useState(false);
  const [cartDraw, setCartDraw] = useState(false);
  const myTheme = useTheme();

  const cartQuantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMatch = useMediaQuery(myTheme.breakpoints.down("md"));

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setVisible(!visible);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogOut = () => {
    logout(dispatch);
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="">
        <AppBar
          sx={{
            background: "rgba(244, 244, 245)",
          }}
          elevation={0}
        >
          <Toolbar>
            <div className="d-flex justify-content-between w-100 my-3  ">
              <div>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/"
                >
                  <Typography
                    className="nav-logo"
                    sx={{
                      paddingRight: isMatch ? "10px" : "50px",
                      fontFamily: "AmstelvarAlpha",
                      fontStyle: "Bold",
                      fontWeight: "600px",
                      fontSize: "28px",
                      lineHeight: 1.1,
                      color: "#000000",
                      cursor: "pointer",
                    }}
                  >
                    AYABA
                  </Typography>
                </Link>
              </div>
              <div style={{ width: "30em" }}>
                <SearchBar />
              </div>

              {isMatch ? (
                <DrawerComp />
              ) : (
                <>
                  <div>
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                      <Tooltip title="View Account">
                        <IconButton
                          onClick={handleClick}
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          classes={{ root: "customButton" }}
                          style={{
                            borderRadius: 0,
                          }}
                        >
                          <PersonIcon
                            className="nav-icon"
                            sx={{ fontSize: "30px" }}
                          />
                          <Typography
                            className="nav-item"
                            sx={{ marginRight: "2em" }}
                          >
                            Account
                          </Typography>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View Cart">
                        <IconButton
                          size="large"
                          aria-label="item added"
                          onClick={() => setCartDraw(true)}
                          classes={{ root: "customButton" }}
                          style={{
                            borderRadius: 0,
                          }}
                        >
                          <Badge badgeContent={cartQuantity} color="error">
                            <ShoppingBagIcon
                              className="nav-icon"
                              sx={{ fontSize: "30px" }}
                            />
                          </Badge>
                          <Typography className="nav-item">Cart</Typography>
                        </IconButton>
                      </Tooltip>

                      <Cart
                        openCart={cartDraw}
                        closeCart={() => setCartDraw(false)}
                      />
                    </Box>
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                        bgcolor: "#E5E5E5",
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>
                      {user ? (
                        <Button
                          variant="contained"
                          endIcon={<LoginIcon fontSize="small" />}
                          sx={{ marginLeft: "10px" }}
                          size="large"
                          onClick={handleLogOut}
                        >
                          Sign Out
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          endIcon={<LoginIcon fontSize="small" />}
                          sx={{ marginLeft: "10px" }}
                          size="large"
                          color="primary"
                          onClick={handleLogin}
                        >
                          Login
                        </Button>
                      )}
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <ListItemIcon
                        onClick={() => navigate("/profile/summary")}
                      >
                        <PersonIcon fontSize="small" />
                        <Typography sx={{ pl: "10px" }}>My Account </Typography>
                      </ListItemIcon>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon onClick={() => navigate("/profile/orders")}>
                        <ShoppingCartIcon fontSize="small" />
                        <Typography sx={{ pl: "10px" }}>Orders </Typography>
                      </ListItemIcon>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon
                        onClick={() => navigate("/profile/wishlist")}
                      >
                        <FavoriteIcon fontSize="small" />
                        <Typography sx={{ pl: "10px" }}>
                          {" "}
                          Saved Items{" "}
                        </Typography>
                      </ListItemIcon>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </div>
          </Toolbar>
          <Divider />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <div className="d-flex justify-content-between container my-4 nav-category">
              <Link
                to="/products/Gaming Chairs"
                style={{ textDecoration: "none" }}
              >
                <span className="px-1">Gaming Chairs</span>
              </Link>
              <Link to="/products/Audio" style={{ textDecoration: "none" }}>
                <span style={{ width: "13%" }}>Speakers & Headphones</span>
              </Link>
              <Link
                to="/products/All Flat-Screen TVs"
                style={{ textDecoration: "none" }}
              >
                <span>All Flat-Screen TVs</span>
              </Link>
              <Link to="/products/Laptops" style={{ textDecoration: "none" }}>
                <span>Laptops</span>
              </Link>
            </div>
          </Box>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default Navbar;
