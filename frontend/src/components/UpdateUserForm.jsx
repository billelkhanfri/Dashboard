import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

export default function UpdateUserForm({ user, handleUpdateSuccess, subscription }) {
  const [formData, setFormData] = useState({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    subscriptionsId: user.subscriptionsId,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/tecmoled/user/${formData.id}`,
        formData
      );

      console.log("Update successful:", response.data.success);
      handleUpdateSuccess(response.data.success, "success");
    } catch (error) {
      console.error("Update failed:", error.response.data);
      handleUpdateSuccess(error.response.data.error, "error");
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h6" gutterBottom>
          Mettre à jour l'utilisateur :{" "}
          <span style={{ color: "green" }}>
            {formData.firstName} {formData.lastName}
          </span>{" "}
          de{" "}
          <span style={{ color: "blue" }}>
            {
              subscription.find((sub) => sub.id === formData.subscriptionsId)
                ?.clientName
            }
          </span>
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          label="Prénom"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          name="lastName"
          label="Nom"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          type="email"
          required
        />
        <TextField
          name="password"
          label="Mot de passe"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="subscriptionsId-label">Client</InputLabel>
          <Select
            labelId="subscriptionsId-label"
            name="subscriptionsId"
            value={formData.subscriptionsId}
            onChange={handleChange}
            label="Client"
          >
            {subscription.map((companyName, index) => (
              <MenuItem key={index} value={companyName.id}>
                {companyName.clientName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ my: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" color="primary">
            Mettre à jour
          </Button>
        </Box>
      </form>
    </Box>
  );
}
