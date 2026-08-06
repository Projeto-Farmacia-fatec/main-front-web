import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Badge,
} from "@mui/material";
import {
  MedicationOutlined as MedicationIcon,
  CalendarTodayOutlined as CalendarIcon,
  NotificationsNoneOutlined as NotificationsIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const MEDICAMENTOS_MOCK = [
  {
    id: 1,
    nome: "Losartana 50mg",
    quantidade: "30 comp.",
    proximaRetirada: "04/05/2026",
    status: "Ativo",
    dosagem: "50mg",
    frequencia: "1x ao dia",
  },
  {
    id: 2,
    nome: "Metformina 850mg",
    quantidade: "60 comp.",
    proximaRetirada: "15/05/2026",
    status: "Ativo",
    dosagem: "850mg",
    frequencia: "2x ao dia",
  },
  {
    id: 3,
    nome: "Sinvastatina 20mg",
    quantidade: "30 comp.",
    proximaRetirada: "28/04/2026",
    status: "Em falta",
    dosagem: "20mg",
    frequencia: "1x ao dia",
  },
];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const PacienteDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          borderColor: "#FFFFFF",
          mb: 3,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: 2,
            borderBottom: "1px solid #E5E7EB",
            "& .MuiTab-root": {
              textTransform: "none",
              minHeight: 56,
              fontSize: "14px",
              fontWeight: 500,
              color: "#6B7280",
              "&.Mui-selected": { color: "#1A56DB", fontWeight: 600 },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#1A56DB",
              height: 3,
            },
          }}
        >
          <Tab
            icon={<MedicationIcon sx={{ fontSize: 20 }} />}
            label="Medicamentos"
            iconPosition="start"
            id="tab-0"
            aria-controls="tabpanel-0"
          />
          <Tab
            icon={<CalendarIcon sx={{ fontSize: 20 }} />}
            label="Agendamento"
            iconPosition="start"
            id="tab-1"
            aria-controls="tabpanel-1"
          />
          <Tab
            icon={
              <Badge
                badgeContent={3}
                color="error"
                sx={{ "& .MuiBadge-badge": { fontSize: 10 } }}
              >
                <NotificationsIcon sx={{ fontSize: 20 }} />
              </Badge>
            }
            label="Notificações"
            iconPosition="start"
            id="tab-2"
            aria-controls="tabpanel-2"
          />
          <Tab
            icon={<PersonOutlineOutlinedIcon sx={{ fontSize: 20 }} />}
            label="Minhas Informações"
            iconPosition="start"
            id="tab-3"
            aria-controls="tabpanel-3"
          />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Meus Medicamentos
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Acompanhe seus medicmanetos em uso e suas proximas datas de
                retirada
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {MEDICAMENTOS_MOCK.map((medicamento) => (
                <Grid item xs={12} key={medicamento.id}>
                  <Card
                    elevation={0}
                    sx={{
                      border: "1px solid #E5E7EB",
                      borderRadius: 3,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: "#1A56DB",
                        boxShadow: "0 2px 12px rgba(26, 86, 219, 0.08",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={4}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "cemter",
                              gap: 2,
                            }}
                          >
                            <Box
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                backgroundColor: "#EFF6FF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <MedicationIcon
                                sx={{ color: "#1A56DB", fontSize: 24 }}
                              />
                            </Box>
                            <Box>
                              <Typography
                                sx={{
                                  fontWeight: 600,
                                  fontSize: "16px",
                                  color: "#111827",
                                  mb: 0.5,
                                }}
                              >
                                {medicamento.nome}
                              </Typography>
                              <Typography
                                sx={{ fontSize: "13px", color: "#6B7280" }}
                              >
                                {medicamento.dosagem} • {medicamento.frequencia}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={4} md={3}>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "#9CA3AF",
                              fontWeight: 500,
                              mb: 0.5,
                            }}
                          >
                            Quantidade Disponivel
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "16px",
                              color: "#111827",
                            }}
                          >
                            {medicamento.quantidade}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} md={3}>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "#9CA3AF",
                              fontWeight: 500,
                              mb: 0.5,
                            }}
                          >
                            Proxima Retirada
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <CalendarIcon
                              sx={{ fontSize: 16, color: "#6B7280" }}
                            />
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "16px",
                                color: "#111827",
                              }}
                            >
                              {medicamento.proximaRetirada}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4} md={2}>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "#9CA3AF",
                              fontWidth: 500,
                              mb: 0.5,
                            }}
                          >
                            Status do tratamento
                          </Typography>
                          <Chip
                            label={medicamento.status}
                            size="small"
                            icon={
                              <Box
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  backgroundColor:
                                    medicamento.status === "Ativo"
                                      ? "#10B981"
                                      : "#EF4444",
                                  ml: 1,
                                }}
                              />
                            }
                            sx={{
                              backgroundColor:
                                medicamento.status === "Ativo"
                                  ? "#ECFDF5"
                                  : "#FEF2F2",
                              color:
                                medicamento.status === "Ativo"
                                  ? "#059669"
                                  : "#DC2626",
                              fontWeight: 600,
                              fontSize: "13px",
                              borderRadius: 2,
                              "& .MuiChip-icon": {
                                marginRight: -1,
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#111827", mb: 1 }}
            >
              Agendamento
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              Em breve você poderá agendar suas retiradas de medicamentos por
              aqui.
            </Typography>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#111827", mb: 1 }}
            >
              Notificações
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              Você tem 3 notificações não lidas.
            </Typography>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#111827", mb: 1 }}
            >
              Minhas Informações
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              Gerencia suas informações pessoais e dados de contato.
            </Typography>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default PacienteDashboard;
