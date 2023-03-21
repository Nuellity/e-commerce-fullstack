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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { useCart } from "react-use-cart";
import Cart from "../../CartPage/Cart";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/ApiCalls";

function DrawerComp() {
  const [openDraw, setOpenDraw] = useState(false);
  const [visible, setVisible] = useState(false);
  const { totalUniqueItems } = useCart();
  const [cartDraw, setCartDraw] = useState(false);

  const user = useSelector(state => state.user.currentUser)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDisplay = () => setVisible(!visible);

  const handleLogOut = () => {
    logout(dispatch);
    navigate("/login");
  };

  return (
    <>
      <Drawer
        sx={{
          width: 280,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            backgroundColor: "#75D2FF",
          },
        }}
        open={openDraw}
        onClose={() => setOpenDraw(false)}
      >
        <List>
          <ListItemButton onClick={() => setCartDraw(true)}>
            <ListItemIcon>
              <Badge badgeContent={totalUniqueItems} color="error">
                <ShoppingBagIcon fontSize="large" />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItemButton>
          <Cart openCart={cartDraw} closeCart={() => setCartDraw(false)} />
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/login"
          >
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </Link>
          <ListItemButton>
            <ListItemIcon>
              <FavoriteIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Saved Items" />
          </ListItemButton>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/login"
          >
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="My Account" />
            </ListItemButton>
          </Link>
          <Divider sx={{ border: "0.7px solid" }} />
          <div className="help-title">
            <ListItemButton onClick={handleDisplay}>
              <ListItemIcon>
                <ContactSupportIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Help" />
              {visible ? <ExpandMore /> : <ExpandLess />}
            </ListItemButton>
            <Divider sx={{ border: "0.4px solid" }} />
          </div>
          <div
            className="help-info"
            style={{ display: visible ? "none" : "block" }}
          >
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

            {
              user ? <Button
                variant="contained"
                endIcon={<LoginIcon fontSize="small" />}
                fullWidth
                onClick={handleLogOut}
              >
                Logout
              </Button> : <Button
                variant="contained"
                endIcon={<LoginIcon fontSize="small" />}
                fullWidth
                onClick={ () => navigate("/login")}
              >
                Login
              </Button>
            }
              
            </ListItemButton>
         
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white" }}
        onClick={() => setOpenDraw(!openDraw)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
    </>
  );
}

export default DrawerComp;
