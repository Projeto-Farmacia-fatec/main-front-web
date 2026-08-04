import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  LocalHospital,
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
  MedicalServices,
  LocalPharmacy,
  People,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

const QUICK_ACCESS = [
  {
    role: "PACIENTE",
    label: "Paciente",
    icon: <People />,
    color: "#1565C0",
    cpf: "123.456.789-00",
    password: "123456",
  },
  {
    role: "SECRETARIA",
    label: "Secretaria",
    icon: <AdminPanelSettings />,
    color: "#2E7D32",
    cpf: "234.567.890-11",
    password: "123456",
  },
  {
    role: "FARMACIA",
    label: "Farmácia",
    icon: <LocalPharmacy />,
    color: "#E65100",
    cpf: "345.678.901-22",
    password: "123456",
  },
  {
    role: "UBS",
    label: "UBS",
    icon: <MedicalServices />,
    color: "#6A1B9A",
    cpf: "456.789.012-33",
    password: "123456",
  },
];

const LoginPage = () => {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("PACIENTE");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!cpf || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    try {
      const user = await login(cpf, password, selectedRole);

      // Redirecionar baseado no perfil
      const routes = {
        PACIENTE: "/paciente/dashboard",
        SECRETARIA: "/secretaria/dashboard",
        FARMACIA: "/farmacia/dashboard",
        UBS: "/ubs/dashboard",
      };

      navigate(routes[user.role], { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleQuickAccess = async (access) => {
    setCpf(access.cpf);
    setPassword(access.password);
    setSelectedRole(access.role);
    setError("");

    try {
      const user = await login(access.cpf, access.password, access.role);

      const routes = {
        PACIENTE: "/paciente/dashboard",
        SECRETARIA: "/secretaria/dashboard",
        FARMACIA: "/farmacia/dashboard",
        UBS: "/ubs/dashboard",
      };

      navigate(routes[user.role], { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const formatCpf = (value) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .substring(0, 14);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* Lado Esquerdo - Banner */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          background: "linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          p: 4,
        }}
      >
        <LocalHospital sx={{ fontSize: 80, mb: 2 }} />
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Farmácia Judicial
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, textAlign: "center" }}>
          Sistema Integrado de Gestão de Medicamentos
        </Typography>
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            Agilidade e transparência no acesso a medicamentos
          </Typography>
        </Box>
      </Grid>

      {/* Lado Direito - Formulário */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Acessar o Sistema
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%", maxWidth: 400 }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="cpf"
              label="CPF"
              name="cpf"
              autoComplete="cpf"
              autoFocus
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              placeholder="123.456.789-00"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Entrar"}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Acesso Rápido para Testes
              </Typography>
            </Divider>

            <Grid container spacing={2}>
              {QUICK_ACCESS.map((access) => (
                <Grid item xs={6} key={access.role}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.3s",
                      border:
                        selectedRole === access.role
                          ? `2px solid ${access.color}`
                          : "2px solid transparent",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: 3,
                      },
                    }}
                    onClick={() => handleQuickAccess(access)}
                  >
                    <CardContent sx={{ textAlign: "center", p: 2 }}>
                      <Box sx={{ color: access.color, mb: 1 }}>
                        {access.icon}
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {access.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
