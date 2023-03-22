import React, { useState, useEffect } from "react";
import {
  Table,
  useTheme,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import PauseCircleFilledOutlinedIcon from "@mui/icons-material/PauseCircleFilledOutlined";

import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { tokens } from "../theme";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from 'moment';

function UserTransaction() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.user.currentUser.accesstoken);
  const GET_USER_URL = "http://localhost:4000/api/orders";
  const transactionOrders = orders.slice().reverse();


  useEffect(() => {
    const getOrders = async () => {
      try {
        const config = {
          headers: {
            token: `Bearer ${token}`,
          },
        };
        const res = await axios.get(GET_USER_URL, config);
        setOrders(res.data);
      } catch (error) {}
    };
    getOrders();
  }, [token]);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 150 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: colors.greenAccent[500],
              }}
            >
              Customer
            </TableCell>
            <TableCell
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: colors.greenAccent[500],
              }}
              align="right"
            >
              Date
            </TableCell>
            <TableCell
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: colors.greenAccent[500],
              }}
              align="right"
            >
              Amount
            </TableCell>
            <TableCell
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: colors.greenAccent[500],
              }}
              align="right"
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactionOrders.map((order, index) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={index}
            >
              <TableCell component="th" scope="row">
                {order.userId}
              </TableCell>
              <TableCell align="right">
              {moment(order.createdAt).fromNow()}
              </TableCell>
              <TableCell align="right">${order.amount}</TableCell>
              <TableCell align="right">
                {" "}
                <Chip
                  label={order.status}
                  color={order.status === "pending" ? "info" : "success"}
                  icon={
                    order.status === "pending" ? (
                      <PauseCircleFilledOutlinedIcon />
                    ) : (
                      <DoneOutlinedIcon />
                    )
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTransaction;
