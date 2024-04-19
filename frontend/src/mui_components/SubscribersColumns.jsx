import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { green, red } from "@mui/material/colors";

const columns = [
  {
    field: "col1",
    headerName: "id",
    width: 80,
    headerAlign: "center",
  },
  {
    field: "col2",
    headerName: "Client",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "col3",
    headerName: "Etat",
    flex: 1,

    renderCell: (params) => {
      return (
        <Box
          sx={{
            backgroundColor: params.row.col3 ? green[500] : red[500], // Utilize red color if inactive, otherwise green
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {params.row.col3 ? "Actif" : "Inactif"}
        </Box>
      );
    },
    headerAlign: "center",
  },

  {
    field: "col4",
    headerName: "Date de payment",
    width: 150,
    headerAlign: "center",
  },

  {
    field: "col5",
    headerName: "Date de début",
    flex: 1,
    headerAlign: "center",
  },
  { field: "col6", headerName: "Date de fin", flex: 1 },

  {
    field: "col7",
    headerName: "Max Utilisateurs",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "col8",
    headerName: "Utilisateurs en ligne",
    flex: 1,
    headerAlign: "center",
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
    headerAlign: "center",
  },
];

const handleEditSubscriber = (subscriber) => {
  console.log("Editing Subscriber:", subscriber);
};

const handleDeleteSubscriber = (subscriber) => {
  console.log("Deleting Subscriber:", subscriber);
};

export { columns };
