import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Card,
  CardContent,
  Chip,
  Badge,
  Button,
  IconButton,
} from "@mui/material";
import {
  MedicationOutlined as MedicationIcon,
  CalendarTodayOutlined as CalendarIcon,
  NotificationsNoneOutlined as NotificationsIcon,
  AccessTime as AccessTimeIcon,
  InfoOutlined as InfoIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Close as CloseIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

// Dados mockados
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

const NOTIFICACOES_INICIAIS = [
  {
    id: 1,
    tipo: "sucesso",
    icone: <CheckCircleOutlineOutlinedIcon />,
    cor: "#10B981",
    bgColor: "#ECFDF5",
    titulo: "Retirada Registrada",
    descricao:
      "Sua retirada de Losartana 50mg foi registrada com sucesso. Agende sua próxima retirada.",
    data: "28/04/2026, 14:30",
    naoLida: true,
  },
  {
    id: 2,
    tipo: "info",
    icone: <CalendarIcon />,
    cor: "#3B82F6",
    bgColor: "#EFF6FF",
    titulo: "Agendamento Próximo",
    descricao:
      "Você tem um agendamento para retirada de Metformina 850mg amanhã às 09:00.",
    data: "28/04/2026, 10:00",
    naoLida: true,
  },
  {
    id: 3,
    tipo: "erro",
    icone: <ErrorOutlineOutlinedIcon />,
    cor: "#EF4444",
    bgColor: "#FEF2F2",
    titulo: "Falta Registrada",
    descricao:
      "Sua falta no agendamento de 22/04 foi registrada. Por favor, justifique e realize um novo agendamento.",
    data: "23/04/2026, 16:45",
    naoLida: false,
  },
  {
    id: 4,
    tipo: "neutro",
    icone: <InfoIcon />,
    cor: "#6B7280",
    bgColor: "#F9FAFB",
    titulo: "Medicamento Disponível",
    descricao:
      "O medicamento Sinvastatina 20mg está disponível para agendamento.",
    data: "20/04/2026, 09:00",
    naoLida: false,
  },
];

const HORARIOS_DISPONIVEIS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
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
  const location = useLocation();
  const [tabValue, setTabValue] = useState(0);

  // Se navegar com o estado initialTab, atualiza a aba ativa
  useEffect(() => {
    if (location.state?.initialTab !== undefined) {
      setTabValue(location.state.initialTab);
    }
  }, [location.state]);

  // Estados do Agendamento
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [agendamentoConfirmado, setAgendamentoConfirmado] = useState({
    status: true,
    data: "04/05/2026",
    horario: "09:00",
  });

  // Estados das Notificações
  const [notificacoes, setNotificacoes] = useState(NOTIFICACOES_INICIAIS);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSelectDate = (dia) => {
    setSelectedDate(dia);
    setSelectedTime(null);
  };

  const handleSelectTime = (horario) => {
    setSelectedTime(horario);
  };

  const handleConfirmarAgendamento = () => {
    if (selectedDate && selectedTime) {
      const dataFormatada = `${String(selectedDate).padStart(2, "0")}/08/2026`;
      setAgendamentoConfirmado({
        status: true,
        data: dataFormatada,
        horario: selectedTime,
      });
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };

  const handleCancelarAgendamento = () => {
    setAgendamentoConfirmado({ status: false, data: "", horario: "" });
  };

  const handleMarcarComoLida = (id) => {
    setNotificacoes(
      notificacoes.map((notif) =>
        notif.id === id ? { ...notif, naoLida: false } : notif,
      ),
    );
  };

  const handleRemoverNotificacao = (id) => {
    setNotificacoes(notificacoes.filter((notif) => notif.id !== id));
  };

  const notificacoesNaoLidas = notificacoes.filter((n) => n.naoLida).length;

  const isDataPassada = (dia) => dia < 5;

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          backgroundColor: "#FFFFFF",
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
              "&.Mui-selected": {
                color: "#1A56DB",
                fontWeight: 600,
              },
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
          />
          <Tab
            icon={<CalendarIcon sx={{ fontSize: 20 }} />}
            label="Agendamento"
            iconPosition="start"
          />
          <Tab
            icon={
              <Badge
                badgeContent={notificacoesNaoLidas}
                color="error"
                sx={{ "& .MuiBadge-badge": { fontSize: 10 } }}
              >
                <NotificationsIcon sx={{ fontSize: 20 }} />
              </Badge>
            }
            label="Notificações"
            iconPosition="start"
          />
          <Tab
            icon={<PersonOutlineOutlinedIcon sx={{ fontSize: 20 }} />}
            label="Minhas Informações"
            iconPosition="start"
          />
        </Tabs>

        {/* ==================== ABA MEDICAMENTOS ==================== */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  color: "#ff00ea",
                  mb: 1.5,
                  letterSpacing: "10px",
                }}
              >
                Beatriz
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Sua gostosa
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {MEDICAMENTOS_MOCK.map((medicamento) => (
                <Card
                  key={medicamento.id}
                  elevation={0}
                  sx={{
                    width: "100%",
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#1A56DB",
                      boxShadow: "0 2px 12px rgba(26, 86, 219, 0.08)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: { xs: "wrap", md: "nowrap" },
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          minWidth: { md: "250px" },
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

                      <Box sx={{ textAlign: "center", minWidth: "120px" }}>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#9CA3AF",
                            fontWeight: 500,
                            mb: 0.5,
                          }}
                        >
                          Quantidade Disponível
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
                      </Box>

                      <Box sx={{ textAlign: "center", minWidth: "130px" }}>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#9CA3AF",
                            fontWeight: 500,
                            mb: 0.5,
                          }}
                        >
                          Próxima Retirada
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
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
                      </Box>

                      <Box sx={{ textAlign: "center", minWidth: "130px" }}>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#9CA3AF",
                            fontWeight: 500,
                            mb: 0.5,
                          }}
                        >
                          Status do Tratamento
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
                          }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </TabPanel>

        {/* ==================== ABA AGENDAMENTO ==================== */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Agendamento de Retirada
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Selecione uma data e horário disponíveis para retirar seus
                medicamentos
              </Typography>
            </Box>

            {agendamentoConfirmado.status && (
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  mb: 3,
                  backgroundColor: "#ECFDF5",
                  border: "1px solid #A7F3D0",
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <CheckCircleOutlineOutlinedIcon
                    sx={{ color: "#059669", fontSize: 24 }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#059669",
                        fontSize: "15px",
                      }}
                    >
                      Agendamento Confirmado
                    </Typography>
                    <Typography sx={{ color: "#059669", fontSize: "14px" }}>
                      Data: {agendamentoConfirmado.data} às{" "}
                      {agendamentoConfirmado.horario}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      setAgendamentoConfirmado({
                        status: false,
                        data: "",
                        horario: "",
                      })
                    }
                    sx={{
                      borderColor: "#059669",
                      color: "#059669",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        borderColor: "#047857",
                        backgroundColor: "#D1FAE5",
                      },
                    }}
                  >
                    Reagendar
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleCancelarAgendamento}
                    sx={{
                      borderColor: "#EF4444",
                      color: "#EF4444",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        borderColor: "#DC2626",
                        backgroundColor: "#FEF2F2",
                      },
                    }}
                  >
                    Cancelar
                  </Button>
                </Box>
              </Paper>
            )}

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  border: "1px solid #E5E7EB",
                  borderRadius: 3,
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 3,
                  }}
                >
                  <CalendarIcon sx={{ color: "#1A56DB", fontSize: 20 }} />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "15px",
                      color: "#111827",
                    }}
                  >
                    Selecione a Data
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  align="center"
                  fontWeight="bold"
                  sx={{ mb: 3, color: "#111827" }}
                >
                  Agosto 2026
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: 1,
                    textAlign: "center",
                  }}
                >
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                    (dia) => (
                      <Typography
                        key={dia}
                        variant="caption"
                        fontWeight="bold"
                        color="text.secondary"
                        sx={{ fontSize: "12px", pb: 1 }}
                      >
                        {dia}
                      </Typography>
                    ),
                  )}

                  {Array.from({ length: 6 }, (_, i) => (
                    <Box key={`empty-${i}`} />
                  ))}

                  {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => (
                    <Box
                      key={dia}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          !isDataPassada(dia) && handleSelectDate(dia)
                        }
                        disabled={isDataPassada(dia)}
                        sx={{
                          width: 36,
                          height: 36,
                          fontSize: "0.875rem",
                          backgroundColor:
                            selectedDate === dia ? "#1A56DB" : "transparent",
                          color:
                            selectedDate === dia
                              ? "white"
                              : isDataPassada(dia)
                                ? "#D1D5DB"
                                : "#111827",
                          "&:hover": {
                            backgroundColor:
                              selectedDate === dia ? "#1E40AF" : "#F3F4F6",
                          },
                          "&.Mui-disabled": {
                            color: "#D1D5DB",
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        {dia}
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  border: "1px solid #E5E7EB",
                  borderRadius: 3,
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 380,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 3,
                  }}
                >
                  <AccessTimeIcon sx={{ color: "#1A56DB", fontSize: 20 }} />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "15px",
                      color: "#111827",
                    }}
                  >
                    Selecione o Horário
                  </Typography>
                </Box>

                {!selectedDate ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Typography sx={{ color: "#9CA3AF", fontSize: "14px" }}>
                      Selecione uma data primeiro
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 1.5,
                    }}
                  >
                    {HORARIOS_DISPONIVEIS.map((horario) => (
                      <Button
                        key={horario}
                        fullWidth
                        variant={
                          selectedTime === horario ? "contained" : "outlined"
                        }
                        onClick={() => handleSelectTime(horario)}
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: "14px",
                          borderColor:
                            selectedTime === horario ? "#1A56DB" : "#E5E7EB",
                          backgroundColor:
                            selectedTime === horario ? "#1A56DB" : "white",
                          color: selectedTime === horario ? "white" : "#111827",
                          "&:hover": {
                            borderColor: "#1A56DB",
                            backgroundColor:
                              selectedTime === horario ? "#1E40AF" : "#F0F5FF",
                          },
                        }}
                      >
                        {horario}
                      </Button>
                    ))}
                  </Box>
                )}
              </Paper>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                variant="contained"
                disabled={!selectedDate || !selectedTime}
                onClick={handleConfirmarAgendamento}
                sx={{
                  px: 4,
                  py: 1.5,
                  backgroundColor: "#1A56DB",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "15px",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#1E40AF",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#E5E7EB",
                    color: "#9CA3AF",
                  },
                }}
              >
                Confirmar Agendamento
              </Button>
            </Box>
          </Box>
        </TabPanel>

        {/* ==================== ABA NOTIFICAÇÕES ==================== */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 3,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
                >
                  Notificações
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#6B7280", fontSize: "14px" }}
                >
                  Acompanhe suas notificações e lembretes
                </Typography>
              </Box>
              {notificacoesNaoLidas > 0 && (
                <Chip
                  label={`${notificacoesNaoLidas} não lidas`}
                  size="small"
                  sx={{
                    backgroundColor: "#EFF6FF",
                    color: "#1A56DB",
                    fontWeight: 600,
                    fontSize: "13px",
                    borderRadius: 2,
                  }}
                />
              )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {notificacoes.map((notif) => (
                <Paper
                  key={notif.id}
                  elevation={0}
                  sx={{
                    width: "100%",
                    p: 2.5,
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    backgroundColor: notif.naoLida ? "#FAFBFC" : "#FFFFFF",
                    position: "relative",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#D1D5DB",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        backgroundColor: notif.bgColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        position: "relative",
                      }}
                    >
                      <Box sx={{ color: notif.cor }}>{notif.icone}</Box>
                      {notif.naoLida && (
                        <CircleIcon
                          sx={{
                            position: "absolute",
                            top: -4,
                            right: -4,
                            fontSize: 12,
                            color: "#3B82F6",
                          }}
                        />
                      )}
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "15px",
                              color: "#111827",
                              mb: 0.5,
                            }}
                          >
                            {notif.titulo}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#6B7280",
                              lineHeight: 1.5,
                              mb: 1,
                            }}
                          >
                            {notif.descricao}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoverNotificacao(notif.id)}
                          sx={{
                            color: "#9CA3AF",
                            "&:hover": { color: "#6B7280" },
                          }}
                        >
                          <CloseIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>
                          {notif.data}
                        </Typography>
                        {notif.naoLida && (
                          <Button
                            size="small"
                            onClick={() => handleMarcarComoLida(notif.id)}
                            sx={{
                              textTransform: "none",
                              fontSize: "13px",
                              color: "#1A56DB",
                              fontWeight: 500,
                              "&:hover": {
                                backgroundColor: "#EFF6FF",
                              },
                            }}
                          >
                            Marcar como lida
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>

            {notificacoes.length === 0 && (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <NotificationsIcon
                  sx={{ fontSize: 48, color: "#D1D5DB", mb: 2 }}
                />
                <Typography sx={{ color: "#9CA3AF", fontSize: "16px" }}>
                  Nenhuma notificação no momento
                </Typography>
              </Box>
            )}
          </Box>
        </TabPanel>

        {/* ==================== ABA MINHAS INFORMAÇÕES ==================== */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Minhas Informações
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Confira seus dados pessoais e de contato
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  borderRadius: 3,
                  borderColor: "#E5E7EB",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
                >
                  <PersonOutlineOutlinedIcon
                    sx={{ color: "#1A56DB", fontSize: 22 }}
                  />
                  <Typography
                    sx={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}
                  >
                    Dados Pessoais
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography
                      sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.3 }}
                    >
                      Nome Completo
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "#111827",
                      }}
                    >
                      João Silva
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.3 }}
                    >
                      CPF
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "#111827",
                      }}
                    >
                      123.456.789-00
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.3 }}
                    >
                      Data de Nascimento
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.8 }}
                    >
                      <CalendarIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "#111827",
                        }}
                      >
                        14/03/1985
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  borderRadius: 3,
                  borderColor: "#E5E7EB",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
                >
                  <PhoneIcon sx={{ color: "#1A56DB", fontSize: 20 }} />
                  <Typography
                    sx={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}
                  >
                    Contato
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography
                      sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.3 }}
                    >
                      E-mail
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.8 }}
                    >
                      <EmailIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "#111827",
                        }}
                      >
                        joao.silva@email.com
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.3 }}
                    >
                      Telefone
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.8 }}
                    >
                      <PhoneIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "#111827",
                        }}
                      >
                        (11) 98765-4321
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.3 }}
                    >
                      Responsável
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "#111827",
                      }}
                    >
                      Maria Silva
                    </Typography>
                    <Typography sx={{ fontSize: "12px", color: "#6B7280" }}>
                      CPF: 987.654.321-00
                    </Typography>
                    <Typography sx={{ fontSize: "12px", color: "#6B7280" }}>
                      (11) 91234-5678
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  borderRadius: 3,
                  borderColor: "#E5E7EB",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
                >
                  <LocationOnIcon sx={{ color: "#1A56DB", fontSize: 22 }} />
                  <Typography
                    sx={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}
                  >
                    Endereço
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography
                      sx={{ fontSize: "13px", color: "#6B7280", mb: 0.3 }}
                    >
                      Logradouro
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "15px",
                        color: "#111827",
                      }}
                    >
                      Rua das Flores, 123
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{ fontSize: "13px", color: "#6B7280", mb: 0.3 }}
                      >
                        Bairro
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "14px",
                          color: "#111827",
                        }}
                      >
                        Centro
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: "13px", color: "#6B7280", mb: 0.3 }}
                      >
                        CEP
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "14px",
                          color: "#111827",
                        }}
                      >
                        07800-000
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: "13px", color: "#6B7280", mb: 0.3 }}
                      >
                        Cidade
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "14px",
                          color: "#111827",
                        }}
                      >
                        Franco da Rocha
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: "13px", color: "#6B7280", mb: 0.3 }}
                      >
                        Estado
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "14px",
                          color: "#111827",
                        }}
                      >
                        SP
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  borderRadius: 3,
                  borderColor: "#E5E7EB",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
                >
                  <LocationOnIcon sx={{ color: "#1A56DB", fontSize: 22 }} />
                  <Typography
                    sx={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}
                  >
                    Farmácia Judicial
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography
                      sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.3 }}
                    >
                      Endereço
                    </Typography>
                    <Typography sx={{ fontSize: "13px", color: "#111827" }}>
                      Rua Prudente de Moraes, 255 - Centro
                    </Typography>
                    <Typography sx={{ fontSize: "13px", color: "#111827" }}>
                      Franco da Rocha - SP, 07850-000
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.3 }}
                    >
                      Horários de Atendimento
                    </Typography>
                    <Typography sx={{ fontSize: "13px", color: "#111827" }}>
                      Segunda a Sexta: 8h00 às 17h00
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>

            <Paper
              elevation={0}
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: "#EFF6FF",
                border: "1px solid #BFDBFE",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <InfoIcon sx={{ color: "#1A56DB", fontSize: 20 }} />
              <Typography
                sx={{ color: "#1E40AF", fontSize: "13px", fontWeight: 500 }}
              >
                Para atualizar suas informações, entre em contato com a
                Secretaria de Saúde.
              </Typography>
            </Paper>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default PacienteDashboard;
