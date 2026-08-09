import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Medicamento from "../assets/medicamento.png";
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
        maxHeight: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Lado Esquerdo - Banner Azul com Imagem de Fundo */}
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
          overflow: "hidden",
        }}
      >
        {/* Imagem de fundo */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${Medicamento})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.15,
            zIndex: 0,
          }}
        />

        {/* Overlay com gradiente */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.08) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />

        {/* Conteúdo centralizado otimizado para HD (768px de altura) */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            px: 4,
          }}
        >
          {/* Círculo com ícone ajustado */}
          <Box
            sx={{
              width: { md: 80, lg: 100 },
              height: { md: 80, lg: 100 },
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2.5,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            }}
          >
            <MedicationIcon
              sx={{ fontSize: { md: 44, lg: 54 }, color: "#1A56DB" }}
            />
          </Box>

          {/* Textos com tamanhos responsivos */}
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "white",
                mb: 0.5,
                fontSize: { md: "1.6rem", lg: "2rem" },
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              Sistema de Farmácia Judicial
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: 400,
                mb: 1.5,
                fontSize: { md: "1rem", lg: "1.25rem" },
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Franco da Rocha
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                fontWeight: 300,
                fontSize: { md: "0.875rem", lg: "1rem" },
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Gerenciamento e agendamento de medicamentos
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Lado Direito - Formulário Ajustado em Altura */}
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
            maxWidth: 420,
            px: { xs: 2.5, sm: 4, md: 5 },
            py: { xs: 2, md: 2 },
            my: "auto", // Garante a centralização vertical perfeita
          }}
        >
          {/* Cabeçalho Compacto Mobile */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
              alignItems: "center",
              mb: 2.5,
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                backgroundColor: "#1A56DB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1.5,
                boxShadow: "0 4px 12px rgba(26, 86, 219, 0.3)",
                backgroundImage: `url(${Medicamento})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <MedicationIcon sx={{ fontSize: 30, color: "white" }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#1A56DB",
                textAlign: "center",
                mb: 0.2,
              }}
            >
              Sistema de Farmácia Judicial
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#6B7280",
                fontWeight: 500,
                fontSize: "0.8rem",
              }}
            >
              Franco da Rocha
            </Typography>
          </Box>

          {/* Cabeçalho Desktop Compacto */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              mb: 2,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#111827",
                mb: 0.3,
                fontSize: "1.5rem",
              }}
            >
              Bem-vindo
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#6B7280",
                fontSize: "0.875rem",
              }}
            >
              Entre com suas credenciais
            </Typography>
          </Box>

          {/* Formulário */}
          <Box component="form" onSubmit={handleSubmit}>
            {error && (
              <Alert
                severity="error"
                sx={{ mb: 1.5, py: 0.2, fontSize: "0.8rem" }}
              >
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              size="small"
              required
              id="cpf"
              label="CPF"
              name="cpf"
              autoComplete="cpf"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              placeholder="000.000.000-00"
              sx={{
                mb: 1.8,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "14px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              size="small"
              required
              name="password"
              label="Senha"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 1.8,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "14px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ fontSize: 18 }} />
                      ) : (
                        <Visibility sx={{ fontSize: 18 }} />
                      )}
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
                py: 1.1,
                backgroundColor: "#1A56DB",
                "&:hover": {
                  backgroundColor: "#1E40AF",
                },
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 600,
                borderRadius: "8px",
                mb: 1.2,
                boxShadow: "none",
              }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Entrar"
              )}
            </Button>

            <Typography
              variant="body2"
              sx={{
                color: "#9CA3AF",
                textAlign: "center",
                mb: 1.8,
                fontSize: "0.75rem",
              }}
            >
              Pacientes são cadastrados pela Secretaria de Saúde
            </Typography>
          </Box>

          <Divider sx={{ mb: 1.8 }}>
            <Typography
              variant="caption"
              sx={{
                color: "#6B7280",
                fontWeight: 600,
                px: 1.5,
                fontSize: "0.75rem",
              }}
            >
              Opções de Login:
            </Typography>
          </Divider>

          {/* Cards de Acesso Rápido Compactados */}
          <Box sx={{ mb: 1 }}>
            {QUICK_ACCESS.map((access) => (
              <Card
                key={access.role}
                onClick={() => handleQuickAccess(access)}
                sx={{
                  mb: 1,
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
                    py: 1,
                    px: 2,
                    "&:last-child": { pb: 1 },
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: "#111827",
                        fontSize: "0.8rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {access.label}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#6B7280",
                        fontSize: "0.725rem",
                      }}
                    >
                      CPF: {access.cpf}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor:
                        selectedRole === access.role ? "#1A56DB" : "#F3F4F6",
                      color: selectedRole === access.role ? "white" : "#9CA3AF",
                    }}
                  >
                    <PersonOutlineIcon sx={{ fontSize: 18 }} />
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
              fontSize: "0.7rem",
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
