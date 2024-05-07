import { Toolbar, IconButton,  styled , Box, Typography} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Search from "../mui_components/Search";
import SearchIconWrapper from "../mui_components/SearchIconWrapper";
import StyledInputBase from "../mui_components/StyledInputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch

import { setSearchTerm } from "../app/slices/searchTermSlice"; // Import the action


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
export default function TopBar({ open, handleDrawerOpen  }) {
 const searchTerm = useSelector((state) => state.searchTerm);
 const dispatch = useDispatch(); // Step 1: Import and initialize useDispatch

 const handleSearchInputChange = (e) => {
   const newSearchTerm = e.target.value;
   dispatch(setSearchTerm(newSearchTerm)); // Step 2: Dispatch the action to update the search term state
 };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#12335b" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            size="large"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {" "}
            <img
             
            />{" "}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Recherche..."
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
