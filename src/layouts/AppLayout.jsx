import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  HomeOutlined as HomeIcon,
  Logout as LogoutIcon,
  Medication as MedicationIcon,
} from "@mui/icons-material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useAuth } from "../contexts/AuthContext";

const drawerWidth = 280;

const AppLayout = () => {
  const [open, setOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getRoleLabel = (role) => {
    const labels = {
      PACIENTE: "Paciente",
      SECRETARIA: "Secretaria",
      FARMACIA: "Farmácia",
      UBS: "UBS,",
    };
    return labels[role] || role;
  };

  const getPageTitle = () => {
    if (location.pathname.includes("dashboard")) return "Dashboard";
    if (location.pathname.includes("pedidos")) return "Meus Pedidos";
    if (location.pathname.includes("medicamentos")) return "Medicamentos";
    return "Dashboard";
  };

  const getPageSubtitle = () => {
    const role = user?.role;
    const subtitles = {
      PACIENTE: "Área do Paciente",
      SECREATARIA: "Área da Secretaria",
      FARMACIA: "Área da Farmácia",
      UBS: "Área da UBS",
    };
    return subtitles[role] || "Área do Usuário";
  };

  const menuItems = {
    PACIENTE: [
      { text: "Dashboard", icon: <HomeIcon />, path: "/paciente/dashboard" },
      {
        text: "Meus Pedidos",
        icon: <MedicationIcon />,
        path: "/paciente/pedidos",
      },
      {
        text: "Medicamentos",
        icon: <MedicationIcon />,
        path: "/paciente/medicamentos",
      },
    ],
    SECRETARIA: [
      {
        text: "Dashboard",
        icon: <HomeIcon />,
        path: "/secretaria/dashboard",
      },
    ],
    FARMACIA: [
      { text: "Dashboard", icon: <HomeIcon />, path: "/farmacia/dashboard" },
    ],
    UBS: [{ text: "Dashboard", icon: <HomeIcon />, path: "/ubs/dashboard" }],
  };

  const userMenuItems = user ? menuItems[user.role] || [] : [];

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F8F9FA" }}
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #E5E7EB",
            backgroundColor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ p: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                backgroundColor: "#1A56DB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1.5,
                boxShadow: "0 2px 8px rgba(26, 86, 219, 0.2)",
              }}
            >
              <MedicationIcon sx={{ color: "white", fontSize: 28 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#111827",
                  lineHeight: 1.2,
                }}
              >
                Farmácia Judicial
              </Typography>
              <Typography
                sx={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.2 }}
              >
                Franco da Rocha
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#9CA3AF",
                letterSpacing: "0.5px",
                mb: 0.5,
              }}
            >
              PERFIL
            </Typography>
            <Typography
              sx={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}
            >
              {getRoleLabel(user?.role)}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mx: 2 }} />
        <List sx={{ flex: 1, px: 1.5, pt: 1 }}>
          {userMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  py: 1.2,
                  "&.Mui-selected": {
                    backgroundColor: "#F0F5FF",
                    color: "#1A56DB",
                    "&:hover": {
                      backgroundColor: "#E0EBFF",
                    },
                    "& .MuiListItemIcon-root": {
                      color: "#1A56DB",
                    },
                    "& .MuiListItemText-primary": {
                      fontWeight: 600,
                    },
                  },
                  "&.hover": {
                    backgroundColor: "#F9FAFB",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "14px",
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ p: 2, borderTop: "1px solid #E5E7EB" }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              py: 1.2,
              color: "#EF4444",
              "&:hover": { backgroundColor: "#FEF2F2" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogoutIcon sx={{ color: "#EF4444" }} />
            </ListItemIcon>
            <ListItemText
              primary="Sair"
              primaryTypographyProps={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#EF4444",
              }}
            />
          </ListItemButton>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E5E7EB" }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              px: { xs: 2, md: 4 },
              py: 1,
            }}
          >
            <Box>
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, color: "#111827" }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#111827",
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                }}
              >
                {getPageTitle()}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px", mt: 0.5 }}
              >
                {getPageSubtitle()}
              </Typography>
            </Box>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F3F4F6",
                borderRadius: 3,
                px: 2,
                py: 1,
                gap: 1.5,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#111827",
                    lineHeight: 1.2,
                  }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  sx={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.2 }}
                >
                  {user?.cpf}
                </Typography>
              </Box>
              <Avatar
                sx={{ width: 36, height: 36, backgroundColor: "#1A56DB" }}
              >
                <PersonOutlineOutlinedIcon sx={{ fontSize: 20 }} />
              </Avatar>
            </Paper>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, md: 4 },
            overflow: "auto",
            backgroundColor: "#F8F9FA",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
