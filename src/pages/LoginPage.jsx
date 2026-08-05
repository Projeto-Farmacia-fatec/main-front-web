import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Divider,
  Card,
  CardContent,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Medication as MedicationIcon,
  PersonOutlineOutlined as PersonOutlineIcon,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

const QUICK_ACCESS = [
  {
    role: "PACIENTE",
    label: "Paciente",
    cpf: "123.456.789-00",
    password: "123456",
  },
  {
    role: "SECRETARIA",
    label: "Secretaria de Saúde",
    cpf: "234.567.890-11",
    password: "123456",
  },
  {
    role: "FARMACIA",
    label: "Farmácia",
    cpf: "345.678.901-22",
    password: "123456",
  },
  {
    role: "UBS",
    label: "UBS",
    cpf: "456.789.012-33",
    password: "123456",
  },
];

const LoginPage = () => {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!cpf || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    if (!selectedRole) {
      setError("Por favor, selecione um perfil de acesso");
      return;
    }

    try {
      const user = await login(cpf, password, selectedRole);

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

  const handleQuickAccess = (access) => {
    setCpf(access.cpf);
    setPassword(access.password);
    setSelectedRole(access.role);
    setError("");
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
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Lado Esquerdo - Banner Azul (Visível apenas em telas md+ */}
      <Box
        sx={{
          width: "50%",
          height: "100%",
          backgroundColor: "#1A56DB",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.1) 0%, transparent 70%)",
          },
        }}
      >
        {/* Círculo com ícone */}
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
            zIndex: 1,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          }}
        >
          <MedicationIcon sx={{ fontSize: 64, color: "#1A56DB" }} />
        </Box>

        {/* Textos */}
        <Box sx={{ textAlign: "center", zIndex: 1, px: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "white",
              mb: 1,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Sistema de Farmácia Judicial
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              fontWeight: 400,
              mb: 2,
            }}
          >
            Franco da Rocha
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: 300,
            }}
          >
            Gerenciamento e agendamento de medicamentos
          </Typography>
        </Box>
      </Box>

      {/* Lado Direito - Formulário */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          height: "100%",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 440,
            px: { xs: 3, sm: 4, md: 8 },
            py: { xs: 3, sm: 4, md: 0 },
            my: { xs: "auto", md: 0 },
          }}
        >
          {/* Cabeçalho Compacto Mobile (Visível apenas em telas xs e sm) */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
              mt: 2,
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "#1A56DB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                boxShadow: "0 4px 12px rgba(26, 86, 219, 0.3)",
              }}
            >
              <MedicationIcon sx={{ fontSize: 36, color: "white" }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#1A56DB",
                textAlign: "center",
                mb: 0.5,
              }}
            >
              Sistema de Farmácia Judicial
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#6B7280",
                fontWeight: 500,
              }}
            >
              Franco da Rocha
            </Typography>
          </Box>

          {/* Cabeçalho Desktop (Visível apenas em telas md+) */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              mb: 4,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#111827",
                mb: 1,
              }}
            >
              Bem-vindo
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#6B7280",
              }}
            >
              Entre com suas credenciais
            </Typography>
          </Box>

          {/* Cabeçalho do Formulário Mobile */}
          <Typography
            variant="body2"
            sx={{
              display: { xs: "block", md: "none" },
              color: "#6B7280",
              textAlign: "center",
              mb: 3,
            }}
          >
            Entre com suas credenciais
          </Typography>

          {/* Formulário */}
          <Box component="form" onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              required
              id="cpf"
              label="CPF"
              name="cpf"
              autoComplete="cpf"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              placeholder="000.000.000-00"
              sx={{ mb: 2.5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#9CA3AF" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              required
              name="password"
              label="Senha"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#9CA3AF" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
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
              disabled={loading}
              sx={{
                py: 1.5,
                backgroundColor: "#1A56DB",
                "&:hover": {
                  backgroundColor: "#1E40AF",
                },
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                mb: 3,
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Entrar"
              )}
            </Button>

            <Typography
              variant="body2"
              sx={{
                color: "#9CA3AF",
                textAlign: "center",
                mb: { xs: 3, md: 4 },
                fontSize: "0.875rem",
              }}
            >
              Pacientes são cadastrados pela Secretaria de Saúde
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#6B7280",
                fontWeight: 600,
                px: 2,
              }}
            >
              Opções de Login:
            </Typography>
          </Divider>

          {/* Cards de Acesso Rápido */}
          <Box sx={{ mb: 2 }}>
            {QUICK_ACCESS.map((access) => (
              <Card
                key={access.role}
                onClick={() => handleQuickAccess(access)}
                sx={{
                  mb: 1.5,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border:
                    selectedRole === access.role
                      ? "2px solid #1A56DB"
                      : "1px solid #E5E7EB",
                  backgroundColor:
                    selectedRole === access.role ? "#F0F5FF" : "white",
                  "&:hover": {
                    backgroundColor:
                      selectedRole === access.role ? "#F0F5FF" : "#F9FAFB",
                    borderColor: "#1A56DB",
                    boxShadow: "0 2px 8px rgba(26, 86, 219, 0.1)",
                  },
                }}
                elevation={0}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1.5,
                    px: { xs: 1.5, sm: 2 },
                    "&:last-child": { pb: 1.5 },
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: "#111827",
                        mb: 0.5,
                        fontSize: { xs: "0.875rem", sm: "0.9rem" },
                      }}
                    >
                      {access.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      }}
                    >
                      CPF: {access.cpf}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      width: { xs: 36, sm: 40 },
                      height: { xs: 36, sm: 40 },
                      backgroundColor:
                        selectedRole === access.role ? "#1A56DB" : "#F3F4F6",
                      color: selectedRole === access.role ? "white" : "#9CA3AF",
                    }}
                  >
                    <PersonOutlineIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                  </Avatar>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Typography
            variant="caption"
            sx={{
              color: "#9CA3AF",
              textAlign: "center",
              display: "block",
              fontSize: "0.75rem",
              pb: { xs: 2, md: 0 },
            }}
          >
            Clique em uma opção para preencher automaticamente
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
