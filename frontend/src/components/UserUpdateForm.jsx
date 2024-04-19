import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const UserUpdateForm = ({ user, onUpdate }) => {
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const updateUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser();
      onUpdate(updatedUser);
    } catch (error) {
      // Handle the error if needed
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Modifier l'utilisateur
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          label="Prénom"
          variant="outlined"
          fullWidth
          margin="normal"
          value={updatedUser.firstName}
          onChange={handleChange}
        />
        <TextField
          name="lastName"
          label="Nom"
          variant="outlined"
          fullWidth
          margin="normal"
          value={updatedUser.lastName}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={updatedUser.email}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Mot de passe"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={updatedUser.password}
          onChange={handleChange}
        />
        <TextField
          name="subscriptionsId"
          label="Subscriptions ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={updatedUser.subscriptionsId}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="secondary">
          Mettre à jour
        </Button>
      </form>
    </Box>
  );
};

export default UserUpdateForm;
