import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

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

export default function RegisterForm({
  subscription,
  handleRegistrationSuccess,
  setFormOpen,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/tecmoled/user",
        formData
      );

      console.log("Registration successful:", response.data.success);
      handleRegistrationSuccess(response.data.success, "success");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      handleRegistrationSuccess(error.response.data.error, "error");
    }
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
          Ajouter un nouveau utilisateur{" "}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Prénom"
            variant="outlined"
            fullWidth
            {...register("firstName", {
              required: "Le nom de l'utilisateur est requis",
            })}
          />
          <FormHelperText error>
            {errors.firstName && errors.firstName.message}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Nom"
            variant="outlined"
            fullWidth
            {...register("lastName", {
              required: "Le nom de l'utilisateur est requis",
            })}
          />
          <FormHelperText error>
            {errors.lastName && errors.lastName.message}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email", {
              required: "un email est requis",
            })}
          />
          <FormHelperText error>
            {errors.email && errors.email.message}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            name="password"
            label="Mot de passe"
            variant="outlined"
            type="password"
            fullWidth
            {...register("password", {
              required: "un mot de passe est requis",
            })}
          />
          <FormHelperText error>
            {errors.password && errors.password.message}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="subscriptionsId-label">Client</InputLabel>
          <Controller
            name="subscriptionsId"
            control={control}
            defaultValue=""
            rules={{ required: "Le nom du client est requis", color: "red" }}
            // Setting a default value to handle the initial state
            render={({ field }) => (
              <Select {...field} labelId="subscriptionsId-label" label="Client">
                {subscription.map((companyName, index) => (
                  <MenuItem key={index} value={companyName.id}>
                    {companyName.clientName}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText error>
            {errors.subscriptionsId && errors.subscriptionsId.message}
          </FormHelperText>
        </FormControl>

        <Box sx={{ my: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => setFormOpen(false)}
          >
            Annuler
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="success"
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
