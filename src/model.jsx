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
  CheckCircleOutline,
  SaveOutlined,
} from "@mui/icons-material";

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
            {/* Cabeçalho */}
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

            {/* Campo de Busca */}
            <TextField
              fullWidth
              placeholder="Buscar paciente..."
              value={searchPaciente}
              onChange={(e) => setSearchPaciente(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#9CA3AF" }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Tabela de Pacientes */}
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ border: "1px solid #E5E7EB", borderRadius: 2 }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#6B7280",
                        fontSize: "13px",
                      }}
                    >
                      NOME
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#6B7280",
                        fontSize: "13px",
                      }}
                    >
                      MEDICAMENTO
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#6B7280",
                        fontSize: "13px",
                      }}
                    >
                      STATUS
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#6B7280",
                        fontSize: "13px",
                      }}
                    >
                      PRÓXIMA RETIRADA
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#6B7280",
                        fontSize: "13px",
                      }}
                    >
                      AÇÕES
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPacientes.map((paciente) => (
                    <TableRow key={paciente.id} hover>
                      <TableCell sx={{ fontWeight: 500, color: "#111827" }}>
                        {paciente.nome}
                      </TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>
                        {paciente.medicamento}
                      </TableCell>
                      <TableCell>{getStatusChip(paciente.status)}</TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>
                        {paciente.proximaRetirada}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          startIcon={
                            <VisibilityOutlined sx={{ fontSize: 16 }} />
                          }
                          sx={{
                            textTransform: "none",
                            fontSize: "12px",
                            fontWeight: 600,
                            backgroundColor: "#EFF6FF",
                            color: "#1A56DB",
                            borderRadius: 2,
                            px: 1.5,
                            "&:hover": { backgroundColor: "#DBEAFE" },
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
          </Box>
        </TabPanel>

        {/* ==================== ABA 2: LISTA DE MEDICAMENTOS ==================== */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3, pb: 3 }}>
            {/* Cabeçalho */}
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

            {/* Campo de Busca */}
            <TextField
              fullWidth
              placeholder="Buscar medicamento..."
              value={searchMedicamento}
              onChange={(e) => setSearchMedicamento(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#9CA3AF" }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Grid de Cards - 3 Colunas */}
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
                <Card
                  key={med.id}
                  elevation={0}
                  sx={{
                    border: "1px solid #E5E7EB",
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#D1D5DB",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.5, pb: 2 }}>
                    {/* Ícone + Nome + Status */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          backgroundColor: med.disponivel
                            ? "#EFF6FF"
                            : "#FEF2F2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <LinkOutlined
                          sx={{
                            color: med.disponivel ? "#1A56DB" : "#EF4444",
                            fontSize: 24,
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "15px",
                            color: "#111827",
                            mb: 0.5,
                          }}
                        >
                          {med.nome}
                        </Typography>
                        {getStatusChip(
                          med.disponivel ? "Disponível" : "Indisponível",
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ p: 2, justifyContent: "space-between" }}>
                    <Button
                      size="small"
                      sx={{
                        textTransform: "none",
                        fontSize: "12px",
                        fontWeight: 600,
                        backgroundColor: "#EFF6FF",
                        color: "#1A56DB",
                        borderRadius: 2,
                        px: 2,
                        "&:hover": { backgroundColor: "#DBEAFE" },
                      }}
                    >
                      Detalhes
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleToggleDisponibilidade(med.id)}
                      sx={{
                        textTransform: "none",
                        fontSize: "12px",
                        fontWeight: 600,
                        backgroundColor: med.disponivel ? "#FEF2F2" : "#ECFDF5",
                        color: med.disponivel ? "#EF4444" : "#10B981",
                        borderRadius: 2,
                        px: 2,
                        "&:hover": {
                          backgroundColor: med.disponivel
                            ? "#FEE2E2"
                            : "#D1FAE5",
                        },
                      }}
                    >
                      {med.disponivel
                        ? "Marcar Indisponível"
                        : "Marcar Disponível"}
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
          </Box>
        </TabPanel>

        {/* ==================== ABA 3: DISPONIBILIDADE ==================== */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ px: 3, pb: 3 }}>
            {/* Cabeçalho */}
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

            {/* Paper Principal */}
            <Paper
              elevation={0}
              sx={{ p: 3, border: "1px solid #E5E7EB", borderRadius: 2 }}
            >
              {/* Select de Medicamento */}
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

              {/* Seção de Dias */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <CalendarTodayOutlined
                    sx={{ color: "#1A56DB", fontSize: 20 }}
                  />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "15px", color: "#111827" }}
                  >
                    Dias Disponíveis para Agendamento
                  </Typography>
                </Box>

                {/* Grid de Dias - 2 Colunas */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, 1fr)",
                    },
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
                          <CheckCircleOutline
                            sx={{ color: "#1A56DB", fontSize: 20 }}
                          />
                        )}
                      </Paper>
                    );
                  })}
                </Box>
              </Box>

              {/* Banner Azul de Rodapé */}
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
                  selecionados para este medicamento.
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
            {/* Cabeçalho */}
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

            {/* Lista de Cards - 100% largura */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {agendamentos.map((agendamento) => (
                <Card
                  key={agendamento.id}
                  elevation={0}
                  sx={{
                    width: "100%",
                    border: "1px solid #E5E7EB",
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    "&:hover": { borderColor: "#D1D5DB" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 2,
                      }}
                    >
                      {/* Informações do Paciente */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                          flexWrap: "wrap",
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
                            {agendamento.nome}
                          </Typography>
                          {getStatusChip(agendamento.status)}
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        <Box>
                          <Typography
                            sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
                          >
                            Medicamento
                          </Typography>
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
                        <Divider orientation="vertical" flexItem />
                        <Box>
                          <Typography
                            sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
                          >
                            Data e Horário
                          </Typography>
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
                        <Divider orientation="vertical" flexItem />
                        <Box>
                          <Typography
                            sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}
                          >
                            Quantidade
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "14px",
                              color: "#111827",
                            }}
                          >
                            {agendamento.quantidade}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Botões de Ação */}
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {agendamento.status === "Pendente" && (
                          <Button
                            size="small"
                            onClick={() =>
                              handleConfirmarAgendamento(agendamento.id)
                            }
                            sx={{
                              textTransform: "none",
                              fontSize: "12px",
                              fontWeight: 600,
                              backgroundColor: "#ECFDF5",
                              color: "#059669",
                              borderRadius: "20px",
                              px: 2,
                              "&:hover": { backgroundColor: "#D1FAE5" },
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
                            borderRadius: "20px",
                            px: 2,
                            "&:hover": { backgroundColor: "#DBEAFE" },
                          }}
                        >
                          Presença
                        </Button>
                        <Button
                          size="small"
                          sx={{
                            textTransform: "none",
                            fontSize: "12px",
                            fontWeight: 600,
                            backgroundColor: "#FEF2F2",
                            color: "#EF4444",
                            borderRadius: "20px",
                            px: 2,
                            "&:hover": { backgroundColor: "#FEE2E2" },
                          }}
                        >
                          Falta
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default FarmaciaDashboard;
