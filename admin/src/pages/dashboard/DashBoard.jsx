import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import StatBox from "../../components/StatBox";
import Chart from "../../components/Chart";
import Users from "../../components/Users";
import UserTransaction from "../../components/UserTransaction";
import { userRequest } from "../../axiosRequest";

function DashBoard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [revenue, setRevenue] = useState([]);
  const [percent, setPercent] = useState(0);
  const [userStats, setUserStats] = useState([
    { name: "Jan", activeUser: 0 },
    { name: "Feb", activeUser: 0 },
    { name: "Mar", activeUser: 0 },
    { name: "Apr", activeUser: 0 },
    { name: "May", activeUser: 0 },
    { name: "Jun", activeUser: 0 },
    { name: "Jul", activeUser: 0 },
    { name: "Aug", activeUser: 0 },
    { name: "Sep", activeUser: 0 },
    { name: "Oct", activeUser: 0 },
    { name: "Nov", activeUser: 0 },
    { name: "Dec", activeUser: 0 },
  ]);
  console.log(userStats);
  const months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getRevenue = async () => {
      try {
        const res = await userRequest.get("orders/income");
        const lastTwoIncome = res.data.slice(-2);
        setRevenue(lastTwoIncome);
        setPercent(
          Math.floor(
            (lastTwoIncome[1].totalOrders * 100) / lastTwoIncome[0].totalOrders
          )
        );
      } catch (error) {}
    };

    getRevenue();
  }, []);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => {
            const index = prev.findIndex(
              (user) => user.name === months[item._id - 1]
            );
            if (index !== -1) {
              const updatedItem = {
                ...prev[index],
                activeUser: item.totalUsers,
              };
              return [
                ...prev.slice(0, index),
                updatedItem,
                ...prev.slice(index + 1, 12),
              ];
            }
            return prev;
          })
        );
      } catch (error) {}
    };
    getStats();
  }, [months]);

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
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                margin: "3px",
              }}
            >
              <StatBox
                title={`$ ${revenue[1]?.totalOrders}`}
                subTitle="Revenue"
                progress={percent / 100}
                increase={`${percent}%`}
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
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                margin: "3px",
              }}
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
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                margin: "3px",
              }}
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
          <div className="col h-100">
            <Box
              backgroundColor={colors.primary[400]}
              sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              component="div"
            >
              <Box
                mt="20px"
                p="10px 20px 0 20px"
                className="d-flex justify-content-start align-items-center"
                component="div"
              >
                <Box component="div">
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    color={colors.greenAccent[400]}
                    mb="10px"
                  >
                    User Analytics
                  </Typography>
                </Box>
              </Box>
              <Box component="div" mr="8px">
                <Chart data={userStats} dataKey="activeUser" />
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
              sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            >
              <Typography
                fontWeight="600"
                color={colors.greenAccent[400]}
                variant="h5"
                style={{ position: "sticky", top: 0, padding: "5px 10px" }}
              >
                Newly Regsitered Users
              </Typography>
              <Users />
            </Box>
          </div>
          <Box
            backgroundColor={colors.primary[400]}
            className="col-lg-8 my-3"
            component="div"
            sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <Box
              className="p-2"
              color={colors.grey[100]}
              component="div"
              style={{ position: "sticky", top: 0 }}
            >
              <Typography
                color={colors.greenAccent[400]}
                variant="h5"
                fontWeight="600"
              >
                Recent Transactions
              </Typography>
            </Box>
            <Box style={{ maxHeight: "260px", overflowY: "auto" }}>
              <UserTransaction />
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
