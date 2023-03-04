import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
  Divider,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Badge,
  Box,
  IconButton,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import FavoriteIcon from "@mui/icons-material/Favorite";

import LoginIcon from "@mui/icons-material/Login";
import SearchBar from "./SearchBar/SearchBar";
import DrawerComp from "./DrawerComp";
import Cart from "../../CartPage/Cart";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/ApiCalls";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [chorEl, setChorEl] = useState(null);
  const [visible, setVisible] = useState(false);
  const [cartDraw, setCartDraw] = useState(false);


  const cartQuantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setVisible(!visible);
  };

  const handleProfileMenuOpen = (event) => {
    setChorEl(event.currentTarget);
    setVisible(!visible);
  };

  const menuId = "primary-search-account-menu";
  const isMenuOpen = Boolean(chorEl);
  const handleMenuClose = () => {
    setChorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={chorEl}
      id={menuId}
      open={isMenuOpen}
      onClose={handleMenuClose}
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
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleMenuClose}>
        <Typography sx={{ pb: "5px" }}>Help Center</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Typography sx={{ pb: "5px" }}>Track Order</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Typography sx={{ pb: "5px" }}>Order cancellation</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Typography sx={{ pb: "5px" }}>Return & Refunds</Typography>
      </MenuItem>
    </Menu>
  );

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
    <div className="container">
      <AppBar style={{ backgroundColor: "#42C2FF" }}>
        <Toolbar>
          <StoreIcon sx={{ cursor: "pointer" }} />
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            <Typography
              sx={{
                paddingRight: isMatch ? "10px" : "50px",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              AYABA
            </Typography>
          </Link>
          <SearchBar />
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="item added"
                  sx={{ mr: "10px" }}
                  onClick={() => setCartDraw(true)}
                  color="inherit"
                >
                  <Badge badgeContent={cartQuantity} color="error">
                    <ShoppingBasketIcon fontSize="large" />
                  </Badge>
                </IconButton>
                <Cart
                  openCart={cartDraw}
                  closeCart={() => setCartDraw(false)}
                />
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={handleClick}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <PersonIcon fontSize="large" />
                  {visible ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <ContactSupportIcon fontSize="large" />
                  {visible ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
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
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
              
                  )}
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                    <Typography sx={{ pl: "10px" }} onClick={() => navigate("/profile")}>My Account </Typography>
                  </ListItemIcon>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon onClick={() => navigate("/order")}>
                    <ShoppingCartIcon fontSize="small" />
                    <Typography sx={{ pl: "10px" }}>Orders </Typography>
                  </ListItemIcon>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon onClick={() => navigate("/wishlist")}>
                    <FavoriteIcon fontSize="small" />
                    <Typography sx={{ pl: "10px" }}> Saved Items </Typography>
                  </ListItemIcon>
                </MenuItem>
              </Menu>
              {renderMenu}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
