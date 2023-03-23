import React, { useState, useEffect } from "react";
import {
  IconButton,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { userRequest } from "../axiosRequest";

function Users() {
  const [users, setUsers] = useState([]);

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
              <IconButton edge="end" aria-label="view user">
                <VisibilityOutlinedIcon />
                <Typography ml="5px">view user</Typography>
              </IconButton>
            }
            key={index}
          >
            <ListItemAvatar>
              <Avatar alt="user avatar" src={user.image} />
            </ListItemAvatar>
            <ListItemText primary={`${user.firstName} ${user.lastName}`} />
          </ListItem>
        );
      })}
    </List>
  );
}

export default Users;
