import "./App.css";
import { useState, useEffect } from "react";

import Login from "../src/feautures/auth/Login.jsx";
import Dashboard from "./feautures/dashboard/Dashboard.jsx";
import Register from "./feautures/auth/Register.jsx";
import AdminDashboard from "./feautures/admin/AdminDashboard.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
  };

  if (!isLoggedIn) {
    return showRegister ? (
      <Register onRegisterSuccess={() => setShowRegister(false)} />
    ) : (
      <Login
        onLoginSuccess={(userRole) => {
          setIsLoggedIn(true);
          setRole(userRole);
        }}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }

  if (role === "ADMIN") {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}

export default App;
