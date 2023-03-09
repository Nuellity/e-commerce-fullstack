import React, { useState }from 'react'
import { ProSidebar, Menu, MenuItem, SidebarHeader} from "react-pro-sidebar"
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { Link } from "react-router-dom"
import { tokens } from "../../theme"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";





const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

function Sidebar() {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected]  = useState("Dashboard")
  return (
    <Box sx={{
        "& .pro-sidebar-inner": {
            background: `${colors.primary[400 ]} !important`
        },
        "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important "
        },
        "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important"
        },
        "& .pro-inner-item:hover": {
            color: "#868dfb !important"
        },
        "& pro-menu-item.active": {
            color: "#6870fa !important"
        }
    }}>
    <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <SidebarHeader style={{margin: "0px 0px 10px 0px"}}>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 10px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  AYABA-ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          </SidebarHeader>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Osas
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Ayaba Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Quick Menu
            </Typography>
            <Item
              title="Users"
              to="/contacts"
              icon={<PeopleOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Products"
              to="/invoices"
              icon={<StorefrontOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Transaction"
              to="/geography"
              icon={<MonetizationOnOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reports"
              to="/team"
              icon={<BarChartOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
             Alerts
            </Typography>
            <Item
              title="Mail"
              to="/form"
              icon={<EmailOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Feedback"
              to="/calendar"
              icon={<DynamicFeedOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Messages"
              to="/faq"
              icon={<ChatBubbleOutlineOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Staff
            </Typography>
            <Item
              title="Manage"
              to="/bar"
              icon={<WorkOutlineOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Analytics"
              to="/pie"
              icon={<TrendingUpOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Report"
              to="/line"
              icon={<ErrorOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            
          </Box>
        </Menu>
      </ProSidebar>

    </Box>
  )
}

export default Sidebar