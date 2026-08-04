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
  Menu,
  MenuItem,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Receipt as ReceiptIcon,
  Medication as MedicationIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  AccountCircle,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

const drawerWidth = 280;

const menuItems = {
  PACIENTE: [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/paciente/dashboard" },
    { text: "Meus Pedidos", icon: <ReceiptIcon />, path: "/paciente/pedidos" },
    {
      text: "Medicamentos",
      icon: <MedicationIcon />,
      path: "/paciente/medicamentos",
    },
  ],
  SECRETARIA: [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/secretaria/dashboard",
    },
    { text: "Processos", icon: <ReceiptIcon />, path: "/secretaria/processos" },
    {
      text: "Medicamentos",
      icon: <MedicationIcon />,
      path: "/secretaria/medicamentos",
    },
    {
      text: "Relatórios",
      icon: <AssessmentIcon />,
      path: "/secretaria/relatorios",
    },
  ],
  FARMACIA: [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/farmacia/dashboard" },
    { text: "Estoque", icon: <InventoryIcon />, path: "/farmacia/estoque" },
    { text: "Pedidos", icon: <ReceiptIcon />, path: "/farmacia/pedidos" },
    {
      text: "Medicamentos",
      icon: <MedicationIcon />,
      path: "/farmacia/medicamentos",
    },
  ],
  UBS: [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/ubs/dashboard" },
    { text: "Pacientes", icon: <PeopleIcon />, path: "/ubs/pacientes" },
    { text: "Pedidos", icon: <ReceiptIcon />, path: "/ubs/pedidos" },
  ],
};

const AppLayout = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/login");
  };

  const getRoleLabel = (role) => {
    const labels = {
      PACIENTE: "Paciente",
      SECRETARIA: "Secretaria",
      FARMACIA: "Farmácia",
      UBS: "UBS",
    };
    return labels[role] || role;
  };

  const getRoleColor = (role) => {
    const colors = {
      PACIENTE: "primary",
      SECRETARIA: "success",
      FARMACIA: "warning",
      UBS: "secondary",
    };
    return colors[role] || "default";
  };

  const userMenuItems = user ? menuItems[user.role] || [] : [];

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Sistema de Farmácia Judicial
          </Typography>

          {user && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Chip
                label={getRoleLabel(user.role)}
                color={getRoleColor(user.role)}
                size="small"
                sx={{ mr: 2 }}
              />
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}
                >
                  {user.name.charAt(0)}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>
                  <Typography variant="body2">{user.name}</Typography>
                </MenuItem>
                <MenuItem disabled>
                  <Typography variant="caption" color="text.secondary">
                    {user.cpf}
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Sair</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
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
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", mt: 2 }}>
          <List>
            {userMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) setOpen(false);
                  }}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    mb: 0.5,
                    "&.Mui-selected": {
                      backgroundColor: "primary.light",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "primary.main",
                      },
                      "& .MuiListItemIcon-root": {
                        color: "white",
                      },
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ mx: 1, borderRadius: 2 }}
                onClick={() => {}} // Configurações futura
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Configurações" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Conteúdo Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
