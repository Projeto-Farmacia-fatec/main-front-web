import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import {
  PeopleAltOutlined,
  AssignmentTurnedInOutlined,
  Search as SearchIcon,
  VisibilityOutlined,
  CalendarTodayOutlined,
  Check as CheckIcon,
} from "@mui/icons-material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

// Dados mockados para Pacientes em Tratamento
const PACIENTES_TRATAMENTO_MOCK = [
  {
    id: 1,
    nome: "João Silva",
    status: "Ativo",
    medicamento: "Losartana 50mg",
    inicioTratamento: "14/10/2025",
    telefone: "(11) 98765-4321",
    endereco: "Rua das Flores, 123 - Centro",
  },
  {
    id: 2,
    nome: "Maria Santos",
    status: "Ativo",
    medicamento: "Metformina 850mg",
    inicioTratamento: "19/01/2026",
    telefone: "(11) 97654-3210",
    endereco: "Av. Brasil, 456 - Jardim das Palmeiras",
  },
  {
    id: 3,
    nome: "Pedro Alves",
    status: "Ativo",
    medicamento: "Sinvastatina 20mg",
    inicioTratamento: "31/10/2025",
    telefone: "(11) 96543-2109",
    endereco: "Rua São José, 789 - Vila Nova",
  },
];

// Dados mockados para Reavaliações
const REAVALIACOES_MOCK = [
  {
    id: 1,
    nome: "João Silva",
    tipo: "Reavaliação Semestral",
    status: "Pendente",
    medicamento: "Losartana 50mg",
    ultimaReavaliacao: "14/10/2025",
    proximaReavaliacao: "14/04/2026",
  },
  {
    id: 2,
    nome: "Maria Santos",
    tipo: "Reavaliação Semestral",
    status: "Pendente",
    medicamento: "Metformina 850mg",
    ultimaReavaliacao: "19/01/2026",
    proximaReavaliacao: "19/07/2026",
  },
  {
    id: 3,
    nome: "Pedro Alves",
    tipo: "Reavaliação Semestral",
    status: "Concluída",
    medicamento: "Sinvastatina 20mg",
    ultimaReavaliacao: "31/10/2025",
    proximaReavaliacao: "30/04/2026",
  },
  {
    id: 4,
    nome: "Ana Costa",
    tipo: "Avaliação Pós-Compra",
    status: "Pendente",
    medicamento: "Enalapril 10mg",
    inicioCompra: "09/08/2025",
    chegadaMedicamento: "04/05/2026",
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

const UbsDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchPaciente, setSearchPaciente] = useState("");
  const [reavaliacoes, setReavaliacoes] = useState(REAVALIACOES_MOCK);

  // Estados do Modal de Detalhes do Paciente
  const [modalDetalhesOpen, setModalDetalhesOpen] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  // Estados do Modal de Confirmação de Necessidade (Reavaliação)
  const [modalReavaliacaoOpen, setModalReavaliacaoOpen] = useState(false);
  const [reavaliacaoSelecionada, setReavaliacaoSelecionada] = useState(null);
  const [statusPaciente, setStatusPaciente] = useState(
    "Continua necessitando do tratamento",
  );
  const [observacoes, setObservacoes] = useState("");

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  // Handlers Modal Detalhes
  const handleOpenModalDetalhes = (paciente) => {
    setPacienteSelecionado(paciente);
    setModalDetalhesOpen(true);
  };

  const handleCloseModalDetalhes = () => {
    setModalDetalhesOpen(false);
    setPacienteSelecionado(null);
  };

  // Handlers Modal Reavaliação
  const handleOpenModalReavaliacao = (reav) => {
    setReavaliacaoSelecionada(reav);
    setStatusPaciente("Continua necessitando do tratamento");
    setObservacoes("");
    setModalReavaliacaoOpen(true);
  };

  const handleCloseModalReavaliacao = () => {
    setModalReavaliacaoOpen(false);
    setReavaliacaoSelecionada(null);
  };

  const handleConfirmarReavaliacao = () => {
    if (reavaliacaoSelecionada) {
      setReavaliacoes(
        reavaliacoes.map((reav) =>
          reav.id === reavaliacaoSelecionada.id
            ? { ...reav, status: "Concluída" }
            : reav,
        ),
      );
    }
    handleCloseModalReavaliacao();
  };

  const filteredPacientes = PACIENTES_TRATAMENTO_MOCK.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchPaciente.toLowerCase()) ||
      p.medicamento.toLowerCase().includes(searchPaciente.toLowerCase()),
  );

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
        {/* Abas Superiores */}
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
            icon={<PeopleAltOutlined sx={{ fontSize: 20 }} />}
            label="Pacientes em Tratamento"
            iconPosition="start"
          />
          <Tab
            icon={<AssignmentTurnedInOutlined sx={{ fontSize: 20 }} />}
            label="Reavaliações"
            iconPosition="start"
          />
        </Tabs>

        {/* ==================== ABA 1: PACIENTES EM TRATAMENTO ==================== */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Pacientes em Tratamento
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Visualize os pacientes cadastrados e suas informações básicas
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                backgroundColor: "#FFFFFF",
              }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar paciente..."
                value={searchPaciente}
                onChange={(e) => setSearchPaciente(e.target.value)}
                sx={{
                  mb: 2.5,
                  backgroundColor: "#FFFFFF",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#FFFFFF",
                    "& fieldset": { borderColor: "#E5E7EB" },
                    "&:hover fieldset": { borderColor: "#D1D5DB" },
                    "&.Mui-focused fieldset": { borderColor: "#1A56DB" },
                  },
                  "& .MuiOutlinedInput-input": { py: 1, fontSize: "14px" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#9CA3AF", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TableContainer
                component={Paper}
                elevation={0}
                sx={{ border: "1px solid #F3F4F6", borderRadius: 2 }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: "#6B7280",
                          fontSize: "12px",
                          py: 1.5,
                        }}
                      >
                        NOME
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: "#6B7280",
                          fontSize: "12px",
                          py: 1.5,
                        }}
                      >
                        STATUS
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: "#6B7280",
                          fontSize: "12px",
                          py: 1.5,
                        }}
                      >
                        MEDICAMENTO
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: "#6B7280",
                          fontSize: "12px",
                          py: 1.5,
                        }}
                      >
                        INÍCIO DO TRATAMENTO
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: "#6B7280",
                          fontSize: "12px",
                          py: 1.5,
                        }}
                      >
                        AÇÕES
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPacientes.map((paciente) => (
                      <TableRow
                        key={paciente.id}
                        hover
                        sx={{ borderBottom: "1px solid #F3F4F6" }}
                      >
                        <TableCell sx={{ py: 1.5 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <PersonOutlineOutlinedIcon
                              sx={{ fontSize: 16, color: "#9CA3AF" }}
                            />
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "14px",
                                color: "#111827",
                              }}
                            >
                              {paciente.nome}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell sx={{ py: 1.5 }}>
                          <Chip
                            label={paciente.status}
                            size="small"
                            icon={
                              <Box
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  backgroundColor: "#10B981",
                                  ml: 1,
                                }}
                              />
                            }
                            sx={{
                              backgroundColor: "#ECFDF5",
                              color: "#059669",
                              fontWeight: 600,
                              fontSize: "12px",
                              borderRadius: "16px",
                              height: 24,
                            }}
                          />
                        </TableCell>

                        <TableCell
                          sx={{ color: "#4B5563", fontSize: "14px", py: 1.5 }}
                        >
                          {paciente.medicamento}
                        </TableCell>

                        <TableCell
                          sx={{ color: "#4B5563", fontSize: "14px", py: 1.5 }}
                        >
                          {paciente.inicioTratamento}
                        </TableCell>

                        <TableCell sx={{ py: 1.5 }}>
                          <Button
                            size="small"
                            onClick={() => handleOpenModalDetalhes(paciente)}
                            startIcon={
                              <VisibilityOutlined
                                sx={{ fontSize: "15px !important" }}
                              />
                            }
                            sx={{
                              textTransform: "none",
                              fontSize: "12px",
                              fontWeight: 600,
                              backgroundColor: "#EFF6FF",
                              color: "#1A56DB",
                              borderRadius: "16px",
                              px: 1.8,
                              py: 0.4,
                              boxShadow: "none",
                              "&:hover": {
                                backgroundColor: "#DBEAFE",
                                boxShadow: "none",
                              },
                            }}
                          >
                            Ver Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </TabPanel>

        {/* ==================== ABA 2: REAVALIAÇÕES ==================== */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Reavaliações
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Gerencie as reavaliações de continuidade de tratamento
              </Typography>
            </Box>

            {/* Banners Informativos no Topo (Grid 2 Colunas Lado a Lado) */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
                mb: 3,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  backgroundColor: "#EFF6FF",
                  border: "1px solid #BFDBFE",
                  borderRadius: 3,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#1E40AF",
                    fontSize: "15px",
                    mb: 0.8,
                  }}
                >
                  Reavaliação Semestral
                </Typography>
                <Typography
                  sx={{
                    color: "#1E40AF",
                    fontSize: "13px",
                    lineHeight: 1.5,
                    opacity: 0.9,
                  }}
                >
                  Realizada a cada 6 meses para verificar se o tratamento
                  continua ativo ou se tornará inativo. O paciente pode ter
                  melhorado, encontrado outro meio de tratamento, mudado de
                  município ou falecido.
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  backgroundColor: "#FAF5FF",
                  border: "1px solid #E9D5FF",
                  borderRadius: 3,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#6B21A8",
                    fontSize: "15px",
                    mb: 0.8,
                  }}
                >
                  Avaliação Pós-Compra
                </Typography>
                <Typography
                  sx={{
                    color: "#6B21A8",
                    fontSize: "13px",
                    lineHeight: 1.5,
                    opacity: 0.9,
                  }}
                >
                  Realizada quando o medicamento chega na farmácia após o
                  período de compra (processo complexo e demorado). Verifica-se
                  se o paciente ainda necessita do medicamento, pois durante
                  esse período pode ter melhorado, encontrado outro tratamento,
                  mudado de município ou falecido.
                </Typography>
              </Paper>
            </Box>

            {/* Cards de Reavaliação */}
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                backgroundColor: "#FFFFFF",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {reavaliacoes.map((reav) => {
                  const isSemestral = reav.tipo === "Reavaliação Semestral";
                  return (
                    <Paper
                      key={reav.id}
                      elevation={0}
                      sx={{
                        p: 2.5,
                        border: "1px solid #E5E7EB",
                        borderRadius: 3,
                        backgroundColor: "#FFFFFF",
                        transition: "all 0.2s ease",
                        "&:hover": { borderColor: "#D1D5DB" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: 2,
                        }}
                      >
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          {/* Topo do Card: Nome + Badges */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.2,
                              mb: 2.5,
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: "15px",
                                color: "#111827",
                              }}
                            >
                              {reav.nome}
                            </Typography>

                            <Chip
                              label={reav.tipo}
                              size="small"
                              sx={{
                                backgroundColor: isSemestral
                                  ? "#EFF6FF"
                                  : "#FAF5FF",
                                color: isSemestral ? "#1A56DB" : "#6B21A8",
                                fontWeight: 600,
                                fontSize: "11px",
                                borderRadius: "6px",
                                height: 20,
                                px: 0.5,
                              }}
                            />

                            <Chip
                              label={reav.status}
                              size="small"
                              sx={{
                                backgroundColor:
                                  reav.status === "Pendente"
                                    ? "#FEF3C7"
                                    : "#ECFDF5",
                                color:
                                  reav.status === "Pendente"
                                    ? "#D97706"
                                    : "#059669",
                                fontWeight: 600,
                                fontSize: "11px",
                                borderRadius: "10px",
                                height: 20,
                                px: 0.5,
                              }}
                            />
                          </Box>

                          {/* 4 Colunas com Alinhamento do Figma */}
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: {
                                xs: "1fr",
                                md: "220px 220px 180px 180px",
                              },
                              columnGap: 2,
                              rowGap: 1.5,
                              alignItems: "flex-start",
                            }}
                          >
                            {/* Coluna 1: Tipo de Avaliação */}
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "#9CA3AF",
                                  mb: 0.3,
                                  fontWeight: 400,
                                }}
                              >
                                Tipo de Avaliação
                              </Typography>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "13.5px",
                                  color: "#111827",
                                }}
                              >
                                {reav.tipo}
                              </Typography>
                            </Box>

                            {/* Coluna 2: Medicamento */}
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "#9CA3AF",
                                  mb: 0.3,
                                  fontWeight: 400,
                                }}
                              >
                                Medicamento
                              </Typography>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "13.5px",
                                  color: "#111827",
                                }}
                              >
                                {reav.medicamento}
                              </Typography>
                            </Box>

                            {/* Coluna 3: Data 1 */}
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "#9CA3AF",
                                  mb: 0.3,
                                  fontWeight: 400,
                                }}
                              >
                                {isSemestral
                                  ? "Última Reavaliação"
                                  : "Início da Compra"}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.6,
                                }}
                              >
                                <CalendarTodayOutlined
                                  sx={{ fontSize: 14, color: "#6B7280" }}
                                />
                                <Typography
                                  sx={{
                                    fontWeight: 700,
                                    fontSize: "13.5px",
                                    color: "#111827",
                                  }}
                                >
                                  {isSemestral
                                    ? reav.ultimaReavaliacao
                                    : reav.inicioCompra}
                                </Typography>
                              </Box>
                            </Box>

                            {/* Coluna 4: Data 2 */}
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "#9CA3AF",
                                  mb: 0.3,
                                  fontWeight: 400,
                                }}
                              >
                                {isSemestral
                                  ? "Próxima Reavaliação"
                                  : "Chegada do Medicamento"}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.6,
                                }}
                              >
                                <CalendarTodayOutlined
                                  sx={{ fontSize: 14, color: "#6B7280" }}
                                />
                                <Typography
                                  sx={{
                                    fontWeight: 700,
                                    fontSize: "13.5px",
                                    color: "#111827",
                                  }}
                                >
                                  {isSemestral
                                    ? reav.proximaReavaliacao
                                    : reav.chegadaMedicamento}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>

                        {/* Botão de Ação */}
                        {reav.status === "Pendente" && (
                          <Button
                            size="small"
                            onClick={() => handleOpenModalReavaliacao(reav)}
                            sx={{
                              textTransform: "none",
                              fontSize: "12px",
                              fontWeight: 600,
                              backgroundColor: "#EFF6FF",
                              color: "#1A56DB",
                              borderRadius: "14px",
                              px: 2.2,
                              py: 0.6,
                              boxShadow: "none",
                              whiteSpace: "nowrap",
                              "&:hover": {
                                backgroundColor: "#DBEAFE",
                                boxShadow: "none",
                              },
                            }}
                          >
                            Realizar Reavaliação
                          </Button>
                        )}
                      </Box>
                    </Paper>
                  );
                })}
              </Box>
            </Paper>
          </Box>
        </TabPanel>
      </Paper>

      {/* ==================== MODAL 1: DETALHES DO PACIENTE ==================== */}
      <Dialog
        open={modalDetalhesOpen}
        onClose={handleCloseModalDetalhes}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
            boxShadow:
              "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 2, px: 2.5 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: "18px", color: "#111827" }}
          >
            Informações do Paciente
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 2.5, py: 1 }}>
          {pacienteSelecionado && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography
                  sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.2 }}
                >
                  Nome
                </Typography>
                <Typography
                  sx={{ fontWeight: 600, fontSize: "14px", color: "#111827" }}
                >
                  {pacienteSelecionado.nome}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.2 }}
                >
                  Status
                </Typography>
                <Typography
                  sx={{ fontWeight: 600, fontSize: "14px", color: "#111827" }}
                >
                  {pacienteSelecionado.status}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.2 }}
                >
                  Medicamento
                </Typography>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "14px", color: "#111827" }}
                >
                  {pacienteSelecionado.medicamento}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.2 }}
                >
                  Início do Tratamento
                </Typography>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "14px", color: "#111827" }}
                >
                  {pacienteSelecionado.inicioTratamento}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.2 }}
                >
                  Telefone
                </Typography>
                <Typography
                  sx={{ fontWeight: 600, fontSize: "14px", color: "#111827" }}
                >
                  {pacienteSelecionado.telefone}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.2 }}
                >
                  Endereço
                </Typography>
                <Typography
                  sx={{ fontWeight: 600, fontSize: "14px", color: "#111827" }}
                >
                  {pacienteSelecionado.endereco}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 1, justifyContent: "flex-end" }}>
          <Button
            onClick={handleCloseModalDetalhes}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "10px",
              px: 2.5,
              py: 0.6,
              backgroundColor: "#F3F4F6",
              color: "#374151",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#E5E7EB",
                boxShadow: "none",
              },
            }}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      {/* ==================== MODAL 2: CONFIRMAÇÃO DE NECESSIDADE (REAVALIAÇÃO) ==================== */}
      <Dialog
        open={modalReavaliacaoOpen}
        onClose={handleCloseModalReavaliacao}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
            boxShadow:
              "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 2, px: 2.5 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: "18px", color: "#111827" }}
          >
            Confirmação de Necessidade
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 2.5, py: 1.5 }}>
          {reavaliacaoSelecionada && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Campo Read-only Paciente */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#374151",
                    mb: 0.5,
                  }}
                >
                  Paciente
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={reavaliacaoSelecionada.nome}
                  disabled
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: "#F9FAFB",
                    },
                  }}
                />
              </Box>

              {/* Campo Read-only Tipo de Avaliação */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#374151",
                    mb: 0.5,
                  }}
                >
                  Tipo de Avaliação
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={reavaliacaoSelecionada.tipo}
                  disabled
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: "#F9FAFB",
                    },
                  }}
                />
              </Box>

              {/* Campo Read-only Medicamento */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#374151",
                    mb: 0.5,
                  }}
                >
                  Medicamento
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={reavaliacaoSelecionada.medicamento}
                  disabled
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: "#F9FAFB",
                    },
                  }}
                />
              </Box>

              {/* Radio Group Status do Paciente */}
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151 !important",
                    mb: 0.5,
                  }}
                >
                  Status do Paciente *
                </FormLabel>
                <RadioGroup
                  value={statusPaciente}
                  onChange={(e) => setStatusPaciente(e.target.value)}
                >
                  {[
                    "Continua necessitando do tratamento",
                    "Melhorou do problema",
                    "Encontrou outro meio de tratamento",
                    "Mudou de município",
                    "Paciente falecido",
                  ].map((opcao) => (
                    <FormControlLabel
                      key={opcao}
                      value={opcao}
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: "#D1D5DB",
                            "&.Mui-checked": { color: "#1A56DB" },
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{ fontSize: "13.5px", color: "#374151" }}
                        >
                          {opcao}
                        </Typography>
                      }
                      sx={{ my: -0.2 }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              {/* Campo Observações */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    mb: 0.5,
                  }}
                >
                  Observações *
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Digite observações sobre a avaliação realizada..."
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: "#FFFFFF",
                      "& fieldset": { borderColor: "#E5E7EB" },
                      "&:hover fieldset": { borderColor: "#D1D5DB" },
                      "&.Mui-focused fieldset": { borderColor: "#1A56DB" },
                    },
                  }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>

        {/* Rodapé com Botões Cancelar e Confirmar */}
        <DialogActions
          sx={{ p: 2.5, pt: 1, justifyContent: "flex-end", gap: 1 }}
        >
          <Button
            onClick={handleCloseModalReavaliacao}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "10px",
              px: 2.5,
              py: 0.8,
              backgroundColor: "#FFFFFF",
              color: "#374151",
              border: "1px solid #E5E7EB",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#F9FAFB",
                borderColor: "#D1D5DB",
                boxShadow: "none",
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={handleConfirmarReavaliacao}
            startIcon={<CheckIcon sx={{ fontSize: "16px !important" }} />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "10px",
              px: 3,
              py: 0.8,
              backgroundColor: "#1A56DB",
              color: "#FFFFFF",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#1E40AF",
                boxShadow: "none",
              },
            }}
          >
            Confirmar Reavaliação
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UbsDashboard;
