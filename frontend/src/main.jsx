import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { RecipeProvider } from "./context/RecipeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RecipeProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <App />
        </RecipeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
