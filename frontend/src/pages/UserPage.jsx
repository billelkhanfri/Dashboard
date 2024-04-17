import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { Box, CssBaseline, styled, Typography, List } from "@mui/material";
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
  const columns = [
    {
      field: "col1",
      headerName: "id",
      width: 150,
     
    },
    {
      field: "col2",
      headerName: "Nom",
      flex: 1,
    
    },
    {
      field: "col3",
      headerName: "Email",
      flex: 1,
     
    },
  ];
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
            <div style={{ height: 800, width: "100%" }}>
              <DataGrid
                rows={users.map((user, index) => ({
                  id: user.id,
                  col1: user.id,
                  col2: user.username,
                  col3: user.email,
                }))}
                columns={columns}
              />
            </div>
          </List>
        </Box>
      </Box>
    </>
  );
}
