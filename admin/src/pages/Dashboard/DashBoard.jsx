/* eslint-disable react-hooks/exhaustive-deps */
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StatBox from "../../components/StatBox";
import Chart from "../../components/Chart";
import Users from "../../components/Users";
import UserTransaction from "../../components/UserTransaction";
import { userRequest } from "../../axiosRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getCustomers, getOrders, logout } from "../../redux/ApiCalls";

function DashBoard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [revenue, setRevenue] = useState([]);
  const [dailySales, setDailySales] = useState([]);
  const [dailyOrders, setDailyOrders] = useState(0);
  const allOrder = useSelector((state) => state.order.orders);
  const transactionOrders = allOrder.slice().reverse();

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
  const year = new Date().getFullYear();
  const today = moment();
  const dayOfYear = today.dayOfYear();
  const date = today.year(year).dayOfYear(dayOfYear);
  const formattedDate = date.format("MMMM Do, YYYY");
  const newDate = new Date();
  const currentMonth = newDate.getMonth() + 1;

  const previousMonth = revenue.find((item) => item._id === currentMonth - 1);

  const matchedSales = dailySales.find((sale) => sale._id === dayOfYear);
  const dailyTotalSales = matchedSales ? matchedSales.totalOrders : "$0";
  const dailyTotalOrders = matchedSales ? dailyOrders : "0";

  useEffect(() => {
    getOrders(dispatch, navigate);
  }, []);

  useEffect(() => {
    const getRevenue = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        const income = res.data;
        setRevenue(income);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          logout(dispatch);
          navigate("/login");
        } else if (error.response && error.response.status === 401) {
          window.location.reload();
        }
      }
    };

    getRevenue();
  }, []);

  useEffect(() => {
    const getDailySales = async () => {
      try {
        const res = await userRequest.get("/orders/incomeperday");
        setDailySales(res.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          logout(dispatch);
          navigate("/login");
        } else if (error.response && error.response.status === 401) {
          window.location.reload();
        }
      }
    };
    getDailySales();
  }, []);

  useEffect(() => {
    const getDailyOrders = async () => {
      try {
        const res = await userRequest.get("/orders/ordersperday");
        setDailyOrders(res.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          logout(dispatch);
          navigate("/login");
        } else if (error.response && error.response.status === 401) {
          window.location.reload();
        }
      }
    };
    getDailyOrders();
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
      } catch (error) {
        if (error.response && error.response.status === 403) {
          logout(dispatch);
          navigate("/login");
        } else if (error.response && error.response.status === 401) {
          window.location.reload();
        }
      }
    };
    getStats();
  }, [months]);

  useEffect(() => {
    getCustomers(dispatch);
  }, [dispatch]);

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
          <div
            className="col-lg-3"
            style={{
              display: revenue ? "block" : "none",
            }}
          >
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
                title={previousMonth ? `$${previousMonth?.totalOrders}` : "$0"}
                subTitle="Last Month Sales"
                isIncrease
                isProgress
                icon={
                  <LocalAtmOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
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
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                margin: "3px",
              }}
            >
              <StatBox
                title={
                  currentMonth === revenue[revenue.length - 1]?._id
                    ? `$${revenue[revenue.length - 1]?.totalOrders}`
                    : "$0"
                }
                subTitle="Total Monthly Sales"
                isProgress
                isIncrease
                icon={
                  <LocalAtmOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
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
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                margin: "3px",
              }}
            >
              <StatBox
                title={`$${dailyTotalSales}`}
                subTitle={`Today Sales on ${formattedDate}`}
                isProgress
                isIncrease
                icon={
                  <LocalAtmOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
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
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                margin: "3px",
              }}
            >
              <StatBox
                title={dailyTotalOrders}
                subTitle={`Today Orders on ${formattedDate}`}
                isProgress
                isIncrease
                icon={
                  <ShoppingCartOutlinedIcon
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
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
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
                variant="h4"
                fontWeight="600"
                color={colors.greenAccent[400]}
                mb="10px"
                style={{ position: "sticky", top: 0, paddingLeft: "5px" }}
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
                variant="h4"
                fontWeight="600"
                color={colors.greenAccent[400]}
                mb="10px"
              >
                Recent Transactions
              </Typography>
            </Box>
            <Box style={{ maxHeight: "260px", overflowY: "auto" }}>
              <UserTransaction transactions={transactionOrders} />
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
