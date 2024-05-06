import { Box } from "@mui/material";

import { green, red } from "@mui/material/colors";

const columns = [
  {
    field: "col1",
    headerName: "id",
    headerAlign: "center",
    width: 80,
    renderCell: (params) => (
      <div
        style={{
          textAlign: "center",
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: "col2",
    headerName: "Client",
    flex: 1,
    width: 80,

    headerAlign: "center",
    renderCell: (params) => (
      <div
        style={{
          textAlign: "center",
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: "col3",
    headerName: "Etat",
    flex: 1,

    renderCell: (params) => {
      return (
        <Box
          sx={{
            backgroundColor: params.row.col3
              ? "rgb(31, 232, 255)"
              : "rgb(255, 102, 102)",
            textAlign: "center",
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
    headerAlign: "center",
    flex: 1,

    renderCell: (params) => (
      <div
        style={{
          textAlign: "center",
        }}
      >
        {params.value}
      </div>
    ),
  },

  {
    field: "col5",
    headerName: "Date de début",
    flex: 1,
    headerAlign: "center",

    renderCell: (params) => (
      <div
        style={{
          textAlign: "center",
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: "col6",
    headerName: "Date de fin",
    flex: 1,
    headerAlign: "center",

    renderCell: (params) => (
      <div
        style={{
          textAlign: "center",
         color: new Date(params.value) < new Date()? "red" : "", // Change color based on condition
        }}
      >
        {params.value}
      </div>
    ),
  },

  {
    field: "col7",
    headerName: "Max Utilisateurs",

    flex: 1,
    headerAlign: "center",
    renderCell: (params) => (
      <div
        style={{
          textAlign: "center",
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: "col8",
    headerName: "Utilisateur en ligne",

    flex: 1,
    headerAlign: "center",
    renderCell: (params) => (
      <div
        style={{
          textAlign: "center",
        }}
      >
        {params.value}
      </div>
    ),
  },
];

export { columns };
