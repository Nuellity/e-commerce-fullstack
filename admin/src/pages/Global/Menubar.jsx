import React, { useState } from "react";
import { IconButton, List, useTheme, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

function Menubar() {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const drawerWidth = 200;

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    position: "sticky",
    top: 0,
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const MenuDrawer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      backgroundColor: colors.primary[400],
      "& .MuiDrawer-paper": {
        ...openedMixin(theme),
        backgroundColor: colors.primary[400],
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      backgroundColor: colors.primary[400],
      "& .MuiDrawer-paper": {
        ...closedMixin(theme),
        backgroundColor: colors.primary[400],
      },
    }),
  }));

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <MenuDrawer
        variant="permanent"
        sx={{ backgroundColor: colors.primary[400] }}
        open={open}
      >
        <DrawerHeader>
          <Typography fontWeight="600" display={!open && "none"}>
            AYABA ADMIN
          </Typography>
          <IconButton onClick={handleDrawer}>
            <MenuOutlinedIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem
              sx={{
                backgroundColor:
                  selectedIndex === 0 ? colors.greenAccent[500] : "transparent",
              }}
              disablePadding
            >
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <HomeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{
              ...(!open && { display: "none" }),
              backgroundColor: colors.primary[400],
            }}
          >
            Menu
          </ListSubheader>
          <Link
            to="/users"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem
              ListItem
              sx={{
                backgroundColor:
                  selectedIndex === 1 ? colors.greenAccent[500] : "transparent",
              }}
              disablePadding
            >
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <PeopleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            to="/products"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem
              disablePadding
              ListItem
              sx={{
                backgroundColor:
                  selectedIndex === 2 ? colors.greenAccent[500] : "transparent",
              }}
            >
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <StorefrontOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Products"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            to="transactions"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem
              ListItem
              sx={{
                backgroundColor:
                  selectedIndex === 3 ? colors.greenAccent[500] : "transparent",
              }}
              disablePadding
            >
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor:
                    selectedIndex === 3 ? "green" : "transparent",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <MonetizationOnOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Transaction"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            to="reviews"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem
              ListItem
              sx={{
                backgroundColor:
                  selectedIndex === 4 ? colors.greenAccent[500] : "transparent",
              }}
              disablePadding
            >
              <ListItemButton
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <DynamicFeedOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Reviews"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </MenuDrawer>
    </>
  );
}

export default Menubar;
