import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from "./pages/UserPage";
import SubscriberPage from "./pages/SubscriberPage";
import DeletePage from "./pages/DeletePage";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/utilisateurs" element={<UserPage />} />
        <Route path="/abonnés" element={<SubscriberPage />} />
        <Route path="/delete" element={<DeletePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
