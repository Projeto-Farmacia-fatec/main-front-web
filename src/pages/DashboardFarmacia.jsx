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
  MenuItem,
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
  Select,
  FormControl,
} from "@mui/material";
import {
  PeopleAltOutlined,
  LinkOutlined,
  CalendarTodayOutlined,
  InboxOutlined,
  Search as SearchIcon,
  VisibilityOutlined,
  SaveOutlined,
  Check as CheckIcon,
} from "@mui/icons-material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";

// Dados mockados para Pacientes
const PACIENTES_MOCK = [
  {
    id: 1,
    nome: "João Silva",
    medicamento: "Losartana 50mg",
    telefone: "(11) 98765-4321",
    status: "Ativo",
    proximaRetirada: "04/05/2026",
  },
  {
    id: 2,
    nome: "Maria Santos",
    medicamento: "Metformina 850mg",
    telefone: "(11) 97654-3210",
    status: "Ativo",
    proximaRetirada: "11/05/2026",
  },
  {
    id: 3,
    nome: "Pedro Alves",
    medicamento: "Sinvastatina 20mg",
    telefone: "(11) 96543-2109",
    status: "Inativo",
    proximaRetirada: "-",
  },
];

// Dados mockados para Medicamentos
const MEDICAMENTOS_INICIAIS = [
  { id: 1, nome: "Losartana 50mg", disponivel: true },
  { id: 2, nome: "Metformina 850mg", disponivel: true },
  { id: 3, nome: "Sinvastatina 20mg", disponivel: true },
  { id: 4, nome: "Enalapril 10mg", disponivel: false },
];

// Dias da semana
const DIAS_SEMANA = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

// Dados mockados para Agendamentos
const AGENDAMENTOS_INICIAIS = [
  {
    id: 1,
    nome: "João Silva",
    medicamento: "Losartana 50mg",
    data: "04/05/2026",
    horario: "09:00",
    quantidade: "30 comp.",
    status: "Confirmado",
  },
  {
    id: 2,
    nome: "Maria Santos",
    medicamento: "Metformina 850mg",
    data: "04/05/2026",
    horario: "10:00",
    quantidade: "60 comp.",
    status: "Pendente",
  },
  {
    id: 3,
    nome: "Pedro Alves",
    medicamento: "Sinvastatina 20mg",
    data: "05/05/2026",
    horario: "14:00",
    quantidade: "30 comp.",
    status: "Pendente",
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

const FarmaciaDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  // Estados da Aba 1: Pacientes
  const [searchPaciente, setSearchPaciente] = useState("");
  const [modalPacDetalhesOpen, setModalPacDetalhesOpen] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  // Estados da Aba 2: Medicamentos
  const [searchMedicamento, setSearchMedicamento] = useState("");
  const [medicamentos, setMedicamentos] = useState(MEDICAMENTOS_INICIAIS);
  const [modalMedDetalhesOpen, setModalMedDetalhesOpen] = useState(false);
  const [medicamentoDetalhes, setMedicamentoDetalhes] = useState(null);

  // Modal de Confirmação de Alteração de Disponibilidade (Card da Aba 2)
  const [modalConfirmStatusOpen, setModalConfirmStatusOpen] = useState(false);
  const [medicamentoParaAlterar, setMedicamentoParaAlterar] = useState(null);

  // Estados da Aba 3: Disponibilidade
  const [medicamentoSelecionado, setMedicamentoSelecionado] =
    useState("Losartana 50mg");
  const [diasSelecionados, setDiasSelecionados] = useState([
    "Segunda-feira",
    "Quarta-feira",
    "Sexta-feira",
  ]);
  const [modalConfirmDisponibilidadeOpen, setModalConfirmDisponibilidadeOpen] =
    useState(false);

  // Estados da Aba 4: Agendamentos
  const [agendamentos, setAgendamentos] = useState(AGENDAMENTOS_INICIAIS);

  // Modal Registrar Presença
  const [modalPresencaOpen, setModalPresencaOpen] = useState(false);
  const [agendamentoPresenca, setAgendamentoPresenca] = useState(null);
  const [responsavelAcompanhante, setResponsavelAcompanhante] = useState("");
  const [quantidadeEntregue, setQuantidadeEntregue] = useState(30);
  const [dataRetirada, setDataRetirada] = useState("2026-05-05");

  // Modal Registrar Falta
  const [modalFaltaOpen, setModalFaltaOpen] = useState(false);
  const [agendamentoFalta, setAgendamentoFalta] = useState(null);

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  // Handlers Modal Detalhes Paciente
  const handleOpenModalPacDetalhes = (paciente) => {
    setPacienteSelecionado(paciente);
    setModalPacDetalhesOpen(true);
  };
  const handleCloseModalPacDetalhes = () => {
    setModalPacDetalhesOpen(false);
    setPacienteSelecionado(null);
  };

  // Handlers Modal Detalhes Medicamento
  const handleOpenModalMedDetalhes = (med) => {
    setMedicamentoDetalhes(med);
    setModalMedDetalhesOpen(true);
  };
  const handleCloseModalMedDetalhes = () => {
    setModalMedDetalhesOpen(false);
    setMedicamentoDetalhes(null);
  };

  // Handlers Modal Confirmação de Disponibilidade (Aba 2)
  const handleOpenConfirmStatus = (med) => {
    setMedicamentoParaAlterar(med);
    setModalConfirmStatusOpen(true);
  };
  const handleCloseConfirmStatus = () => {
    setModalConfirmStatusOpen(false);
    setMedicamentoParaAlterar(null);
  };
  const handleConfirmarAlteracaoStatus = () => {
    if (medicamentoParaAlterar) {
      setMedicamentos(
        medicamentos.map((m) =>
          m.id === medicamentoParaAlterar.id
            ? { ...m, disponivel: !m.disponivel }
            : m,
        ),
      );
    }
    handleCloseConfirmStatus();
  };

  // Handlers Modal Confirmação de Disponibilidade (Aba 3)
  const handleOpenConfirmDisponibilidade = () => {
    setModalConfirmDisponibilidadeOpen(true);
  };
  const handleCloseConfirmDisponibilidade = () => {
    setModalConfirmDisponibilidadeOpen(false);
  };
  const handleSalvarDisponibilidadeFinal = () => {
    handleCloseConfirmDisponibilidade();
  };

  // Handlers Modal Presença
  const handleOpenModalPresenca = (ag) => {
    setAgendamentoPresenca(ag);
    setResponsavelAcompanhante("");
    setQuantidadeEntregue(30);
    setDataRetirada("2026-05-05");
    setModalPresencaOpen(true);
  };
  const handleCloseModalPresenca = () => {
    setModalPresencaOpen(false);
    setAgendamentoPresenca(null);
  };
  const handleConfirmarPresenca = () => {
    if (agendamentoPresenca) {
      setAgendamentos(
        agendamentos.map((ag) =>
          ag.id === agendamentoPresenca.id
            ? { ...ag, status: "Confirmado" }
            : ag,
        ),
      );
    }
    handleCloseModalPresenca();
  };

  // Handlers Modal Falta
  const handleOpenModalFalta = (ag) => {
    setAgendamentoFalta(ag);
    setModalFaltaOpen(true);
  };
  const handleCloseModalFalta = () => {
    setModalFaltaOpen(false);
    setAgendamentoFalta(null);
  };
  const handleConfirmarFalta = () => {
    handleCloseModalFalta();
  };

  const handleToggleDia = (dia) => {
    setDiasSelecionados((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia],
    );
  };

  const handleConfirmarAgendamento = (id) => {
    setAgendamentos(
      agendamentos.map((ag) =>
        ag.id === id ? { ...ag, status: "Confirmado" } : ag,
      ),
    );
  };

  const filteredPacientes = PACIENTES_MOCK.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchPaciente.toLowerCase()) ||
      p.medicamento.toLowerCase().includes(searchPaciente.toLowerCase()),
  );

  const filteredMedicamentos = medicamentos.filter((m) =>
    m.nome.toLowerCase().includes(searchMedicamento.toLowerCase()),
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
            label="Pacientes"
            iconPosition="start"
          />
          <Tab
            icon={<LinkOutlined sx={{ fontSize: 20 }} />}
            label="Lista de Medicamentos"
            iconPosition="start"
          />
          <Tab
            icon={<CalendarTodayOutlined sx={{ fontSize: 20 }} />}
            label="Disponibilidade"
            iconPosition="start"
          />
          <Tab
            icon={<InboxOutlined sx={{ fontSize: 20 }} />}
            label="Agendamentos"
            iconPosition="start"
          />
        </Tabs>

        {/* ==================== ABA 1: PACIENTES ==================== */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Pacientes e Tratamentos
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Lista de pacientes cadastrados e seus medicamentos
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
                  "& .MuiOutlinedInput-input": {
                    py: 1,
                    fontSize: "14px",
                  },
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
                        PRÓXIMA RETIRADA
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

                        <TableCell
                          sx={{ color: "#4B5563", fontSize: "14px", py: 1.5 }}
                        >
                          {paciente.medicamento}
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
                                  backgroundColor:
                                    paciente.status === "Ativo"
                                      ? "#10B981"
                                      : "#EF4444",
                                  ml: 1,
                                }}
                              />
                            }
                            sx={{
                              backgroundColor:
                                paciente.status === "Ativo"
                                  ? "#ECFDF5"
                                  : "#FEF2F2",
                              color:
                                paciente.status === "Ativo"
                                  ? "#059669"
                                  : "#DC2626",
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
                          {paciente.proximaRetirada}
                        </TableCell>

                        <TableCell sx={{ py: 1.5 }}>
                          <Button
                            size="small"
                            onClick={() => handleOpenModalPacDetalhes(paciente)}
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
                            Ver detalhes
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

        {/* ==================== ABA 2: LISTA DE MEDICAMENTOS ==================== */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Lista de Medicamentos
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Visualize os medicamentos cadastrados no sistema
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
                placeholder="Buscar medicamento..."
                value={searchMedicamento}
                onChange={(e) => setSearchMedicamento(e.target.value)}
                sx={{
                  mb: 3,
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

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {filteredMedicamentos.map((med) => (
                  <Paper
                    key={med.id}
                    elevation={0}
                    sx={{
                      p: 2.5,
                      border: "1px solid #E5E7EB",
                      borderRadius: 3,
                      backgroundColor: "#FFFFFF",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "all 0.2s ease",
                      "&:hover": { borderColor: "#D1D5DB" },
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: "10px",
                          backgroundColor: med.disponivel
                            ? "#EFF6FF"
                            : "#FEF2F2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <MedicationOutlinedIcon
                          sx={{
                            color: med.disponivel ? "#1A56DB" : "#EF4444",
                            fontSize: 22,
                          }}
                        />
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "15px",
                            color: "#111827",
                            mb: 0.8,
                          }}
                        >
                          {med.nome}
                        </Typography>

                        <Chip
                          label={med.disponivel ? "Disponível" : "Indisponível"}
                          size="small"
                          sx={{
                            backgroundColor: med.disponivel
                              ? "#ECFDF5"
                              : "#FEF2F2",
                            color: med.disponivel ? "#059669" : "#DC2626",
                            fontWeight: 600,
                            fontSize: "12px",
                            borderRadius: "12px",
                            height: 22,
                          }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      <Button
                        fullWidth
                        size="small"
                        onClick={() => handleOpenModalMedDetalhes(med)}
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
                          borderRadius: "12px",
                          py: 0.6,
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#DBEAFE",
                            boxShadow: "none",
                          },
                        }}
                      >
                        Detalhes
                      </Button>

                      <Button
                        fullWidth
                        size="small"
                        onClick={() => handleOpenConfirmStatus(med)}
                        sx={{
                          textTransform: "none",
                          fontSize: "12px",
                          fontWeight: 600,
                          backgroundColor: med.disponivel
                            ? "#FEF2F2"
                            : "#ECFDF5",
                          color: med.disponivel ? "#EF4444" : "#10B981",
                          borderRadius: "12px",
                          py: 0.6,
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: med.disponivel
                              ? "#FEE2E2"
                              : "#D1FAE5",
                            boxShadow: "none",
                          },
                        }}
                      >
                        {med.disponivel
                          ? "Marcar Indisponível"
                          : "Marcar Disponível"}
                      </Button>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Paper>
          </Box>
        </TabPanel>

        {/* ==================== ABA 3: DISPONIBILIDADE ==================== */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Gestão de Disponibilidade
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Defina os dias disponíveis para agendamento de cada medicamento
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{ p: 3, border: "1px solid #E5E7EB", borderRadius: 2 }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#111827",
                    mb: 1,
                  }}
                >
                  Selecione o Medicamento
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={medicamentoSelecionado}
                    onChange={(e) => setMedicamentoSelecionado(e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    {MEDICAMENTOS_INICIAIS.map((med) => (
                      <MenuItem key={med.id} value={med.nome}>
                        {med.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <CalendarTodayOutlined
                    sx={{ color: "#1A56DB", fontSize: 20 }}
                  />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "15px", Color: "#111827" }}
                  >
                    Dias Disponíveis para Agendamento
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)" },
                    gap: 1.5,
                  }}
                >
                  {DIAS_SEMANA.map((dia) => {
                    const isSelected = diasSelecionados.includes(dia);
                    return (
                      <Paper
                        key={dia}
                        elevation={0}
                        onClick={() => handleToggleDia(dia)}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: isSelected
                            ? "2px solid #1A56DB"
                            : "1px solid #E5E7EB",
                          backgroundColor: isSelected ? "#EFF6FF" : "#FFFFFF",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          "&:hover": {
                            borderColor: "#1A56DB",
                            backgroundColor: isSelected ? "#EFF6FF" : "#F9FAFB",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "14px",
                            color: isSelected ? "#1A56DB" : "#111827",
                          }}
                        >
                          {dia}
                        </Typography>
                        {isSelected && (
                          <CheckCircleOutlineOutlinedIcon
                            sx={{ color: "#1A56DB", fontSize: 20 }}
                          />
                        )}
                      </Paper>
                    );
                  })}
                </Box>
              </Box>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  backgroundColor: "#EFF6FF",
                  border: "1px solid #BFDBFE",
                  borderRadius: 2,
                  mb: 3,
                }}
              >
                <Typography
                  sx={{ color: "#1E40AF", fontSize: "14px", fontWeight: 500 }}
                >
                  Os pacientes só poderão agendar retiradas nos dias
                  selecionados para este medicamento
                </Typography>
              </Paper>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  startIcon={<SaveOutlined />}
                  onClick={handleOpenConfirmDisponibilidade}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    backgroundColor: "#1A56DB",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#1E40AF",
                      boxShadow: "none",
                    },
                  }}
                >
                  Salvar Disponibilidade
                </Button>
              </Box>
            </Paper>
          </Box>
        </TabPanel>

        {/* ==================== ABA 4: AGENDAMENTOS ==================== */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Agendamentos
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Visualize e gerencie os agendamentos de retirada
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
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {agendamentos.map((agendamento) => (
                  <Paper
                    key={agendamento.id}
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
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "1fr",
                            md: "280px 1fr 1fr",
                          },
                          alignItems: "flex-end",
                          gap: 3,
                          flex: 1,
                        }}
                      >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1.5,
                            }}
                          >
                            <PersonOutlineOutlinedIcon
                              sx={{ fontSize: 18, color: "#9CA3AF" }}
                            />
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: "15px",
                                color: "#111827",
                              }}
                            >
                              {agendamento.nome}
                            </Typography>

                            <Chip
                              label={agendamento.status}
                              size="small"
                              sx={{
                                backgroundColor:
                                  agendamento.status === "Confirmado"
                                    ? "#ECFDF5"
                                    : "#FEF3C7",
                                color:
                                  agendamento.status === "Confirmado"
                                    ? "#059669"
                                    : "#D97706",
                                fontWeight: 600,
                                fontSize: "12px",
                                borderRadius: "12px",
                                height: 22,
                                ml: 0.5,
                              }}
                            />
                          </Box>

                          <Box>
                            <Typography
                              sx={{
                                fontSize: "12px",
                                color: "#9CA3AF",
                                mb: 0.3,
                              }}
                            >
                              Medicamento
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.8,
                              }}
                            >
                              <InboxOutlined
                                sx={{ fontSize: 18, color: "#6B7280" }}
                              />
                              <Typography
                                sx={{
                                  fontWeight: 600,
                                  fontSize: "14px",
                                  color: "#111827",
                                }}
                              >
                                {agendamento.medicamento}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        <Box>
                          <Typography
                            sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.3 }}
                          >
                            Data e Horário
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.8,
                            }}
                          >
                            <CalendarTodayOutlined
                              sx={{ fontSize: 18, color: "#6B7280" }}
                            />
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "14px",
                                color: "#111827",
                              }}
                            >
                              {agendamento.data} às {agendamento.horario}
                            </Typography>
                          </Box>
                        </Box>

                        <Box>
                          <Typography
                            sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.3 }}
                          >
                            Quantidade
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "14px",
                              color: "#111827",
                              py: "2px",
                            }}
                          >
                            {agendamento.quantidade}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Botões de Ação na Aba Agendamentos */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: 0.8,
                          minWidth: 110,
                        }}
                      >
                        {agendamento.status === "Pendente" && (
                          <Button
                            size="small"
                            startIcon={
                              <CheckCircleOutlineOutlinedIcon
                                sx={{ fontSize: "14px !important" }}
                              />
                            }
                            onClick={() =>
                              handleConfirmarAgendamento(agendamento.id)
                            }
                            sx={{
                              textTransform: "none",
                              fontSize: "12px",
                              fontWeight: 600,
                              backgroundColor: "#ECFDF5",
                              color: "#059669",
                              borderRadius: "12px",
                              px: 2,
                              py: 0.3,
                              boxShadow: "none",
                              width: "100%",
                              justifyContent: "center",
                              "&:hover": {
                                backgroundColor: "#D1FAE5",
                                boxShadow: "none",
                              },
                            }}
                          >
                            Confirmar
                          </Button>
                        )}

                        <Button
                          size="small"
                          onClick={() => handleOpenModalPresenca(agendamento)}
                          sx={{
                            textTransform: "none",
                            fontSize: "12px",
                            fontWeight: 600,
                            backgroundColor: "#EFF6FF",
                            color: "#1A56DB",
                            borderRadius: "12px",
                            px: 2,
                            py: 0.3,
                            boxShadow: "none",
                            width: "100%",
                            justifyContent: "center",
                            "&:hover": {
                              backgroundColor: "#DBEAFE",
                              boxShadow: "none",
                            },
                          }}
                        >
                          Presença
                        </Button>

                        <Button
                          size="small"
                          onClick={() => handleOpenModalFalta(agendamento)}
                          startIcon={
                            <Typography
                              component="span"
                              sx={{ fontSize: "13px", fontWeight: "bold" }}
                            >
                              ×
                            </Typography>
                          }
                          sx={{
                            textTransform: "none",
                            fontSize: "12px",
                            fontWeight: 600,
                            backgroundColor: "#FEF2F2",
                            color: "#EF4444",
                            borderRadius: "12px",
                            px: 2,
                            py: 0.3,
                            boxShadow: "none",
                            width: "100%",
                            justifyContent: "center",
                            "&:hover": {
                              backgroundColor: "#FEE2E2",
                              boxShadow: "none",
                            },
                          }}
                        >
                          Falta
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Paper>
          </Box>
        </TabPanel>
      </Paper>

      {/* ==================== MODAL 1: DETALHES DO PACIENTE ==================== */}
      <Dialog
        open={modalPacDetalhesOpen}
        onClose={handleCloseModalPacDetalhes}
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
            Detalhes do Paciente
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
                  Próxima Retirada
                </Typography>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "14px", color: "#111827" }}
                >
                  {pacienteSelecionado.proximaRetirada}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 1, justifyContent: "flex-end" }}>
          <Button
            onClick={handleCloseModalPacDetalhes}
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

      {/* ==================== MODAL 2: DETALHES DO MEDICAMENTO ==================== */}
      <Dialog
        open={modalMedDetalhesOpen}
        onClose={handleCloseModalMedDetalhes}
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
            Detalhes do Medicamento
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 2.5, py: 1.5 }}>
          {medicamentoDetalhes && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                  value={medicamentoDetalhes.nome}
                  disabled
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: "#F9FAFB",
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#374151",
                    mb: 0.5,
                  }}
                >
                  Status
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={
                    medicamentoDetalhes.disponivel
                      ? "Disponível"
                      : "Indisponível"
                  }
                  disabled
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: "#F9FAFB",
                    },
                  }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 1, justifyContent: "flex-end", gap: 1 }}>
          <Button
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "10px",
              px: 2.5,
              py: 0.6,
              backgroundColor: "#1F2937",
              color: "#FFFFFF",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#111827",
                boxShadow: "none",
              },
            }}
          >
            Preview
          </Button>

          <Button
            onClick={handleCloseModalMedDetalhes}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "10px",
              px: 2.5,
              py: 0.6,
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
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      {/* ==================== MODAL 3: CONFIRMAÇÃO DE STATUS (MARCAR INDISPONÍVEL) ==================== */}
      <Dialog
        open={modalConfirmStatusOpen}
        onClose={handleCloseConfirmStatus}
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
            Confirmar Alteração
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 2.5, py: 1 }}>
          {medicamentoParaAlterar && (
            <Typography
              sx={{ fontSize: "14px", color: "#4B5563", lineHeight: 1.5 }}
            >
              Tem certeza que deseja marcar{" "}
              <strong>{medicamentoParaAlterar.nome}</strong> como{" "}
              <strong>
                {medicamentoParaAlterar.disponivel
                  ? "Indisponível"
                  : "Disponível"}
              </strong>
              ?
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 1, justifyContent: "flex-end", gap: 1 }}>
          <Button
            onClick={handleCloseConfirmStatus}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "10px",
              px: 2.5,
              py: 0.6,
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
            onClick={handleConfirmarAlteracaoStatus}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "10px",
              px: 2.5,
              py: 0.6,
              backgroundColor: medicamentoParaAlterar?.disponivel
                ? "#EF4444"
                : "#10B981",
              color: "#FFFFFF",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: medicamentoParaAlterar?.disponivel
                  ? "#DC2626"
                  : "#059669",
                boxShadow: "none",
              },
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* ==================== MODAL 4: CONFIRMAÇÃO DE SALVAR DISPONIBILIDADE (ABA 3) ==================== */}
      <Dialog
        open={modalConfirmDisponibilidadeOpen}
        onClose={handleCloseConfirmDisponibilidade}
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
            Salvar Disponibilidade
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 2.5, py: 1 }}>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#4B5563",
              lineHeight: 1.5,
              mb: 1.5,
            }}
          >
            Deseja salvar os dias de agendamento para{" "}
            <strong>{medicamentoSelecionado}</strong>?
          </Typography>

          <Typography
            sx={{
              fontSize: "13px",
              color: "#6B7280",
              fontWeight: 500,
              mb: 0.5,
            }}
          >
            Dias selecionados:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
            {diasSelecionados.length > 0 ? (
              diasSelecionados.map((dia) => (
                <Chip
                  key={dia}
                  label={dia}
                  size="small"
                  sx={{
                    backgroundColor: "#EFF6FF",
                    color: "#1A56DB",
                    fontWeight: 600,
                    fontSize: "12px",
                    borderRadius: "6px",
                  }}
                />
              ))
            ) : (
              <Typography
                sx={{ fontSize: "13px", color: "#EF4444", italic: true }}
              >
                Nenhum dia selecionado
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 1, justifyContent: "flex-end", gap: 1 }}>
          <Button
            onClick={handleCloseConfirmDisponibilidade}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "10px",
              px: 2.5,
              py: 0.6,
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
            onClick={handleSalvarDisponibilidadeFinal}
            startIcon={<CheckIcon sx={{ fontSize: "16px !important" }} />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "10px",
              px: 2.5,
              py: 0.6,
              backgroundColor: "#1A56DB",
              color: "#FFFFFF",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#1E40AF",
                boxShadow: "none",
              },
            }}
          >
            Confirmar e Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* ==================== MODAL 5: REGISTRAR PRESENÇA (ABA 4) ==================== */}
      <Dialog
        open={modalPresencaOpen}
        onClose={handleCloseModalPresenca}
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
            Registrar Presença
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 2.5, py: 1.5 }}>
          {agendamentoPresenca && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Paciente Read-only */}
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
                  value={agendamentoPresenca.nome}
                  disabled
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: "#F9FAFB",
                    },
                  }}
                />
              </Box>

              {/* Responsável Acompanhante */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#374151",
                    mb: 0.5,
                  }}
                >
                  Responsável Acompanhante (se houver)
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Nome do responsável"
                  value={responsavelAcompanhante}
                  onChange={(e) => setResponsavelAcompanhante(e.target.value)}
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

              {/* Quantidade Entregue */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#374151",
                    mb: 0.5,
                  }}
                >
                  Quantidade Entregue
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={quantidadeEntregue}
                  onChange={(e) => setQuantidadeEntregue(e.target.value)}
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

              {/* Data da Retirada */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#374151",
                    mb: 0.5,
                  }}
                >
                  Data da Retirada
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={dataRetirada}
                  onChange={(e) => setDataRetirada(e.target.value)}
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

        <DialogActions
          sx={{ p: 2.5, pt: 1, justifyContent: "flex-end", gap: 1 }}
        >
          <Button
            onClick={handleCloseModalPresenca}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "10px",
              px: 2.5,
              py: 0.6,
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
            onClick={handleConfirmarPresenca}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "10px",
              px: 3,
              py: 0.6,
              backgroundColor: "#1A56DB",
              color: "#FFFFFF",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#1E40AF",
                boxShadow: "none",
              },
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* ==================== MODAL 6: REGISTRAR FALTA (ABA 4) ==================== */}
      <Dialog
        open={modalFaltaOpen}
        onClose={handleCloseModalFalta}
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
            Registrar Falta
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 2.5, py: 1.5 }}>
          {agendamentoFalta && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Paciente Read-only */}
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
                  value={agendamentoFalta.nome}
                  disabled
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: "#F9FAFB",
                    },
                  }}
                />
              </Box>

              {/* Banner de Aviso Amarelo */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  backgroundColor: "#FFFBEB",
                  border: "1px solid #FDE68A",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  sx={{ fontSize: "13px", color: "#D97706", lineHeight: 1.5 }}
                >
                  O paciente receberá uma notificação para justificar a ausência
                  e realizar um novo agendamento.
                </Typography>
              </Paper>
            </Box>
          )}
        </DialogContent>

        <DialogActions
          sx={{ p: 2.5, pt: 1, justifyContent: "flex-end", gap: 1 }}
        >
          <Button
            onClick={handleCloseModalFalta}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "10px",
              px: 2.5,
              py: 0.6,
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
            onClick={handleConfirmarFalta}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "10px",
              px: 3,
              py: 0.6,
              backgroundColor: "#DC2626",
              color: "#FFFFFF",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#B91C1C",
                boxShadow: "none",
              },
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FarmaciaDashboard;
