

const columns = [
  {
    field: "col1",
    headerName: "id",
    width: 40,
  },
  {
    field: "col2",
    headerName: "Nom",
    flex: 1,
    width: 80,
  },
  {
    field: "col3",
    headerName: "Prénom",
    flex: 1,
    width: 80,
  },
  {
    field: "col4",
    headerName: "email",
    width: 150,
  },
  {
    field: "col5",
    headerName: "Mot de pass",
    flex: 1,
    renderCell: (params) => (
      <div>{params.value ? "********" : ""}</div> // Display asterisks instead of the actual password
    ),
  },
  {
    field: "col6",
    headerName: "Abonnement",
    flex: 1,
    width: 80,
  },
];
  




export { columns };
