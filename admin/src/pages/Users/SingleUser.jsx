import React from "react";
import {
  useTheme,
  Box,
  Typography,
  Button,
  Avatar,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LocationSearchingOutlinedIcon from "@mui/icons-material/LocationSearchingOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";

function SingleUser() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(colors.grey[100]),
    backgroundColor: colors.blueAccent[400],
    "&:hover": {
      backgroundColor: colors.blueAccent[600],
    },
  }));

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <Header title="Edit User" subTitle="Edit User Details" />
          </div>
          <div>
            <ColorButton>CREATE</ColorButton>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3">
          <Box component="div" backgroundColor={colors.primary[400]} sx={{height: "100%", padding: "20px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
            <div className="d-flex align-items-center">
              <Avatar
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <div className="mx-3">
                <Typography color={colors.greenAccent[100]} fontWeight="600">
                  Anna Becker
                </Typography>
                <Typography
                  color={colors.greenAccent[100]}
                  fontSize="13px"
                  fontWeight="300"
                >
                  {" "}
                  Software Engineer
                </Typography>
              </div>
            </div>
            <div className="mt-4">
              <Typography color={colors.grey[200]}>Account Details</Typography>
              <div className="mt-4">
                <div className="my-2">
                  <PermIdentityOutlinedIcon sx={{ marginRight: "7px" }} />
                  <span style={{ color: colors.greenAccent[400] }}>
                    annabeck99
                  </span>
                </div>

                <div className="my-2">
                  <CalendarTodayOutlinedIcon sx={{ marginRight: "7px" }} />
                  <span style={{ color: colors.greenAccent[400] }}>
                    10.12.1999
                  </span>
                </div>
                <Typography className="my-3" color={colors.grey[200]}>
                  Contact Details
                </Typography>
                <div className="my-2">
                  <PhoneAndroidOutlinedIcon sx={{ marginRight: "7px" }} />
                  <span style={{ color: colors.greenAccent[400] }}>
                    +1 123 4646
                  </span>
                </div>

                <div className="my-2">
                  <MailOutlineOutlinedIcon sx={{ marginRight: "7px" }} />
                  <span style={{ color: colors.greenAccent[400] }}>
                    annabeck99@gmail.com
                  </span>
                </div>
                <div className="my-2">
                  <LocationSearchingOutlinedIcon sx={{ marginRight: "7px" }} />
                  <span style={{ color: colors.greenAccent[400] }}>
                    NEW YORK | USA
                  </span>
                </div>
              </div>
            </div>
          </Box>
        </div>
        <div className="col-lg-9">
          <Box backgroundColor={colors.primary[400]} component="div" sx={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "20px"}}>
            <Typography variant="h4" fontWeight="600" color={colors.grey[200]}>
              Edit
            </Typography>
            <form>
              <div className="row">
                <div className="col-lg-7">
                  <div className="col my-2">
                    <TextField
                      label="Username"
                      variant="standard"
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="col my-2">
                    <TextField
                      label="Fullname"
                      variant="standard"
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="col my-2">
                    <TextField
                      type="email"
                      label="Email"
                      variant="standard"
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="col my-2">
                    <TextField
                      label="Phone"
                      variant="standard"
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                  <div className="col my-2">
                    <TextField
                      label="Address"
                      variant="standard"
                      InputLabelProps={{
                        style: { color: colors.greenAccent[400] },
                      }}
                      fullWidth
                    />
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="d-flex justify-content-end">
                    <div className="d-flex justify-content-between w-50">
                      <div>
                        <Avatar
                          sx={{ width: 100, height: 100 }}
                          src="https://images.pexels.com/photos/1310474/pexels-photo-1310474.jpeg?auto=compress&cs=tinysrgb&w=800"
                          alt=""
                        />
                      </div>
                      <div>
                        <label htmlFor="file">
                          <PublishOutlinedIcon className="userUpdateIcon" />
                        </label>
                        <input
                          type="file"
                          id="file"
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <ColorButton>Update</ColorButton>
                </div>
              </div>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default SingleUser;
