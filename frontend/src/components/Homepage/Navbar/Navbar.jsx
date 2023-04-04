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
  useMediaQuery,
  Badge,
  useTheme,
  Box,
  IconButton,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
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
      <div className="container">
        <AppBar sx={{ backgroundColor: "#E5E5E5" }}>
          <Toolbar>
            <StoreIcon sx={{ cursor: "pointer", color: "black" }} />
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              <Typography
                sx={{
                  paddingRight: isMatch ? "10px" : "50px",
                  fontSize: "20px",
                  fontFamily: "Alkatra",
                  lineHeight: "33.6px",
                  color: "black",
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
                  >
                    <Badge badgeContent={cartQuantity} color="error">
                      <ShoppingBasketIcon
                        sx={{ color: "black", height: "19px", width: "20px" }}
                      />
                    </Badge>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "black",
                        marginLeft: "3px",
                      }}
                    >
                      Cart
                    </Typography>
                  </IconButton>
                  <Cart
                    openCart={cartDraw}
                    closeCart={() => setCartDraw(false)}
                  />
                  <IconButton
                    size="large"
                    onClick={handleClick}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <PersonIcon
                      sx={{ color: "black", height: "19px", width: "20px" }}
                    />
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "black",
                        marginLeft: "3px",
                      }}
                    >
                      Account
                    </Typography>
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
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                      <Typography
                        sx={{ pl: "10px" }}
                        onClick={() => navigate("/profile")}
                      >
                        My Account{" "}
                      </Typography>
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
              </>
            )}
          </Toolbar>
          <div
            className="d-flex justify-content-between my-2 mx-3"
            style={{ color: "black" }}
          >
            <span>Jewelry & Accessories</span>
            <span>Clothing & Shoes</span>
            <span>Home & Living</span>
            <span>Wedding & Party</span>
            <span>Toys & Entertainment</span>
            <span>Art & Collectibles</span>
          </div>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default Navbar;
