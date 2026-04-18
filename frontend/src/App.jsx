import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { Dashboard } from "./Pages/Dashboard";
import SendMoney from "./Pages/SendMoney";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./Context/AuthContext";

// 👇 separate inner component (important)
function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => {
      navigate("/login");
    };

    window.addEventListener("unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
    };
  }, [navigate]);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/send"
          element={
            <ProtectedRoute>
              <SendMoney />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
