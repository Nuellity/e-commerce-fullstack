import { Box, Button, IconButton, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import React from "react";
import Header from "../../components/Header";
import { mockTransactions } from "../../data/testData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import LineChart from "../../components/LineChart"

function DashBoard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div className="container mt-2 ">
      {/* Row 1 */}
      <div className="row">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <Header title="DASHBOARD" subTitle="Welcome to your dashboard" />
          </div>
          <div>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              startIcon={<DownloadOutlinedIcon />}
            >
              <Typography color={colors.grey[100]}>Download Reports</Typography>
            </Button>
          </div>
        </div>
        {/* Row 2 */}
        <div className="row">
          <div className="col-lg-3">
            <Box
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              component="div"
              m="3px"
            >
              <StatBox
                title="12,361"
                subTitle="Emails Sent"
                progress="0.75"
                increase="+14%"
                icon={
                  <EmailIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </div>
          <div className="col-lg-3">
            <Box
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              component="div"
              m="3px"
            >
              <StatBox
                title="431,225"
                subTitle="Sales Obtained"
                progress="0.50"
                increase="+21%"
                icon={
                  <PointOfSaleIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </div>
          <div className="col-lg-3">
            <Box
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              component="div"
              m="3px"
            >
              <StatBox
                title="32,441"
                subTitle="New Clients"
                progress="0.30"
                increase="+5%"
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </div>
          <div className="col-lg-3">
            <Box
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              component="div"
              m="3px"
            >
              <StatBox
                title="1,325,134"
                subTitle="Traffic Received"
                progress="0.80"
                increase="+43%"
                icon={
                  <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </div>
        </div>
        {/* Row 3 */}
        <div className="row">
          <div className="col-lg-8">
            <Box backgroundColor={colors.primary[400]} component="div">
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
                    Revenue Generated
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
                    <DownloadOutlinedIcon sx={{
                      fontSize: "26px",
                      color: colors.grey[500]
                    }}/>
                  </IconButton>
                </Box>
              </Box>
              <Box component="div" height="250px" >
              <LineChart isDashboard={true}/>
              </Box>
            </Box>
          </div>
          <Box
          backgroundColor={colors.primary[400]}
           className="col-lg-4"
           component="div"
           mt="20px"
           height="310px"
          overflow="auto"
           >
           
          <Box
           className="d-flex justify-content-between align-items-center p-2"
           borderBottom={`4px solid ${colors.primary[500]}`}
           color={colors.grey[100]}
           component="div"
           >
            <Typography 
            color={colors.grey[100]}
            variant="h5"
            fontWeight="600"
            >
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transact, index)=> {
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
            <Typography 
            color={colors.grey[100]}
            >
              {transact.user}
            </Typography>
            </div>
            <Box
            color={colors.grey[100]}
            >{transact.date}</Box>
            <Box
            backgroundColor={colors.greenAccent[500]}
            p="5px 10px"
            borderRadius="4px"
            >
              ${transact.cost}
            </Box>
            </Box>
            )
          })}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
