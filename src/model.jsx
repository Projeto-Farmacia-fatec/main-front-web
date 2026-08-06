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
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import {
  MedicationOutlined as MedicationIcon,
  CalendarTodayOutlined as CalendarIcon,
  NotificationsNoneOutlined as NotificationsIcon,
  PersonOutline as PersonIcon,
  AccessTime as AccessTimeIcon,
  CheckCircleOutline as CheckCircleIcon,
  ErrorOutline as ErrorOutlineIcon,
  InfoOutlined as InfoIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";

// Dados mockados dos medicamentos
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

// Dados mockados das notificações
const NOTIFICACOES_INICIAIS = [
  {
    id: 1,
    tipo: "sucesso",
    icone: <CheckCircleIcon />,
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
    icone: <ErrorOutlineIcon />,
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

// Gerar dias do mês para o calendário
const gerarDiasCalendario = () => {
  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const dias = [];

  // Agosto 2026 começa em um sábado (dia 1)
  const primeiroDiaSemana = 6; // 0 = Domingo, 6 = Sábado
  const totalDias = 31;

  // Preencher dias vazios antes do dia 1
  for (let i = 0; i < primeiroDiaSemana; i++) {
    dias.push(null);
  }

  // Preencher os dias do mês
  for (let i = 1; i <= totalDias; i++) {
    dias.push(i);
  }

  return { diasSemana, dias };
};

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
  const [tabValue, setTabValue] = useState(0);

  // Estados do Agendamento
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
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

  const handleSelecionarData = (dia) => {
    setDataSelecionada(dia);
    setHorarioSelecionado(null);
  };

  const handleSelecionarHorario = (horario) => {
    setHorarioSelecionado(horario);
  };

  const handleConfirmarAgendamento = () => {
    if (dataSelecionada && horarioSelecionado) {
      const dataFormatada = `${String(dataSelecionada).padStart(2, "0")}/08/2026`;
      setAgendamentoConfirmado({
        status: true,
        data: dataFormatada,
        horario: horarioSelecionado,
      });
      setDataSelecionada(null);
      setHorarioSelecionado(null);
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
  const { diasSemana, dias } = gerarDiasCalendario();

  const isDataPassada = (dia) => {
    // Simulação: dias antes de 5 são passados
    return dia !== null && dia < 5;
  };

  return (
    <Box>
      {/* Sistema de Abas */}
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
            icon={<PersonIcon sx={{ fontSize: 20 }} />}
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
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Meus Medicamentos
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Acompanhe seus medicamentos em uso e as próximas datas de
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
                        boxShadow: "0 2px 12px rgba(26, 86, 219, 0.08)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={4}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
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
                            Próxima Retirada
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
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
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

            {/* Banner de Agendamento Confirmado */}
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
                  <CheckCircleIcon sx={{ color: "#059669", fontSize: 24 }} />
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

            {/* Grid de Seleção */}
            <Grid container spacing={3}>
              {/* Coluna Esquerda - Calendário */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    p: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2.5,
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

                  {/* Cabeçalho do Mês */}
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#111827",
                        textAlign: "center",
                      }}
                    >
                      Agosto 2026
                    </Typography>
                  </Box>

                  {/* Dias da Semana */}
                  <Grid container spacing={0.5} sx={{ mb: 1 }}>
                    {diasSemana.map((dia) => (
                      <Grid item xs={12 / 7} key={dia}>
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#9CA3AF",
                            py: 0.5,
                          }}
                        >
                          {dia}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Dias do Mês */}
                  <Grid container spacing={0.5}>
                    {dias.map((dia, index) => (
                      <Grid item xs={12 / 7} key={index}>
                        {dia ? (
                          <Button
                            fullWidth
                            disabled={isDataPassada(dia)}
                            onClick={() => handleSelecionarData(dia)}
                            sx={{
                              minWidth: 0,
                              aspectRatio: "1",
                              p: 0,
                              borderRadius: 2,
                              fontSize: "14px",
                              fontWeight: dataSelecionada === dia ? 700 : 500,
                              backgroundColor:
                                dataSelecionada === dia
                                  ? "#1A56DB"
                                  : "transparent",
                              color:
                                dataSelecionada === dia
                                  ? "white"
                                  : isDataPassada(dia)
                                    ? "#D1D5DB"
                                    : "#111827",
                              "&:hover": {
                                backgroundColor:
                                  dataSelecionada === dia
                                    ? "#1E40AF"
                                    : "#F3F4F6",
                              },
                              "&.Mui-disabled": {
                                color: "#D1D5DB",
                              },
                            }}
                          >
                            {dia}
                          </Button>
                        ) : (
                          <Box sx={{ aspectRatio: "1" }} />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>

              {/* Coluna Direita - Horários */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    p: 2.5,
                    minHeight: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2.5,
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

                  {!dataSelecionada ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 200,
                      }}
                    >
                      <Typography sx={{ color: "#9CA3AF", fontSize: "14px" }}>
                        Selecione uma data primeiro
                      </Typography>
                    </Box>
                  ) : (
                    <Grid container spacing={1.5}>
                      {HORARIOS_DISPONIVEIS.map((horario) => (
                        <Grid item xs={6} key={horario}>
                          <Button
                            fullWidth
                            variant={
                              horarioSelecionado === horario
                                ? "contained"
                                : "outlined"
                            }
                            onClick={() => handleSelecionarHorario(horario)}
                            sx={{
                              py: 1.5,
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 600,
                              fontSize: "14px",
                              borderColor:
                                horarioSelecionado === horario
                                  ? "#1A56DB"
                                  : "#E5E7EB",
                              backgroundColor:
                                horarioSelecionado === horario
                                  ? "#1A56DB"
                                  : "white",
                              color:
                                horarioSelecionado === horario
                                  ? "white"
                                  : "#111827",
                              "&:hover": {
                                borderColor: "#1A56DB",
                                backgroundColor:
                                  horarioSelecionado === horario
                                    ? "#1E40AF"
                                    : "#F0F5FF",
                              },
                            }}
                          >
                            {horario}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Paper>
              </Grid>
            </Grid>

            {/* Botão Confirmar */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                variant="contained"
                disabled={!dataSelecionada || !horarioSelecionado}
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

            <Grid container spacing={2}>
              {notificacoes.map((notif) => (
                <Grid item xs={12} key={notif.id}>
                  <Paper
                    elevation={0}
                    sx={{
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
                      {/* Ícone da Notificação */}
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

                      {/* Conteúdo */}
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
                          <Typography
                            sx={{ fontSize: "12px", color: "#9CA3AF" }}
                          >
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
                </Grid>
              ))}
            </Grid>

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

            <Grid container spacing={2.5}>
              {/* Card 1 - Dados Pessoais */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        backgroundColor: "#EFF6FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PersonIcon sx={{ color: "#1A56DB", fontSize: 20 }} />
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#111827",
                      }}
                    >
                      Dados Pessoais
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box>
                      <Typography
                        sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
                      >
                        Nome Completo
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "15px",
                          color: "#111827",
                        }}
                      >
                        João Silva
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
                      >
                        CPF
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "15px",
                          color: "#111827",
                        }}
                      >
                        123.456.789-00
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
                      >
                        Data de Nascimento
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <CalendarIcon sx={{ fontSize: 18, color: "#6B7280" }} />
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "15px",
                            color: "#111827",
                          }}
                        >
                          14/03/1985
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* Card 2 - Contato */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        backgroundColor: "#EFF6FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PhoneIcon sx={{ color: "#1A56DB", fontSize: 20 }} />
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#111827",
                      }}
                    >
                      Contato
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box>
                      <Typography
                        sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
                      >
                        E-mail
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <EmailIcon sx={{ fontSize: 18, color: "#6B7280" }} />
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "15px",
                            color: "#111827",
                          }}
                        >
                          joao.silva@email.com
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
                      >
                        Telefone
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <PhoneIcon sx={{ fontSize: 18, color: "#6B7280" }} />
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "15px",
                            color: "#111827",
                          }}
                        >
                          (11) 98765-4321
                        </Typography>
                      </Box>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography
                        sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
                      >
                        Responsável
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "15px",
                          color: "#111827",
                        }}
                      >
                        Maria Silva
                      </Typography>
                      <Typography
                        sx={{ fontSize: "13px", color: "#6B7280", mt: 0.5 }}
                      >
                        CPF: 987.654.321-00
                      </Typography>
                      <Typography sx={{ fontSize: "13px", color: "#6B7280" }}>
                        Tel: (11) 91234-5678
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* Card 3 - Endereço */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        backgroundColor: "#EFF6FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LocationOnIcon sx={{ color: "#1A56DB", fontSize: 20 }} />
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#111827",
                      }}
                    >
                      Endereço
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box>
                      <Typography
                        sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
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
                    <Box sx={{ display: "flex", gap: 3 }}>
                      <Box>
                        <Typography
                          sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
                        >
                          Bairro
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "15px",
                            color: "#111827",
                          }}
                        >
                          Centro
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
                        >
                          CEP
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "15px",
                            color: "#111827",
                          }}
                        >
                          07800-000
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 3 }}>
                      <Box>
                        <Typography
                          sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
                        >
                          Cidade
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "15px",
                            color: "#111827",
                          }}
                        >
                          Franco da Rocha
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
                        >
                          Estado
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "15px",
                            color: "#111827",
                          }}
                        >
                          SP
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* Card 4 - Farmácia Judicial */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        backgroundColor: "#EFF6FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LocationOnIcon sx={{ color: "#1A56DB", fontSize: 20 }} />
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#111827",
                      }}
                    >
                      Farmácia Judicial
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box>
                      <Typography
                        sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
                      >
                        Endereço da Unidade
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "15px",
                          color: "#111827",
                          lineHeight: 1.5,
                        }}
                      >
                        Rua Prudente de Moraes, 255 - Centro, Franco da Rocha -
                        SP, 07850-000
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
                      >
                        Horários de Atendimento
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AccessTimeIcon
                          sx={{ fontSize: 18, color: "#6B7280" }}
                        />
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "15px",
                            color: "#111827",
                          }}
                        >
                          Segunda a Sexta: 8h00 às 17h00
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            {/* Banner Informativo */}
            <Paper
              elevation={0}
              sx={{
                mt: 3,
                p: 2.5,
                backgroundColor: "#EFF6FF",
                border: "1px solid #BFDBFE",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <InfoIcon sx={{ color: "#1A56DB", fontSize: 22 }} />
              <Typography
                sx={{ color: "#1E40AF", fontSize: "14px", fontWeight: 500 }}
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
