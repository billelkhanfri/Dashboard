import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import UserPage from "./pages/UserPage";
import SubscriberPage from "./pages/SubscriberPage";
import DeletePage from "./pages/DeletePage";
import Home from "./pages/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";


const Root = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

const theme = createTheme({
  typography: {
    fontFamily: "IBM Plex Sans, sans-serif" // Replace 'Your Font Family' with your chosen font
  },
});
 

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <App
            searchTerm={searchTerm}
            handleSearchInputChange={handleSearchInputChange}
          />
        }
      >
        <Route index element={<Home />} />
        <Route
          path="/utilisateurs"
          element={
            <UserPage
              searchTerm={searchTerm}
              handleSearchInputChange={handleSearchInputChange}
            />
          }
        />
        <Route
          path="/abonnes"
          element={
            <SubscriberPage
              searchTerm={searchTerm}
              handleSearchInputChange={handleSearchInputChange}
            />
          }
        />
        <Route path="/delete" element={<DeletePage />} />
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
      ,
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
