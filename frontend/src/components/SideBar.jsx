import { Link } from "react-router-dom";
import { IconButton, styled } from "@mui/material/";
import MuiDrawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Delete } from "@mui/icons-material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import TeamIcon from "@mui/icons-material/People";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar({ handleDrawerClose, theme, open }) {
  const items = ["Accueil", "Utilisateurs", "Abonnes"];

  const location = useLocation();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />

      <Divider />
      <List>
        {items.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={
                text.toLowerCase() === "accueil"
                  ? "/"
                  : `/${text.toLowerCase()}`
              }
              style={{ textDecoration: "none" }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor:
                  `/${text.toLowerCase()}` === location.pathname ||
                  (text.toLowerCase() === "accueil" &&
                    location.pathname === "/")
                    ? "#2B70A0"
                    : null,
                color:
                  `/${text.toLowerCase()}` === location.pathname ||
                  (text.toLowerCase() === "accueil" &&
                    location.pathname === "/")
                    ? "#fff"
                    : null,
                "&:hover": {
                  bgcolor:
                    `/${text.toLowerCase()}` === location.pathname ||
                    (text.toLowerCase() === "accueil" &&
                      location.pathname === "/")
                      ? "#2B70A0"
                      : null,
                  color:
                    `/${text.toLowerCase()}` === location.pathname ||
                    (text.toLowerCase() === "accueil" &&
                      location.pathname === "/")
                      ? "white"
                      : null,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color:
                    `/${text.toLowerCase()}` === location.pathname ||
                    (text.toLowerCase() === "accueil" &&
                      location.pathname === "/")
                      ? "#fff"
                      : null,
                  "&:hover": {
                    color:
                      `/${text.toLowerCase()}` === location.pathname ||
                      (text.toLowerCase() === "accueil" &&
                        location.pathname === "/")
                        ? "#fff"
                        : null,
                  },
                }}
              >
                {text.toLowerCase() === "accueil" ? (
                  <HomeIcon />
                ) : index % 2 === 0 ? (
                  <TeamIcon />
                ) : (
                  <GroupAddIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      {/* <List>
        {["Supprimer"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <Link
              to="/delete"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <Delete /> : <Delete />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List> */}
    </Drawer>
  );
}
