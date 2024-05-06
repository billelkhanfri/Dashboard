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
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";




export default function UpdateSubscriberForm({
  subscriber,
  handleUpdateSuccess,
  setUpdateFormOpen,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm({ defaultValues: subscriber });

  const onSubmit = async (formData) => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir modifier cet abonné ?"
    );

    if (confirmation) {
      try {
     
        const response = await axios.put(
          `http://localhost:3000/tecmoled/subscriber/${subscriber.id}`,
formData        );

        console.log("Data updated:", formData);
        console.log("Update successful:", response.data.success);
        handleUpdateSuccess(response.data.success, "success");
      } catch (error) {
        console.error("Update failed:", error.response.data);
        handleUpdateSuccess(error.response.data.error, "error");
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="fr">
      <Typography variant="h6" gutterBottom textAlign="center">
        Modifier l'abonné :{" "}
        <Typography component="span" variant="body1" color="primary">
          {subscriber?.clientName}
        </Typography>
      </Typography>
      <Box maxWidth={"50%"} margin={"auto"}>
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
              defaultValue={subscriber?.subscrState.toString() || "true"} // Ensure it's a string
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Actif"
                  />
                  <FormControlLabel
                    value="false"
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
            <TextField
              id="paymentDate"
              type="date"
              label="Date de paiement"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("paymentDate", {
                required: "La date de paiement est requise",
              })}
              variant="outlined"
              fullWidth
            />
            <FormHelperText error>
              {errors.paymentDate && errors.paymentDate.message}
            </FormHelperText>
          </FormControl>

          <Box display="flex" gap={2}>
            <FormControl fullWidth margin="normal">
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
              <FormHelperText error>
                {errors.startDate && errors.startDate.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                id="endDate"
                type="date"
                label="Date de fin"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("endDate", {
                  required: "La date de fin paiement est requise",
                })}
                variant="outlined"
                fullWidth
              />
              <FormHelperText error>
                {errors.endDate && errors.endDate.message}
              </FormHelperText>
            </FormControl>
          </Box>

          <FormControl fullWidth margin="normal">
            <TextField
              id="maxUser"
              type="number"
              variant="outlined"
              label="Nombre maximum d'utilisateurs"
              fullWidth
              inputProps={{ min: 0 }}
              {...register("maxUser", {
                required: "Le nombre maximum d'utilisateurs est requis",
              })}
            />
            <FormHelperText error>
              {errors.maxUser && errors.maxUser.message}
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              id="nbrUserOnline"
              type="number"
              variant="outlined"
              label="Nombre d'utilisateurs en ligne"
              fullWidth
              inputProps={{ min: 0 }}
              {...register("nbrUserOnline", {
                required: "Le nombre d'utilisateurs en ligne est requis",
              })}
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
            <Button variant="outlined" onClick={() => setUpdateFormOpen(false)}>
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                Object.keys(dirtyFields).length === 0 
              }
            >
              Mettre à jour
            </Button>
          </Stack>
        </form>
        <Divider sx={{ my: 2 }} />
      </Box>
    </LocalizationProvider>
  );
}
