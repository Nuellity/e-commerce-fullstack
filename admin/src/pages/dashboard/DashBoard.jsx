import {
  Box,
  IconButton,
  useTheme,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { tokens } from "../../theme";
import React from "react";
import Header from "../../components/Header";
import { mockTransactions } from "../../data/testData";
import List from "@mui/material/List";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import Visibility from "@mui/icons-material/Visibility";
import StatBox from "../../components/StatBox";
import LineChart from "../../components/LineChart";

function DashBoard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 
  return (
    <div className="container mt-2 ">
      {/* Row 1 */}
      <div className="row">
        <div className="container d-flex justify-content-start align-items-center">
          <div>
            <Header title="DASHBOARD" subTitle="Welcome to your dashboard" />
          </div>
        </div>
        {/* Row 2 */}
        <div className="row">
          <div className="col-lg-4">
            <Box
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              component="div"
              sx={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", margin: "3px"}}
            >
              <StatBox
                title="$12,361"
                subTitle="Revenue"
                progress="0.75"
                increase="+14%"
                icon={
                  <LocalAtmOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
                  />
                }
              />
            </Box>
          </div>
          <div className="col-lg-4">
            <Box
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              component="div"
              sx={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", margin: "3px"}}
            >
              <StatBox
                title="$31,624"
                subTitle="Sales"
                progress="0.50"
                increase="+21%"
                icon={
                  <InventoryOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
                  />
                }
              />
            </Box>
          </div>
          <div className="col-lg-4">
            <Box
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              component="div"
              sx={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", margin: "3px"}}
            >
              <StatBox
                title="$8,475"
                subTitle="Cost"
                progress="0.80"
                increase="+43%"
                icon={
                  <PointOfSaleOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
                  />
                }
              />
            </Box>
          </div>
        </div>
        {/* Row 3 */}
        <div className="row">
          <div className="col">
            <Box backgroundColor={colors.primary[400]}   sx={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}component="div">
              <Box
                mt="20px"
                p="10px 20px 0 20px"
                className="d-flex justify-content-between align-items-center"
                component="div"
              >
                <Box component="div">
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    User Analytics
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    $59,342.22
                  </Typography>
                </Box>
                <Box component="div">
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{
                        fontSize: "26px",
                        color: colors.grey[500],
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box component="div" height="250px">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
          </div>
        </div>
        {/* ROW 4*/}
        <div className="row">

          <div className="col-lg-4">
          
            <Box
              backgroundColor={colors.primary[400]}
              component="div"
              className="py-2 my-3"
              sx={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}
              
            >
            <Typography fontWeight="600" color={colors.grey[100]} variant="h5" style={{ position: "sticky", top: 0,  padding: "5px 10px"}}>
                Newly Regsitered Users
              </Typography>
              <List style={{ maxHeight: "280px", overflowY: "auto" }}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="view user">
                      <Visibility />
                      <Typography ml="5px">view user</Typography>
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="user avatar"
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    />
                  </ListItemAvatar>
                  <ListItemText primary="John Doe" />
                </ListItem>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="view user">
                      <Visibility />
                      <Typography ml="5px">view user</Typography>
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="user avatar"
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    />
                  </ListItemAvatar>
                  <ListItemText primary="John Doe" />
                </ListItem>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="view user">
                      <Visibility />
                      <Typography ml="5px">view user</Typography>
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="user avatar"
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    />
                  </ListItemAvatar>
                  <ListItemText primary="John Doe" />
                </ListItem>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="view user">
                      <Visibility />
                      <Typography ml="5px">view user</Typography>
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="user avatar"
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    />
                  </ListItemAvatar>
                  <ListItemText primary="John Doe" />
                </ListItem>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="view user">
                      <Visibility />
                      <Typography ml="5px">view user</Typography>
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="user avatar"
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    />
                  </ListItemAvatar>
                  <ListItemText primary="John Doe" />
                </ListItem>
              </List>
            </Box>
          </div>
          <Box
            backgroundColor={colors.primary[400]}
            className="col-lg-8 my-3"
            component="div"
            sx={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}
          >
            <Box
              className="p-2"
              color={colors.grey[100]}
              component="div"
              style={{ position: "sticky", top: 0,}}
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Recent Transactions
              </Typography>
            </Box>
            <Box
            style={{ maxHeight: "260px", overflowY: "auto" }}>
            {mockTransactions.map((transact, index) => {
              return (
                <Box
                  key={index}
                  className="d-flex justify-content-between align-items-center p-2"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  
                >
                  <div>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transact.txId}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transact.user}
                    </Typography>
                  </div>
                  <Box color={colors.grey[100]}>{transact.date}</Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transact.cost}
                  </Box>
                </Box>
                
              );
            })}
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
