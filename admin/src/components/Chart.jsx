import React, { useState, useMemo, useEffect } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useSelector } from "react-redux";
import axios from "axios";
import { useMediaQuery } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Chart({ grid }) {
  const isSmallerScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
const aspectRatio = isSmallerScreen ? 4 / 2 : 4 / 1;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
  const token = useSelector((state) => state.user.currentUser.accesstoken);
  const GET_USER_URL = "http://localhost:4000/api/users/stats";

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
    const getStats = async () => {
      try {
        const config = {
          headers: {
            token: `Bearer ${token}`,
          },
        };
        const res = await axios.get(GET_USER_URL, config);
        res.data.map((item) =>
          setUserStats((prev) =>{
           const index = prev.findIndex(user => user.name === months[item._id - 1] );
           if (index !== -1) {
            const updatedItem = { ...prev[index], activeUser: item.totalUsers };
            return [...prev.slice(0, index), updatedItem, ...prev.slice(index + 1, 12)];
          }
          return prev;
          })
        );
      } catch (error) {}
    };
    getStats();
  }, [months, token]);


  return (

    <ResponsiveContainer width="100%" aspect={aspectRatio}>
      <LineChart data={userStats}>
        <XAxis dataKey="name" stroke={colors.redAccent[200]} />
        <YAxis stroke={colors.blueAccent[200]} />
        <Line
          type="monotone"
          dataKey="activeUser"
          stroke={colors.blueAccent[700]}
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>

  );
}

export default Chart;
