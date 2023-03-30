/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {
  useTheme,
  Button,
  IconButton,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PauseCircleFilledOutlinedIcon from "@mui/icons-material/PauseCircleFilledOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { deleteOrder, getOrders } from "../../redux/ApiCalls";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function OrderList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.order.orders);
  console.log(orders);
  const transactionOrders = orders.slice().reverse();

  const handleDelete = (id) => {
    deleteOrder(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "userId",
      headerName: "Customer ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "amount",
      headerName: "Price($)",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "createdAt",
      headerName: "Date",
      renderCell: (params) => {
        return (
          <div>
            <Typography> {moment(params.row.createdAt).fromNow()}</Typography>
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        return (
          <div>
            <Chip
              label={params.row.status}
              color={params.row.status === "pending" ? "info" : "success"}
              icon={
                params.row.status === "pending" ? (
                  <PauseCircleFilledOutlinedIcon />
                ) : (
                  <DoneOutlinedIcon />
                )
              }
            />
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Link
                to={`${params.row._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  variant="contained"
                  color="success"
                  sx={{ color: colors.grey[900] }}
                >
                  Edit
                </Button>
              </Link>
              <IconButton onClick={() => handleDelete(params.row._id)}>
                <DeleteOutlineOutlinedIcon
                  sx={{ color: colors.redAccent[400], marginLeft: "10px" }}
                />
              </IconButton>
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  return (
    <Box m="20px">
      <div>
        <Header title="Orders" subTitle="Manage your Orders" />
      </div>
      <Box
        m="40px 0 0 0"
        width="100%"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-withBorderColor": {
            borderColor: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={transactionOrders}
          getRowId={(row) => row._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}

export default OrderList;
