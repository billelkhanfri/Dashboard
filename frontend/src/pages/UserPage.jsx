import StaticBars from "../components/StaticBars";
import Box from "@mui/material/Box";
import { Toolbar, IconButton, Typography, styled } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";

export default function UserPage() {
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
          <h1> hello from Users page</h1>
        </Box>
      </Box>
      ;
    </>
  );
}
