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

export default function UpdateSubscriberForm({
  subscriber,
  handleUpdateSuccess,
}) {
  const [formData, setFormData] = useState(subscriber);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir modifier cet abonné ?"
    );

    if (confirmation) {
      e.preventDefault();
      try {
        // Format date fields before sending to the server
        const formattedFormData = {
          ...formData,
          paymentDate: formatDate(formData.paymentDate),
          startDate: formatDate(formData.startDate),
          endDate: formatDate(formData.endDate),
        };

        const response = await axios.put(
          `http://localhost:3000/tecmoled/subscriber/${subscriber.id}`,
          formattedFormData
        );

        console.log("Update successful:", response.data.message);
        handleUpdateSuccess(response.data.message, "success");
      } catch (error) {
        console.error("Update failed:", error.response.data);
        handleUpdateSuccess(error.response.data.error, "error");
      }
    }
  };

  // Function to format date in YYYY-MM-DD format
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split("T")[0];
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
          Modifier Abonné
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
            required
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
            required
          >
            <MenuItem value={true}>Oui</MenuItem>
            <MenuItem value={false}>Non</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel
            htmlFor="paymentDate"
            style={{
              position: "absolute",
              top: "-30px",
              left: "-6px",
              background: "#FFF",
              padding: "0 4px",
            }}
          >
            Date de paiement
          </InputLabel>
          <TextField
            id="paymentDate"
            name="paymentDate"
            type="date"
            variant="outlined"
            fullWidth
            value={formData.paymentDate}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel
            htmlFor="startDate"
            style={{
              position: "absolute",
              top: "-30px",
              left: "-6px",
              background: "#FFF",
              padding: "0 4px",
            }}
          >
            Date de début
          </InputLabel>
          <TextField
            id="startDate"
            name="startDate"
            type="date"
            variant="outlined"
            fullWidth
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel
            htmlFor="endDate"
            style={{
              position: "absolute",
              top: "-30px",
              left: "-6px",
              background: "#FFF",
              padding: "0 4px",
            }}
          >
            Date de fin
          </InputLabel>
          <TextField
            id="endDate"
            name="endDate"
            type="date"
            variant="outlined"
            fullWidth
            value={formData.endDate}
            onChange={handleChange}
            required
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
            label=" Nombre maximum d'utilisateurs"
            required
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
            required
          />
        </FormControl>

        <Box sx={{ my: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            endIcon={<SendIcon />}
          >
            Mettre à jour
          </Button>
        </Box>
      </form>
      <Box>
        <Divider sx={{ my: 2 }} />
      </Box>
    </Box>
  );
}
