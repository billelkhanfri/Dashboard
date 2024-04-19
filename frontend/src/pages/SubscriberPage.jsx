import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import DrawerHeader from "../mui_components/DrawerHeader";
import Search from "../mui_components/Search";
import SearchIconWrapper from "../mui_components/SearchIconWrapper";
import StyledInputBase from "../mui_components/StyledInputBase";
import AddIcon from "@mui/icons-material/Add";
import Person from "@mui/icons-material/Person";
import Fade from "@mui/material/Fade";
import { Snackbar, Alert } from "@mui/material";
import Button from "@mui/material/Button";
import SubscriberForm from "../components/RegisterSubscriber";
import { green, red } from "@mui/material/colors";

import { Box, CssBaseline, Typography, List } from "@mui/material";
import StaticBars from "../components/StaticBars";

import { columns } from "../mui_components/SubscribersColumns";

export default function SubscriberPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubscriberFormOpen, setIsSubscriberFormOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tecmoled/");
      setSubscribers(response.data);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const toggleSubscriberForm = () => {
    setIsSubscriberFormOpen((prev) => !prev);
  };

  const handleRegistrationSuccess = () => {
    console.log("Abonné ajouter");
    fetchSubscribers(); // Refresh user list after registration
    setIsSubscriberFormOpen(false); // Close the registration form
    setRegistrationSuccess(true); // Set registration success state
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
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
              Abonnées
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={toggleSubscriberForm}
                color="secondary"
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
              Abonné Ajouté
              </Alert>
            </Snackbar>
          </Box>

          <Fade in={isSubscriberFormOpen}>
            <div>
              {isSubscriberFormOpen && (
                <SubscriberForm
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
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </Search>

          <List>
            <div style={{ height: 800, width: "100%" }}>
              <DataGrid
                rows={subscribers
                  .filter((subscriber) => {
                    const searchTermLower = searchTerm.toLowerCase();
                    if (searchTermLower === "") return true; // Return true if search term is empty
                    const usernameLower = subscriber.clientName.toLowerCase();
                    for (let i = 0; i < searchTermLower.length; i++) {
                      if (usernameLower[i] !== searchTermLower[i]) return false;
                    }
                    return true; // If all characters match, return true
                  })
                  .map((subscriber) => ({
                    id: subscriber.id,
                    col1: subscriber.id,
                    col2: subscriber.clientName,
                    col3: subscriber.subscrState,
                    col4: subscriber.paymentDate,
                    col5: subscriber.startDate,
                    col6: subscriber.endDate,
                    col7: subscriber.maxUser,
                    col8: subscriber.nbrUserOnline,
                    backgroundColor: subscriber.subscrState
                      ? green[100]
                      : red[100], // Utilisez la couleur verte si actif, sinon rouge
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
