import {
  Toolbar,
  IconButton,
  Typography,
  styled,
  Stack,
  Box,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";

import SettingOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { AccountCircleTwoTone } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useState } from "react";

const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
export default function TopBar({ open, handleDrawerOpen }) {

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          component="img"
          sx={{
            height: 18,
            color: "white",
          }}
          src="https://tecmoled.com/wp-content/uploads/2023/03/TECMOLED-Logo-Black.svg"
          alt="logo tecmoled"
        />

        
        <Box flexGrow={1}></Box>
        <Stack direction={"row"}>
          
          <IconButton color="inherit">
            
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
