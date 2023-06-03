import React, { useState, useEffect } from "react";
import {
  IconButton,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  useTheme,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { userRequest } from "../axiosRequest";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";

function Users() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users/?new=true");
        setUsers(res.data);
      } catch (error) {}
    };
    getUsers();
  }, []);

  return (
    <List style={{ maxHeight: "280px", overflowY: "auto" }}>
      {users.map((user, index) => {
        return (
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="view user"
                onClick={() => navigate(`/users/${user._id}`)}
              >
                <VisibilityOutlinedIcon
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: colors.greenAccent[200],
                    },
                  }}
                />
                <Typography ml="5px">view user</Typography>
              </IconButton>
            }
            key={index}
          >
            <ListItemAvatar>
              <Avatar alt="user avatar" src={user.image} />
            </ListItemAvatar>
            <ListItemText primary={user?.email} />
          </ListItem>
        );
      })}
    </List>
  );
}

export default Users;
