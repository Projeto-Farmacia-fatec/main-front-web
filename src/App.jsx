import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import theme from "./theme/theme";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPaciente from "./pages/DashboardPaciente";
import DashboardSecretaria from "./pages/DashboardSecretaria";
import DashboardFarmacia from "./pages/DashboardFarmacia";
import DashboardUBS from "./pages/DashboardUBS";
import { Login } from "@mui/icons-material";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const routes = {
      PACIENTE: "/paciente/dashboard",
      SECRETARIA: "/secretaria/dashboard",
      FARMACIA: "/farmacia/dashboard",
      UBS: "/ubs/dashboard",
    };
    return <Navigate to={routes[user.role]} replace />;
  }
  return children;
};

const RoleBasedRedirect = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const routes = {
    PACIENTE: "/paciente/dashboard",
    SECRETARIA: "/secretaria/dashboard",
    FARMACIA: "/farmacia/dashboard",
    UBS: "/ubs/dashboard",
  };
  return <Navigate to={routes[user.role] || "/login"} replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="/paciente/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["PACIENTE"]}>
                    <DashboardPaciente />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/secretaria/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["SECRETARIA"]}>
                    <DashboardSecretaria />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/farmacia/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["FARMACIA"]}>
                    <DashboardFarmacia />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ubs/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["UBS"]}>
                    <DashboardUBS />
                  </ProtectedRoute>
                }
              />
              <Route path="/paciente/*" element={<DashboardPaciente />} />
              <Route path="/secretaria/*" element={<DashboardSecretaria />} />
              <Route path="/farmacia/*" element={<DashboardFarmacia />} />
              <Route path="/ubs/*" element={<DashboardUBS />} />
            </Route>

            <Route path="/" element={<RoleBasedRedirect />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
