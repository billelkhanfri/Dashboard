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
  Stack
} from "@mui/material";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

export default function UpdateUserForm({
  user,
  handleUpdateSuccess,
  subscription,
  setUpdateFormOpen,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields},
  } = useForm({
    defaultValues: user, // Use user object directly for default values
  });

  const onSubmit = async (formData) => {
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
    <Box maxWidth={"50%"} margin={"auto"}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h6" gutterBottom>
          Mettre à jour l'utilisateur :{" "}
          <span style={{ color: "green" }}>
            {user.firstName} {user.lastName}
          </span>{" "}
          de{" "}
          <span style={{ color: "blue" }}>
            {
              subscription.find((sub) => sub.id === user.subscriptionsId)
                ?.clientName
            }
          </span>
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
            defaultValue={user.subscriptionsId} // Set default value directly
            rules={{ required: "Le nom du client est requis", color: "red" }}
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
        <Stack
          gap={2}
          flexDirection={"row"}
          alignItems={"flex-end"}
          justifyContent={"flex-end"}
          my="20px"
        >
          {" "}
          <Button
            variant="outlined"
            onClick={() => setUpdateFormOpen(false)}
          >
            Annuler
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled ={Object.keys(dirtyFields).length === 0}>
            Mettre à jour
          </Button>
        </Stack>{" "}
      </form>
    </Box>
  );
}
