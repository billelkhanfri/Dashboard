import {  Typography } from "@mui/material/";

export default function Home() {

  return (
    <>
      
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
      
    </>
  );
}
