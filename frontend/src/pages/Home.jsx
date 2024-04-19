import StaticBars from "../components/StaticBars";
import Box from "@mui/material/Box";
import {  Typography, styled } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";

export default function Home() {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <StaticBars></StaticBars>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: "2rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            Tableau de board{" "}
          </Typography>{" "}
          <Typography>
            {" "}
            On peut représenter les données par des graphiques pour faciliter la
            lecture{" "}
          </Typography>{" "}
        </Box>
      </Box>
      ;
    </>
  );
}
