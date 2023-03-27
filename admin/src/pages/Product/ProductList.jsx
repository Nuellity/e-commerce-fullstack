/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {
  useTheme,
  Avatar,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { styled } from "@mui/material/styles";
import { mockDataTeam } from "../../data/testData";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/ApiCalls";

function UserList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [data, setData] = useState(mockDataTeam);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  console.log(products);

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };
  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "product",
      headerName: "Product",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <Avatar
              sx={{ marginRight: "12px" }}
              src={params.row.img[0].original}
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "count",
      headerName: "Stock",
      type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
    },
    {
      field: "inStock",
      headerName: "Status",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "price",
      headerName: "Price ($)",
      flex: 1,
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
  }));

  return (
    <Box m="20px">
      <div className="d-flex justify-content-between">
        <Header title="Products" subTitle="Managing the Product" />
        <div>
          <ColorButton
            onClick={() => navigate("/newproduct")}
            style={{
              width: "150px",
              height: "40px",
              fontSize: "13px",
              fontWeight: "bold",
            }}
            variant="contained"
          >
            Add new product
          </ColorButton>
        </div>
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
            fontSize: "14px",
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
        }}
      >
        <DataGrid
          checkboxSelection
          rows={products}
          getRowId={(row) => row._id}
          columns={columns}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}

export default UserList;
