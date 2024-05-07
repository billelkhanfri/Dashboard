import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import UserPage from "./pages/UserPage";
import SubscriberPage from "./pages/SubscriberPage";
import DeletePage from "./pages/DeletePage";
import Home from "./pages/Home";

import { styled } from "@mui/material/";
import { useTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const App = () => {

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        
      />
      <SideBar
        theme={theme}
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="/utilisateurs"
              element={
                <UserPage
                  
                />
              }
            />
            <Route
              path="/abonnes"
              element={
                <SubscriberPage
                  
                />
              }
            />
            <Route path="/delete" element={<DeletePage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </Box>
  );
};

export default App;
