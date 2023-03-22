/* eslint-disable no-unused-vars */
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme, Avatar,Button, IconButton, Box, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import {mockDataTeam} from "../../data/testData"
import Header from "../../components/Header";



// const columns = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "userName", headerName: "Username", width: 200, renderCell: (params) => {
//     return(<>
//         <Avatar src={params.row.avatar} sx={{marginRight: 2,  width: 30, height: 30}} />
//         {params.row.userName}
//         </>
//     )
//   } },
//   { field: "email", headerName: "Email", width: 200 },
//   {
//     field: "status",
//     headerName: "Status",
//     width: 120,
//   },
//   {
//     field: "transaction",
//     headerName: "Transaction Volume",
//     width: 160,
//   },
//   {
//     field: "action",
//     headerName: "Action",
//     width: 150,
//     renderCell: (params) => {
//         return (
//             <>
//             <Button variant="outlined"  size="small">Edit</Button>
//             <IconButton>
//             <DeleteOutlineOutlinedIcon sx={{color: "red"}}/>
//             </IconButton>
//             </>
//         );
        
//     }
//   },
  
  
// ];

// const rows = [
//   {
//     id: 1,
//     userName: "John Doe",
//     avatar:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
//     email: "doe@mail.com",
//     status: "active",
//     transaction: "$100.00",
//   },
//   {
//     id: 2,
//     userName: "John Doe",
//     avatar:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
//     email: "doe@mail.com",
//     status: "active",
//     transaction: "$100.00",
//   },

//   {
//     id: 3,
//     userName: "John Doe",
//     avatar:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
//     email: "doe@mail.com",
//     status: "active",
//     transaction: "$100.00",
//   },
//   {
//     id: 4,
//     userName: "John Doe",
//     avatar:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
//     email: "doe@mail.com",
//     status: "active",
//     transaction: "$100.00",
//   },
//   {
//     id: 5,
//     userName: "John Doe",
//     avatar:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
//     email: "doe@mail.com",
//     status: "active",
//     transaction: "$100.00",
//   },
//   {
//     id: 6,
//     userName: "John Doe",
//     avatar:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
//     email: "doe@mail.com",
//     status: "active",
//     transaction: "$100.00",
//   },
//   {
//     id: 7,
//     userName: "John Doe",
//     avatar:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
//     email: "doe@mail.com",
//     status: "active",
//     transaction: "$100.00",
//   },
//   {
//     id: 8,
//     userName: "John Doe",
//     avatar:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
//     email: "doe@mail.com",
//     status: "active",
//     transaction: "$100.00",
//   },
//   {
//     id: 9,
//     userName: "John Doe",
//     avatar:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
//     email: "doe@mail.com",
//     status: "active",
//     transaction: "$100.00",
//   },
//   {
//     id: 10,
//     userName: "John Doe",
//     avatar:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
//     email: "doe@mail.com",
//     status: "active",
//     transaction: "$100.00",
//   },
//   {
//     id: 11,
//     userName: "John Doe",
//     avatar:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
//     email: "doe@mail.com",
//     status: "active",
//     transaction: "$100.00",
//   },
//   {
//     id: 12,
//     userName: "John Doe",
//     avatar:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
//     email: "doe@mail.com",
//     status: "active",
//     transaction: "$100.00",
//   },
// ];

function UserList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];


    return(
      <Box m="20px">
        <Header title="Team" subTitle="Managing the Team's Info"/>
        <Box m="40px 0 0 0" width="100%" height="75vh" sx={{
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
        }}>
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns}  disableRowSelectionOnClick />
        </Box>
      </Box>
    )

  // return (
  //   <div style={{ height: "400px", width: "100%" }}>
  //     <DataGrid
  //       rows={rows}
  //       columns={columns}
  //       pageSize={8}
  //       rowsPerPageOptions={[5]}
  //       checkboxSelection
  //       disableRowSelectionOnClick
  //     />
      
  //   </div>
  // );
}

export default UserList;
