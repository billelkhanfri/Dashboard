import { Box } from "@mui/material";

import { green, red } from "@mui/material/colors";

const columns = [
  {
    field: "col1",
    headerName: "id",
    headerAlign: "center",
    width: "1",
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
            backgroundColor: params.row.col3 ? green[300] : red[300],
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
    width: 100,
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
    field: "col5",
    headerName: "Date de début",
    flex: 1,
    headerAlign: "center",
    width: 100,

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
  { field: "col6", headerName: "Date de fin", flex: 1 },

  {
    field: "col7",
    headerName: "Max Utilisateurs",
    width: 80,

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
    width: 80,

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
