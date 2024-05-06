import { useForm, Controller } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { frFR } from "@mui/x-date-pickers/locales";

import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack
} from "@mui/material";
import axios from "axios";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  frFR
);
export default function SubscriberForm({
  handleRegistrationSuccess,
  setFormOpen,
}) {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();
  const [subscriptionState, setSubscriptionState] = useState(true);

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
      console.log("Data submitted:", formattedFormData); // Afficher toutes les données soumises

      console.log("Registration successful:", response.data.success);
      handleRegistrationSuccess(response.data.success, "success");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      handleRegistrationSuccess(error.response.data.error, "error");
    }
  };

  const validateNbrUserOnline = (value) => {
    return (
      value <= getValues("maxUser") ||
      "Le nombre d'utilisateurs en ligne ne doit pas dépasser le nombre maximum d'utilisateurs"
    );
  };

  // Function to format date using dayjs
  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };
  return (
    <ThemeProvider theme={theme}>
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
            />
            <FormHelperText error>
              {errors.clientName && errors.clientName.message}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Abonnement
            </FormLabel>
            <Controller
              name="subscrState"
              control={control}
              defaultValue={true}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  value={subscriptionState} // Set the value to the state
                  onChange={(e) => {
                    setSubscriptionState(e.target.value); // Update the state on change
                    field.onChange(e.target.value); // Trigger the field change
                  }}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Actif"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Inactif"
                  />
                </RadioGroup>
              )}
            />
            <FormHelperText error>
              {errors.subscrState && errors.subscrState.message}
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <LocalizationProvider dateAdapter={AdapterDayjs} locale="fr">
              <TextField
                id="paymentDate"
                type="date"
                label="Date de paiment"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("paymentDate", {
                  required: "La date de paiement est requise",
                })}
                variant="outlined"
                fullWidth
              />
            </LocalizationProvider>
            <FormHelperText error>
              {errors.paymentDate && errors.paymentDate.message}
            </FormHelperText>
          </FormControl>

          <Box display={"flex"} gap={2}>
            <FormControl fullWidth margin="normal">
              <LocalizationProvider dateAdapter={AdapterDayjs} locale="fr">
                <TextField
                  id="startDate"
                  type="date"
                  label="Date de début"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("startDate", {
                    required: "La date de début paiement est requise",
                  })}
                  variant="outlined"
                  fullWidth
                />
              </LocalizationProvider>
              <FormHelperText error>
                {errors.startDate && errors.startDate.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <LocalizationProvider dateAdapter={AdapterDayjs} locale="fr">
                <TextField
                  id="endDate"
                  type="date"
                  label="Date de fin"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("endDate", {
                    required: "La date de  fin paiement est requise",
                  })}
                  variant="outlined"
                  fullWidth
                />
              </LocalizationProvider>
              <FormHelperText error>
                {errors.endDate && errors.endDate.message}
              </FormHelperText>
            </FormControl>
          </Box>

          <FormControl fullWidth margin="normal">
            <TextField
              {...register("maxUser", {
                required: "Le nombre maximum d'utilisateurs est requis",
              })}
              type="number"
              variant="outlined"
              label="Nombre maximum d'utilisateurs"
              fullWidth
              inputProps={{ min: 0 }}
            />
            <FormHelperText error>
              {errors.maxUser && errors.maxUser.message}
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              {...register("nbrUserOnline", {
                required: "Le nombre d'utilisateurs en ligne est requis",
                validate: validateNbrUserOnline,
              })}
              type="number"
              variant="outlined"
              label="Nombre d'utilisateurs en ligne"
              fullWidth
              inputProps={{ min: 0 }}
            />
            <FormHelperText error>
              {errors.nbrUserOnline && errors.nbrUserOnline.message}
            </FormHelperText>
          </FormControl>

          <Stack
            gap={2}
            flexDirection={"row"}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
            my="20px"
          >
            <Button variant="outlined" onClick={() => setFormOpen(false)}>
              Annuler
            </Button>

            <Button type="submit" variant="contained" color="primary">
             Envoyer
            </Button>
          </Stack>
        </form>
        <Box>
          <Divider sx={{ my: 2 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
