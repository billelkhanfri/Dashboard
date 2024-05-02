import { Toolbar, IconButton,  styled ,Stack} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";

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
    <AppBar
      position="fixed"
      open={open}
      sx={{ backgroundColor: "rgb(18, 51, 91)" }}
    >
      <Toolbar>
        <Stack >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
        <Stack >
          <img
            src="https://tecmoled.com/wp-content/uploads/2022/09/logo_300dpi.png"
            alt="TECMOLED Logo"
            style={{ width: "150px" }}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
