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

export default function SubscriberForm({ handleRegistrationSuccess }) {
  const [formData, setFormData] = useState({
    clientName: "",
    subscrState: "",
    paymentDate: "",
    startDate: "",
    endDate: "",
    maxUser: "",
    nbrUserOnline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "paymentDate" || name === "endDate" || name === "startDate") {
      // Handle date picker changes
      setFormData({ ...formData, [name]: new Date(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/tecmoled/subscriber",
        formData
      );
      handleRegistrationSuccess();

      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      // Optionally handle error
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
          Ajouter un nouveau abonné{" "}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            id="clientName"
            name="clientName"
            variant="outlined"
            label="Nom du client"
            fullWidth
            value={formData.clientName}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="subscrState">Abonnement actif</InputLabel>
          <Select
            id="subscrState"
            name="subscrState"
            variant="outlined"
            fullWidth
            value={formData.subscrState}
            onChange={handleChange}
          >
            <MenuItem value={true}>Oui</MenuItem>
            <MenuItem value={false}>Non</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="paymentDate"
            name="paymentDate"
            label="Date de paiement"
            type="date"
            variant="outlined"
            fullWidth
            value={formData.paymentDate}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="startDate"
            name="startDate"
            label="Date de début"
            type="date"
            variant="outlined"
            fullWidth
            value={formData.startDate}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="endDate"
            name="endDate"
            label="Date de fin"
            type="date"
            variant="outlined"
            fullWidth
            value={formData.endDate}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="maxUser"
            name="maxUser"
            variant="outlined"
            fullWidth
            type="number"
            value={formData.maxUser}
            onChange={handleChange}
            label=" Nombre maximum d'utilisateurs
"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="nbrUserOnline"
            name="nbrUserOnline"
            variant="outlined"
            fullWidth
            type="number"
            value={formData.nbrUserOnline}
            onChange={handleChange}
            label="Nombre d'utilisateurs en ligne"
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
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
