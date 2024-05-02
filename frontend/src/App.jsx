import StaticBars from "./components/StaticBars";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/";
import { useState } from "react";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <StaticBars searchTerm={searchTerm} handleSearchInputChange={handleSearchInputChange} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Box>
    </Box>
  );
};

export default App;
