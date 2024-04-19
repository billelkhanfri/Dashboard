import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Person from "@mui/icons-material/Person";
import Fade from "@mui/material/Fade";
import axios from "axios";

import RegisterForm from "../components/RegisterUser";
import UserUpdateForm from "../components/UserUpdateForm";
import Button from "@mui/material/Button";
import { Box, CssBaseline, Typography, List } from "@mui/material";
import StaticBars from "../components/StaticBars";
import DrawerHeader from "../mui_components/DrawerHeader";
import Search from "../mui_components/Search";
import SearchIconWrapper from "../mui_components/SearchIconWrapper";
import StyledInputBase from "../mui_components/StyledInputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Snackbar, Alert } from "@mui/material";

import { columns } from "../mui_components/UserColumns";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

 
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tecmoled/");
      let allUsers = [];

      // Parcourir chaque objet de la société
      response.data.forEach((company) => {
        // Extraire les utilisateurs de la société actuelle et les ajouter au tableau allUsers
        allUsers = allUsers.concat(
          company.users.map((user) => ({
            ...user,
            companyName: company.clientName, // Ajouter le nom de la société à chaque utilisateur
          }))
        );
      });

      // Mettre à jour l'état avec les utilisateurs associés à leurs sociétés
      setUsers(allUsers);

      console.log(allUsers);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };


  useEffect(() => {
    fetchUser();
  }, []);

  const toggleRegisterForm = () => {
    setIsRegisterFormOpen((prev) => !prev);
  };
  const handleRegistrationSuccess = () => {
    console.log("Utilisateur Ajouté");
    fetchUsers(); // Refresh user list after registration
    setIsRegisterFormOpen(false); // Close the registration form
    setRegistrationSuccess(true); // Set registration success state
  };
  return (
    <>
      <Box display="flex">
        <CssBaseline />
        <StaticBars />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: "bold",
                fontSize: "2rem",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              Utilisateurs
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={toggleRegisterForm}
                color="success"
              >
                <AddIcon></AddIcon>
                <Person></Person>
              </Button>
            </Box>
            <Snackbar
              open={registrationSuccess}
              autoHideDuration={6000}
              onClose={() => setRegistrationSuccess(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={() => setRegistrationSuccess(false)}
                severity="success"
                sx={{ width: "100%" }}
              >
                Utilisateur Ajouté
              </Alert>
            </Snackbar>
          </Box>

          <Fade in={isRegisterFormOpen}>
            <div>
              {isRegisterFormOpen && (
                <RegisterForm
                  handleRegistrationSuccess={handleRegistrationSuccess}
                />
              )}
            </div>
          </Fade>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Nom de l'utilisateur"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </Search>
          <List>
            <div style={{ height: 800, width: "100%" }}>
              <DataGrid
                rows={users
                  .filter((u) => {
                    const searchTermLower = searchTerm.toLowerCase();
                    if (searchTermLower === "") return true;
                    const usernameLower = u.lastName.toLowerCase();
                    for (let i = 0; i < searchTermLower.length; i++) {
                      if (usernameLower[i] !== searchTermLower[i]) return false;
                    }
                    return true;
                  })
                  .map((u) => ({
                    id: u.id,
                    col1: u.id,
                    col2: u.lastName,
                    col3: u.firstName,
                    col4: u.email,
                    col5: u.password,
                    col6: u.companyName,
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
