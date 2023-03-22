import React, { useState} from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme, Avatar,Button, IconButton, Box, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import {mockDataTeam} from "../../data/testData"
import Header from "../../components/Header";
import { Link } from "react-router-dom"

function UserList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState(mockDataTeam)
  
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id  ))
  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "product",
      headerName: "Product",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        return (
          <div className='d-flex justify-content-between align-items-center'>
            <Avatar sx={{marginRight: "8px"}} src={params.row.img} alt=''/>
            {params.row.product}
          </div>
        )
      }
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
    },
    {
      field: "status",
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
        console.log(params.row.id)
        return (
          <>
          <div>
          <Link to={`${params.row.id}`} style={{textDecoration: "none", color: "inherit"}}>
          <Button variant='contained' color="success" sx={{color: colors.grey[900]}}>Edit</Button>
          </Link>
          <IconButton onClick={() => handleDelete(params.row.id)} >
          <DeleteOutlineOutlinedIcon sx={{color: colors.redAccent[400], marginLeft:"10px"}}/>
          </IconButton>
          </div>
          </>
        );
      },
    },
  ];


    return(
      <Box m="20px">
        <Header title="Products" subTitle="Managing the Product"/>
        <Box m="40px 0 0 0" width="100%" height="75vh" sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
            fontSize: "14px"
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
        }}>
        <DataGrid checkboxSelection rows={data} columns={columns}  disableRowSelectionOnClick />
        </Box>
      </Box>
    )

}

export default UserList;