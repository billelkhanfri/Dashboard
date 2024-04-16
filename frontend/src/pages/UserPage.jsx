import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  styled,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import StaticBars from "../components/StaticBars";

export default function UserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/"); 
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <StaticBars />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography variant="h4" gutterBottom>
            User List
          </Typography>
          <List>
            {users.map((user) => (
              <ListItem key={user.id}>
                <ListItemText
                  primary={`Username: ${user.username}`}
                  secondary={`Email: ${user.email}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
}
