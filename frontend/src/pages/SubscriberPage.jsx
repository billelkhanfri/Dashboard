import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Search from "../mui_components/Search";
import SearchIconWrapper from "../mui_components/SearchIconWrapper";
import StyledInputBase from "../mui_components/StyledInputBase";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import SubscriberForm from "../components/RegisterSubscriber";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateSubscriberForm from "../components/UpdateSubscriberForm"; 
import { Box,  Typography, List, IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { columns } from "../mui_components/SubscribersColumns";

export default function SubscriberPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false); 
  const [selectedSubscriber, setSelectedSubscriber] = useState(null); 
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

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
    setFormOpen((prev) => !prev);
  };

 

  const handleRegistrationSuccess = (message, severity) => {
    fetchSubscribers();
    setAlertSeverity(severity);
    setAlertMessage(message);
    alert(message);
    if (severity === "success") {
      setFormOpen(false);
    }
  };

  const handleDeleteSubscriber = async (subscriberId) => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet abonné ?"
    );

    if (confirmation) {
      try {
        await axios.delete(
          `http://localhost:3000/tecmoled/subscriber/${subscriberId}`
        );
        setSubscribers((prevSubscribers) =>
          prevSubscribers.filter((subscriber) => subscriber.id !== subscriberId)
        );
        setDeleteSuccess(true); // Set state to indicate successful deletion
      } catch (error) {
        console.error("Erreur lors de la suppression de l'abonné:", error);
      }
    }
  };




   const toggleUpdateSubscriberForm = (subscriber) => {
     // Fonction pour afficher/masquer le formulaire de mise à jour
     setUpdateFormOpen((prev) => !prev);
     setSelectedSubscriber(subscriber); // Stocke les données de l'abonné sélectionné
   };
  const handleEditSubscriber = (subscriberId) => {
    console.log("edited " + subscriberId);
    // Recherche de l'abonné à partir de l'ID et affichage du formulaire de mise à jour
    const subscriberToUpdate = subscribers.find(
      (subscriber) => subscriber.id === subscriberId
    );
    toggleUpdateSubscriberForm(subscriberToUpdate);
  };

  const handleUpdateSuccess = (message, severity) => {
    // Fonction pour gérer la mise à jour réussie
    fetchSubscribers();
    setAlertSeverity(severity);
    setAlertMessage(message);
    alert(message);
    setUpdateFormOpen(false); 
  };

  return (
    <>
        

          <Box display="flex" alignItems="center" gap={2}>
            <Button
              variant="contained"
              onClick={toggleSubscriberForm}
              color="secondary"
            >
              <AddIcon></AddIcon>
            </Button>
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
          </Box>
          <Snackbar
            open={deleteSuccess}
            autoHideDuration={6000}
            onClose={() => setDeleteSuccess(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              onClose={() => setDeleteSuccess(false)}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Abonné supprimé avec succès
            </MuiAlert>
          </Snackbar>
          {formOpen && (
            <SubscriberForm
              subscription={subscribers}
              fetchSubscriber={fetchSubscribers}
              handleRegistrationSuccess={handleRegistrationSuccess}
              setFormOpen={setFormOpen}
            />
          )}
          {/* Affichage conditionnel du formulaire de mise à jour */}
          {updateFormOpen && (
            <UpdateSubscriberForm
              subscriber={selectedSubscriber}
              handleUpdateSuccess={handleUpdateSuccess}
            />
          )}

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
                  }))}
                columns={[
                  ...columns,
                  {
                    field: "actions",
                    headerName: "Actions",
                    width: 240, // Ajustement de la largeur pour accueillir les deux icônes
                    renderCell: (params) => (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 2,
                          width: "100%", // Ajustement pour aligner correctement les icônes
                        }}
                      >
                        <IconButton
                          onClick={() => handleDeleteSubscriber(params.row.id)}
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleEditSubscriber(params.row.id)}
                          aria-label="edit"
                        >
                          <EditIcon />
                        </IconButton>
                      </Box>
                    ),
                    headerAlign: "center",
                  },
                ]}
              />
            </div>
          </List>
    </>
  );
}
