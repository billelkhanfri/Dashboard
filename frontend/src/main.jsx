import React from "react";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index  element={<Home />} />
      <Route path="/utilisateurs" element={<UserPage />} />
      <Route path="/abonnes" element={<SubscriberPage />} />
      <Route path="/delete" element={<DeletePage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
