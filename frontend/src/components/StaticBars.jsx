import * as React from "react";
import { useTheme } from "@mui/material/styles";
import TopBar from "./TopBar";
import SideBar from "./SideBar";


export default function StaticBars() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  

  return (
    <> 
      <TopBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar
        theme={theme}
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
      
    
    </>
  );
}
