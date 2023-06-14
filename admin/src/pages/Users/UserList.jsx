/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme, Button, IconButton, Box } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { deleteCustomer, getCustomers } from "../../redux/ApiCalls";
import { useDispatch, useSelector } from "react-redux";

function UserList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customers = useSelector((state) => state.customer.customers);

  const handleDelete = (id) => {
    deleteCustomer(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      cellClassName: "name-column--cell",
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

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(colors.grey[100]),
    backgroundColor: colors.blueAccent[400],
    "&:hover": {
      backgroundColor: colors.blueAccent[600],
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: "8rem",
      height: "2.5rem",
      fontSize: "0.7rem",
    },
    [theme.breakpoints.up("md")]: {
      width: "12.5rem",
      height: "2.5rem",
      fontSize: "1rem",
    },
  }));

  useEffect(() => {
    getCustomers(dispatch);
  }, [dispatch]);

  return (
    <Box className="container mt-4">
      <div className="d-flex justify-content-between">
        <Header title="Customers" subTitle="Manage your Customer's Info" />
        <ColorButton onClick={() => navigate("/newuser")}>
          CREATE NEW USER
        </ColorButton>
      </div>
      <Box
        className="pb-5"
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
          rows={customers}
          getRowId={(row) => row._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}

export default UserList;
