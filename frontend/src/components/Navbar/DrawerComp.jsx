import { React, useState } from "react";
import {
  Badge,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
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

function DrawerComp() {
  const [openDraw, setOpenDraw] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);

  const [cartDraw, setCartDraw] = useState(false);

  const user = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDisplay = () => setVisible(!visible);

  const handleAccount = () => setIsVisible(!isVisible);

  const handleLogOut = () => {
    logout(dispatch);
    navigate("/login");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Drawer
          sx={{
            width: 280,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 280,
              boxSizing: "border-box",
              backgroundColor: "rgba(244, 244, 245)",
            },
          }}
          open={openDraw}
          onClose={() => setOpenDraw(false)}
        >
          <List>
            <Link
              to="/products/Gaming Chairs"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem>
                <ListItemText primary="Gaming Chairs" />
              </ListItem>
            </Link>
            <Link
              to="/products/Audio"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem>
                <ListItemText primary="Speakers & Headphones" />
              </ListItem>
            </Link>
            <Link
              to="/products/All Flat-Screen TVs"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem>
                <ListItemText primary="All Flat-Screen TVs" />
              </ListItem>
            </Link>
            <Link
              to="/products/Laptops"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem>
                <ListItemText primary="Laptops" />
              </ListItem>
            </Link>
            <Divider sx={{ border: "0.7px solid" }} />
            <ListItemButton onClick={() => setCartDraw(true)}>
              <ListItemIcon>
                <Badge badgeContent={quantity} color="error">
                  <ShoppingBagIcon sx={{ fontSize: 30 }} />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItemButton>
            <Cart openCart={cartDraw} closeCart={() => setCartDraw(false)} />
            <Divider sx={{ border: "0.7px solid" }} />
            <div>
              <ListItemButton onClick={handleAccount}>
                <ListItemIcon>
                  <PersonIcon sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Account" />
                {isVisible ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </div>
            <div style={{ display: isVisible ? "block" : "none" }}>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/orders"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItemButton>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/wishlists"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Saved Items" />
                </ListItemButton>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/wishlists"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="View Account" />
                </ListItemButton>
              </Link>
            </div>
            <Divider sx={{ border: "0.7px solid" }} />
            <div>
              <ListItemButton onClick={handleDisplay}>
                <ListItemIcon>
                  <ContactSupportIcon sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Help" />
                {visible ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Divider sx={{ border: "0.4px solid" }} />
            </div>
            <div style={{ display: visible ? "block" : "none" }}>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/return"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <LocalConvenienceStoreIcon />
                  </ListItemIcon>
                  <ListItemText primary="Refund and Returns" />
                </ListItemButton>
              </Link>
              <ListItemButton>
                <ListItemIcon>
                  <CancelPresentationIcon />
                </ListItemIcon>
                <ListItemText primary="Order Cancellation" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <AirportShuttleIcon />
                </ListItemIcon>
                <ListItemText primary="Track Order" />
              </ListItemButton>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/faq"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <LiveHelpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Help Center" />
                </ListItemButton>
              </Link>
            </div>
            <Divider sx={{ border: "0.7px solid" }} />

            <ListItemButton>
              {user ? (
                <Button
                  variant="contained"
                  endIcon={<LoginIcon fontSize="small" />}
                  fullWidth
                  onClick={handleLogOut}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="contained"
                  endIcon={<LoginIcon fontSize="small" />}
                  fullWidth
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
            </ListItemButton>
          </List>
        </Drawer>

        <IconButton
          sx={{ color: "white" }}
          onClick={() => setOpenDraw(!openDraw)}
        >
          <Badge badgeContent={quantity} color="error">
            <MenuIcon color="primary" fontSize="large" />
          </Badge>
        </IconButton>
      </ThemeProvider>
    </>
  );
}

export default DrawerComp;
