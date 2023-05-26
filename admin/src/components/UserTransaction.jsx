import React from "react";
import {
  Table,
  useTheme,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
} from "@mui/material";
import PauseCircleFilledOutlinedIcon from "@mui/icons-material/PauseCircleFilledOutlined";

import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { tokens } from "../theme";
import moment from "moment";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserTransaction() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const allOrder = useSelector((state) => state.order.orders);
  const transactionOrders = allOrder.slice().reverse();

  console.log(allOrder);

  const navigate = useNavigate();

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
              <TableCell
                component="th"
                scope="row"
                onClick={() => navigate(`/transactions/${order._id}`)}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: colors.greenAccent[200],
                    },
                  }}
                >
                  {order.userId}
                </Typography>
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
