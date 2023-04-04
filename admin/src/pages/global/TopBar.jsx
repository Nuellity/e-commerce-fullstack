import {
  Box,
  IconButton,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Divider,
  ListItemIcon,
  Typography,
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { colorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../redux/ApiCalls";
import { userRequest } from "../../axiosRequest";
import moment from "moment";

function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [horEl, setHorEl] = useState(null);
  const [visible, setVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [lastNumItemsAdded, setLastNumItemsAdded] = useState(0);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(colorModeContext);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const transactionOrders = orders.slice().reverse();

  const notificationOrders = transactionOrders.slice(0, 5);

  console.log("notify: ", notificationOrders);

  const open = Boolean(anchorEl);
  const openNotif = Boolean(horEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setVisible(!visible);
  };

  const handleNotif = (event) => {
    setHorEl(event.currentTarget);
    setVisible(!visible);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseNotif = () => {
    setHorEl(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogOut = () => {
    logout(dispatch);
    navigate("/login");
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders");
        setOrders(res.data);
      } catch (error) {}
    };

    getOrders();
  }, []);

  useEffect(() => {
    const numNewItems = orders.length - lastNumItemsAdded;
    if (numNewItems > 0) {
      setLastNumItemsAdded(orders.length);
    }
  }, [orders.length]);

  const numItemsAdded = orders.length - lastNumItemsAdded;

  console.log(
    "newItems: ",
    numItemsAdded,
    "numOrders ",
    orders.length,
    "lastNumItems: ",
    lastNumItemsAdded
  );

  return (
    <Box
      backgroundColor={colors.primary[400]}
      className="container-fluid d-flex justify-content-between p-2"
      style={{
        position: "sticky",
        top: 0,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 0px 8px 0px",
      }}
    >
      <Box display="flex" borderRadius="3px">
        <InputBase
          sx={{ ml: 2, flex: 1, borderColor: "red" }}
          placeholder="Search"
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box display="flex">
        <IconButton
          onClick={handleNotif}
          aria-controls={openNotif ? "notif-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openNotif ? "true" : undefined}
        >
          <Badge badgeContent={numItemsAdded} color="error">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt=""
          />
        </IconButton>

        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
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

        <Menu
          anchorEl={horEl}
          id="notif-menu"
          open={openNotif}
          onClose={handleCloseNotif}
          onClick={handleCloseNotif}
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
          <Typography sx={{ padding: "5px", color: colors.grey[400] }}>
            Order Notifications
          </Typography>
          {notificationOrders.map((value, index) => (
            <div key={index}>
              {" "}
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={value.products[0].img} />
                </ListItemAvatar>
                <ListItemText
                  primary={value.products[0].name}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {`${value.userFirstName} ${value.userLastName}`}
                      </Typography>
                      {" — has placed an order "}
                      {moment(value.createdAt).fromNow()}
                    </>
                  }
                />
              </ListItem>
            </div>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
export default TopBar;
