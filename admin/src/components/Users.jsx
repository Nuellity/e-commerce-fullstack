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
import axios from "axios"
import { useSelector } from "react-redux"



function Users() {
    const token = useSelector(state => state.user.currentUser.accesstoken)
  const [users, setUsers] = useState([]);
  const GET_USER_URL =  "http://localhost:4000/api/users/?new=true";

  useEffect(() => {
    const getUsers = async () => {
      try {
        const config =  {
            headers: {
                'token': `Bearer ${token}`,
            }
        }
        const res = await axios.get(GET_USER_URL, config);
        setUsers(res.data);
      } catch (error) {}
    };
    getUsers();
  }, [token]);

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
