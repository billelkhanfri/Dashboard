import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {
  Box,
  CssBaseline,
  styled,
  Typography,
  List,
  IconButton,
} from "@mui/material";
import StaticBars from "../components/StaticBars";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const handleEditSubscriber = (subscriber) => {
  console.log("Editing Subscriber:", subscriber);
};

const handleDeleteSubscriber = (subscriber) => {
  console.log("Deleting Subscriber:", subscriber);
};
const columns = [
  {
    field: "col1",
    headerName: "id",
    width: 80,
  },
  {
    field: "col2",
    headerName: "Client",
    flex: 1,
  },
  {
    field: "col3",
    headerName: "Etat",
    flex: 1,
  },
  {
    field: "col4",
    headerName: "Date de payment",
    width: 150,
  },
  {
    field: "col5",
    headerName: "Date de début",
    flex: 1,
  },
  { field: "col6", headerName: "Date de fin", flex: 1 },

  {
    field: "col7",
    headerName: "Max Utilisateurs",
    flex: 1,
  },
  {
    field: "col8",
    headerName: "Utilisateurs en ligne",
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    renderCell: (params) => (
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          onClick={() => handleEditSubscriber(params.row)}
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => handleDeleteSubscriber(params.row)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  },
];

export default function SubscriberPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/subscribers/");
      const data = await response.json();
      setSubscribers(data);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <StaticBars />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography variant="h4" gutterBottom>
            Abonnés
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </Search>

          <List>
            <div style={{ height: 800, width: "100%" }}>
              <DataGrid
                rows={subscribers
                  .filter((subscriber) => {
                    const searchTermLower = searchTerm.toLowerCase();
                    if (searchTermLower === "") return true; // Return true if search term is empty
                    const usernameLower = subscriber.clientName.toLowerCase();
                    for (let i = 0; i < searchTermLower.length; i++) {
                      if (usernameLower[i] !== searchTermLower[i]) return false;
                    }
                    return true; // If all characters match, return true
                  })
                  .map((subscriber) => ({
                    id: subscriber.id,
                    col1: subscriber.id,
                    col2: subscriber.clientName,
                    col3: subscriber.subscrState,
                    col4: subscriber.paymentDate,
                    col5: subscriber.startDate,
                    col6: subscriber.endDate,
                    col7: subscriber.maxUser,
                    col8: subscriber.nbrUserOnline,
                  }))}
                columns={columns}
              />
            </div>
          </List>
        </Box>
      </Box>
    </>
  );
}
