import {
  Box,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Button,
  Typography,
  Badge,
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { colorModeContext, tokens } from "../../theme";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../redux/ApiCalls";
import { userRequest } from "../../axiosRequest";
import moment from "moment";
import SearchBar from "../../components/SearchBar";
import { Link } from "react-router-dom";

function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [horEl, setHorEl] = useState(null);
  const [visible, setVisible] = useState(false);
  const [orders, setOrders] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(colorModeContext);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const transactionOrders = orders.slice().reverse();

  const notificationOrders = transactionOrders.slice(0, 5);

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
      <div style={{ width: "30em" }}>
        <SearchBar />
      </div>
      <Box display="flex">
        <IconButton
          onClick={handleNotif}
          aria-controls={openNotif ? "notif-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openNotif ? "true" : undefined}
        >
          <Badge badgeContent={0} color="error">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>

        <IconButton
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <PersonOutlineOutlinedIcon />
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
              bgcolor: colors.grey[800],
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
                sx={{
                  marginLeft: "10px",
                  backgroundColor: colors.redAccent[600],
                }}
                size="large"
                onClick={handleLogOut}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="contained"
                endIcon={<LoginIcon fontSize="small" />}
                sx={{
                  marginLeft: "10px",
                  backgroundColor: colors.greenAccent[600],
                }}
                size="large"
                onClick={handleLogin}
              >
                Login
              </Button>
            )}
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
                width: 20,
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
          <List>
            {notificationOrders.map((value, index) => (
              <Link
                to={`/transactions/${value._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
                key={index}
              >
                <ListItem sx={{ cursor: "pointer" }}>
                  <ListItemAvatar>
                    <img
                      src={value.products[0].img}
                      alt={value.title}
                      style={{
                        height: "3rem",
                        width: "3rem",
                        objectFit: "contain",
                        borderRadius: "1rem",
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color={colors.greenAccent[500]}
                      >
                        {"  order was placed "}
                        {moment(value.createdAt).fromNow()}.
                      </Typography>
                    }
                    primary={value.products[0].name}
                    variant="body1"
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Menu>
      </Box>
    </Box>
  );
}
export default TopBar;
