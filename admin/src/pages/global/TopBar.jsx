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
} from "@mui/material";
import { useContext } from "react";
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

function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [visible, setVisible] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(colorModeContext);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <Box
      backgroundColor={colors.primary[900]}
      className="container-fluid d-flex justify-content-between p-2"
      style={{
        position: "sticky",
        top: 0,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 0px 8px 0px",
      }}
    >
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box display="flex">
        <IconButton>
          <NotificationsOutlinedIcon />
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
      </Box>
    </Box>
  );
}
export default TopBar;
