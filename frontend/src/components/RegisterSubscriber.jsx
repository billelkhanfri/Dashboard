import { useForm } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import Divider from "@mui/material/Divider";
import { useState } from "react";

export default function SubscriberForm({ handleRegistrationSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [subscriptionState, setSubscriptionState] = useState(true); // State to track subscription state

  const onSubmit = async (formData) => {
    try {
      // Format date fields before sending to the server
      const formattedFormData = {
        ...formData,
        subscrState: subscriptionState,
        paymentDate: formatDate(formData.paymentDate),
        startDate: formatDate(formData.startDate),
        endDate: formatDate(formData.endDate),
      };

      const response = await axios.post(
        "http://localhost:3000/tecmoled/subscriber",
        formattedFormData
      );

      console.log("Registration successful:", response.data.success);
      handleRegistrationSuccess(response.data.success, "success");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      handleRegistrationSuccess(error.response.data.error, "error");
    }
  };

  // Function to format date in YYYY-MM-DD format
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split("T")[0];
  };

  return (
    <Box maxWidth={"50%"} margin={"auto"}>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <TextField
            id="clientName"
            {...register("clientName", {
              required: "Le nom du client est requis",
            })}
            variant="outlined"
            label="Nom du client"
            fullWidth
            required
          />
          <FormHelperText error>
            {errors.clientName && errors.clientName.message}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="subscrState" required>
            Abonnement
          </InputLabel>
          <Select
            id="subscrState"
            variant="outlined"
            fullWidth
            label="Abonnement"
            required
            defaultValue=""
            value={subscriptionState} // Set the value to the state
            onChange={(e) => setSubscriptionState(e.target.value)} // Update the state on change
          >
            <MenuItem value={true}>Actif</MenuItem>
            <MenuItem value={false}>Inactif</MenuItem>
          </Select>

          <FormHelperText error>
            {errors.subscrState && errors.subscrState.message}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="paymentDate" required>
            Date de paiement
          </InputLabel>
          <TextField
            id="paymentDate"
            type="date"
            {...register("paymentDate", {
              required: "La date de paiement est requise",
            })}
            variant="outlined"
            fullWidth
            required
            label="Date de paiement"
          />
          <FormHelperText error>
            {errors.paymentDate && errors.paymentDate.message}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="startDate" required>
            Date de début
          </InputLabel>
          <TextField
            id="startDate"
            type="date"
            {...register("startDate", {
              required: "La date de début est requise",
            })}
            variant="outlined"
            fullWidth
            required
            label=" Date de début"
          />
          <FormHelperText error>
            {errors.startDate && errors.startDate.message}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="endDate" required>
            Date de fin
          </InputLabel>
          <TextField
            id="endDate"
            type="date"
            {...register("endDate", { required: "La date de fin est requise" })}
            variant="outlined"
            fullWidth
            required
            label=" Date de fin"
          />
          <FormHelperText error>
            {errors.endDate && errors.endDate.message}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="maxUser"
            type="number"
            {...register("maxUser", {
              required: "Le nombre maximum d'utilisateurs est requis",
            })}
            variant="outlined"
            fullWidth
            label="Nombre maximum d'utilisateurs"
            required
          />
          <FormHelperText error>
            {errors.maxUser && errors.maxUser.message}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="nbrUserOnline"
            type="number"
            {...register("nbrUserOnline", {
              required: "Le nombre d'utilisateurs en ligne est requis",
            })}
            variant="outlined"
            fullWidth
            label="Nombre d'utilisateurs en ligne"
            required
          />
          <FormHelperText error>
            {errors.nbrUserOnline && errors.nbrUserOnline.message}
          </FormHelperText>
        </FormControl>
        <Box sx={{ my: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            endIcon={<SendIcon />}
          >
            Ajouter
          </Button>
        </Box>
      </form>
      <Box>
        <Divider sx={{ my: 2 }} />
      </Box>
    </Box>
  );
}
