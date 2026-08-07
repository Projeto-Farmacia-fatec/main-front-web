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
  Card,
  CardContent,
  CardActions,
  Divider,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {
  PeopleAltOutlined,
  LinkOutlined,
  CalendarTodayOutlined,
  InboxOutlined,
  Search as SearchIcon,
  VisibilityOutlined,
  SaveOutlined,
  People,
} from "@mui/icons-material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";

// Dados mockados para Pacientes
const PACIENTES_MOCK = [
  {
    id: 1,
    nome: "João Silva",
    medicamento: "Losartana 50mg",
    status: "Ativo",
    proximaRetirada: "04/05/2026",
  },
  {
    id: 2,
    nome: "Maria Santos",
    medicamento: "Metformina 850mg",
    status: "Ativo",
    proximaRetirada: "11/05/2026",
  },
  {
    id: 3,
    nome: "Pedro Alves",
    medicamento: "Sinvastatina 20mg",
    status: "Inativo",
    proximaRetirada: "-",
  },
];

// Dados mockados para Medicamentos
const MEDICAMENTOS_INICIAIS = [
  {
    id: 1,
    nome: "Losartana 50mg",
    disponivel: true,
  },
  {
    id: 2,
    nome: "Metformina 850mg",
    disponivel: true,
  },
  {
    id: 3,
    nome: "Sinvastatina 20mg",
    disponivel: true,
  },
  {
    id: 4,
    nome: "Enalapril 10mg",
    disponivel: false,
  },
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

  // Estados da Aba 2: Medicamentos
  const [searchMedicamento, setSearchMedicamento] = useState("");
  const [medicamentos, setMedicamentos] = useState(MEDICAMENTOS_INICIAIS);

  // Estados da Aba 3: Disponibilidade
  const [medicamentoSelecionado, setMedicamentoSelecionado] =
    useState("Losartana 50mg");
  const [diasSelecionados, setDiasSelecionados] = useState([
    "Segunda-feira",
    "Quarta-feira",
    "Sexta-feira",
  ]);

  // Estados da Aba 4: Agendamentos
  const [agendamentos, setAgendamentos] = useState(AGENDAMENTOS_INICIAIS);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleToggleDisponibilidade = (id) => {
    setMedicamentos(
      medicamentos.map((med) =>
        med.id === id ? { ...med, disponivel: !med.disponivel } : med,
      ),
    );
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

  const getStatusChip = (status) => {
    const configs = {
      Ativo: { bg: "#ECFDF5", color: "#059669", dot: "#10B981" },
      Inativo: { bg: "#FDF2F8", color: "#BE185D", dot: "#EC4899" },
      Confirmado: { bg: "#ECFDF5", color: "#059669", dot: "#10B981" },
      Pendente: { bg: "#FEF3C7", color: "#D97706", dot: "#F59E0B" },
      Disponível: { bg: "#ECFDF5", color: "#059669", dot: "#10B981" },
      Indisponível: { bg: "#FDF2F8", color: "#BE185D", dot: "#EC4899" },
    };

    const config = configs[status] || configs.Ativo;

    return (
      <Chip
        label={status}
        size="small"
        icon={
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: config.dot,
              ml: 1,
            }}
          />
        }
        sx={{
          backgroundColor: config.bg,
          color: config.color,
          fontWeight: 600,
          fontSize: "12px",
          borderRadius: 2,
        }}
      />
    );
  };

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
            icon={<PeopleAltOutlined sx={{ fontsize: 20 }} />}
            label="Pacientes"
            iconPosition="start"
          />
          <Tab
            icon={<LinkOutlined sx={{ fontsize: 20 }} />}
            label="Lista de Medicamentos"
            iconPosition="start"
          />
          <Tab
            icon={<CalendarTodayOutlined sx={{ fontsize: 20 }} />}
            label="Disponibilidade"
            iconPosition="start"
          />
          <Tab
            icon={<InboxOutlined sx={{ fontsize: 20 }} />}
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

            {/* Paper Card Único envolvendo Busca + Tabela */}
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                backgroundColor: "#FFFFFF",
              }}
            >
              {/* Campo de Busca de Largura Total */}
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

              {/* Tabela de Pacientes Integrada */}
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
                        {/* Nome com Ícone de Usuário */}
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

            {/* Paper Envolvedor Único */}
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                backgroundColor: "#FFFFFF",
              }}
            >
              {/* Campo de Busca de Largura Total */}
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

              {/* Grid de Cards (3 Colunas em Desktops) */}
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
                    {/* Topo do Card: Ícone + Nome + Chip */}
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

                    {/* Rodapé do Card: Botões */}
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      <Button
                        fullWidth
                        size="small"
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
                        onClick={() => handleToggleDisponibilidade(med.id)}
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
                Defina os dias disponiveis para agendamento de cada medicamento
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
                    Dias Disponivais para Agendamento
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

              {/* Botão Salvar */}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  startIcon={<SaveOutlined />}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    backgroundColor: "#1A56DB",
                    "&:hover": { backgroundColor: "#1E40AF" },
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

            {/* Paper Container Envolvedor */}
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
                      {/* Grid das Colunas com espaçamento uniforme e alinhamento na base */}
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "1fr",
                            md: "280px 1fr 1fr",
                          },
                          alignItems: "flex-end", // Garante o alinhamento na linha do remédio
                          gap: 3,
                          flex: 1,
                        }}
                      >
                        {/* Coluna 1: Paciente e Medicamento */}
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          {/* Nome do Paciente + Status */}
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

                          {/* Medicamento */}
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

                        {/* Coluna 2: Data e Horário (Alinhado com a linha do Medicamento) */}
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

                        {/* Coluna 3: Quantidade (Alinhado com a linha do Medicamento) */}
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
                              py: "2px", // Compensa o tamanho dos ícones ao lado para manter a linha perfeita
                            }}
                          >
                            {agendamento.quantidade}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Coluna de Ações na Extrema Direita */}
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
    </Box>
  );
};

export default FarmaciaDashboard;
