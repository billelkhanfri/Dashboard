import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { frFR } from "@mui/x-data-grid/locales";
import {
  Box,
  Fab,
  IconButton,
  List,
  Snackbar,
  Typography,
} from "@mui/material";
import RegisterForm from "../components/RegisterUser";
import UpdateUserForm from "../components/UpdateUserForm";
import { Alert } from "@mui/material";
import { columns } from "../mui_components/UserColumns";
import { useSelector } from "react-redux";

export default function UserPage() {
  const searchTerm = useSelector((state) => state.searchTerm);

  const [users, setUsers] = useState([]);
  const [subscription, setSubscription] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false); // Nouvel état pour gérer l'affichage du formulaire de mise à jour
  const [selectedUser, setSelectedUser] = useState(null); // Nouvel état pour stocker les données de l'utilisateur sélectionné pour la mise à jour
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tecmoled/");
      let allUsers = [];
      setSubscription(response.data);
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
    } catch (error) {
      // Si la requête échoue, afficher le message d'erreur
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const toggleRegisterForm = () => {
    setFormOpen((prev) => !prev);
    setUpdateFormOpen(false);
  };

  const handleRegistrationSuccess = (message, severity) => {
    fetchUser();
    setAlertMessage(message);
    setAlertSeverity(severity);
    alert(message);

    if (severity === "success") {
      setFormOpen(false);
    }
  };

  const toggleUpdateUserForm = (user) => {
    // Fonction pour afficher/masquer le formulaire de mise à jour
    setUpdateFormOpen((prev) => !prev);
    setSelectedUser(user); // Stocke les données de l'utilisateur sélectionné
    setFormOpen(false);
  };

  const handleUpdateSuccess = (message, severity) => {
    // Fonction pour gérer la mise à jour réussie
    fetchUser();
    setAlertMessage(message);
    setAlertSeverity(severity);
    alert(message);
    setUpdateFormOpen(false);
  };

  const handleDeleteUser = async (id) => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
    );

    if (confirmation) {
      try {
        await axios.delete(`http://localhost:3000/tecmoled/user/${id}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        console.log("Utilisateur supprimé avec succès");
        setDeleteSuccess(true); // Définit deleteSuccess sur true pour afficher l'alerte
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
      }
    }
  };

  const handleEditUser = (userId) => {
    console.log("edited " + userId);
    // Recherche de l'utilisateur à partir de l'ID et affichage du formulaire de mise à jour
    const userToUpdate = users.find((user) => user.id === userId);
    toggleUpdateUserForm(userToUpdate);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent={"space-between"}
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

        <Fab
          variant="extended"
          onClick={toggleRegisterForm}
          color="primary"
          size="medium"
        >
          {/* <AddIcon></AddIcon> */}
          Ajouter
        </Fab>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Snackbar
          open={deleteSuccess}
          autoHideDuration={6000}
          onClose={() => setDeleteSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setDeleteSuccess(false)}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Utilisateur supprimé avec succès
          </Alert>
        </Snackbar>
      </Box>
      {formOpen && (
        <RegisterForm
          subscription={subscription}
          fetchUser={fetchUser}
          handleRegistrationSuccess={handleRegistrationSuccess}
          setFormOpen={setFormOpen}
        />
      )}
      {/* Affichage conditionnel du formulaire de mise à jour */}
      {updateFormOpen && (
        <UpdateUserForm
          subscription={subscription}
          user={selectedUser}
          handleUpdateSuccess={handleUpdateSuccess}
          setUpdateFormOpen={setUpdateFormOpen}
        />
      )}

      <List>
        <div style={{ height: 800, width: "100%" }}>
          <DataGrid
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
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
                      onClick={() => handleEditUser(params.row.id)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteUser(params.row.id)}
                      aria-label="delete"
                      color="error"
                    >
                      <DeleteIcon />
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
