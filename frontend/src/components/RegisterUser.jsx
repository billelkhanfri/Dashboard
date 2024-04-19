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
import SendIcon from "@mui/icons-material/Send";
import Divider from "@mui/material/Divider";

export default function RegisterForm({ handleRegistrationSuccess }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    subscriptionsId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        formData
      );
      console.log("Registration successful:", response.data);
      handleRegistrationSuccess();
    } catch (error) {
      console.error("Registration failed:", error.response.data);
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
          Ajouter un nouveau utilisateur{" "}
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
            <MenuItem value={1}>Option 1</MenuItem>
            <MenuItem value={2}>Option 2</MenuItem>
            <MenuItem value={3}>Option 3</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="success"
          endIcon={<SendIcon />}
          sx={{ mb: 2 }}
        >
          Envoyer
        </Button>
      </form>
      <Box>
        <Divider sx={{ my: 2 }} />
      </Box>
    </Box>
  );
}
