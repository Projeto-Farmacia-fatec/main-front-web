import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
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
} from "@mui/material";
import {
  PersonAddOutlined,
  GroupAddOutlined,
  LinkOutlined,
  PeopleAltOutlined,
  ShowChartOutlined,
  AssessmentOutlined,
  Search as SearchIcon,
  Download as DownloadIcon,
  DescriptionOutlined as DocumentIcon,
  CalendarTodayOutlined as CalendarIcon,
} from "@mui/icons-material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

// Mocks
const USUARIOS_MOCK = [
  {
    id: 1,
    nome: "João Silva",
    cpf: "123.456.789-00",
    tipo: "Paciente",
    email: "joao.silva@email.com",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Maria Santos",
    cpf: "987.654.321-00",
    tipo: "Paciente",
    email: "maria.santos@email.com",
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Carlos Oliveira",
    cpf: "456.789.123-00",
    tipo: "Funcionário - Farmácia",
    email: "carlos.oliveira@email.com",
    status: "Ativo",
  },
  {
    id: 4,
    nome: "Ana Costa",
    cpf: "789.123.456-00",
    tipo: "Funcionário - UBS",
    email: "ana.costa@email.com",
    status: "Ativo",
  },
];

const TRATAMENTOS_MOCK = [
  {
    id: 1,
    paciente: "João Silva",
    medicamento: "Losartana 50mg",
    inicio: "14/10/2025",
    status: "Ativo",
  },
  {
    id: 2,
    paciente: "Maria Santos",
    medicamento: "Metformina 850mg",
    inicio: "19/01/2026",
    status: "Ativo",
  },
  {
    id: 3,
    paciente: "Pedro Alves",
    medicamento: "Sinvastatina 20mg",
    inicio: "31/10/2025",
    status: "Ativo",
  },
  {
    id: 4,
    paciente: "Ana Costa",
    medicamento: "Enalapril 10mg",
    inicio: "09/08/2025",
    status: "Inativo",
  },
];

const RELATORIOS_MOCK = {
  semanal: [
    {
      id: 1,
      titulo: "Relatório Semanal - 22 a 28 de Abril",
      data: "27/04/2026",
      retiradas: 45,
      novosPacientes: 3,
    },
    {
      id: 2,
      titulo: "Relatório Semanal - 15 a 21 de Abril",
      data: "20/04/2026",
      retiradas: 38,
      novosPacientes: 5,
    },
  ],
  mensal: [
    {
      id: 1,
      titulo: "Relatório Mensal - Abril 2026",
      data: "30/04/2026",
      retiradas: 180,
      novosPacientes: 12,
    },
  ],
  anual: [
    {
      id: 1,
      titulo: "Relatório Anual - 2026",
      data: "31/12/2026",
      retiradas: 2100,
      novosPacientes: 95,
    },
  ],
};

const MEDICAMENTOS_DISPONIVEIS = [
  "Losartana 50mg",
  "Metformina 850mg",
  "Sinvastatina 20mg",
  "Enalapril 10mg",
  "Omeprazol 20mg",
];

const TIPOS_ACESSO = ["Farmácia Judicial", "Secretaria de Saúde", "UBS"];
const STATUS_FILTRO = ["Todos os Status", "Ativo", "Inativo"];

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

const SecretariaDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  // Estados dos Formulários
  const [pacienteForm, setPacienteForm] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    email: "",
    telefone: "",
    senha: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "Franco da Rocha",
    estado: "SP",
    responsavelNome: "",
    responsavelCpf: "",
    responsavelTelefone: "",
    medicamento: "",
    quantidade: "",
    dataInicio: "",
    duracao: "",
  });

  const [funcionarioForm, setFuncionarioForm] = useState({
    nome: "",
    cpf: "",
    tipoAcesso: "",
    senha: "",
  });

  const [medicamentoForm, setMedicamentoForm] = useState({ nome: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuarios] = useState(USUARIOS_MOCK);
  const [tratamentoSearch, setTratamentoSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos os Status");
  const [tratamentos, setTratamentos] = useState(TRATAMENTOS_MOCK);
  const [tipoRelatorio, setTipoRelatorio] = useState("semanal");

  // --- Modais Aba 4 (Gerenciar Usuários) ---
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [editNome, setEditNome] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [modalConfirmInativarUserOpen, setModalConfirmInativarUserOpen] =
    useState(false);
  const [usuarioParaInativar, setUsuarioParaInativar] = useState(null);

  // --- Modais Aba 5 (Controle de Tratamento) ---
  const [modalConfirmTratamentoOpen, setModalConfirmTratamentoOpen] =
    useState(false);
  const [tratamentoParaAlterar, setTratamentoParaAlterar] = useState(null);

  // --- Modais Aba 6 (Relatórios) ---
  const [modalDownloadRelatorioOpen, setModalDownloadRelatorioOpen] =
    useState(false);
  const [relatorioParaDownload, setRelatorioParaDownload] = useState(null);

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handlePacienteFormChange = (field) => (event) =>
    setPacienteForm({ ...pacienteForm, [field]: event.target.value });

  const handleFuncionarioFormChange = (field) => (event) =>
    setFuncionarioForm({ ...funcionarioForm, [field]: event.target.value });

  // Handlers para Editar Usuário (Aba 4)
  const handleOpenModalEdit = (usuario) => {
    setUsuarioEditando(usuario);
    setEditNome(usuario.nome);
    setEditEmail(usuario.email);
    setModalEditOpen(true);
  };

  const handleCloseModalEdit = () => {
    setModalEditOpen(false);
    setUsuarioEditando(null);
  };

  const handleSalvarEdicao = () => {
    if (usuarioEditando) {
      setUsuarios(
        usuarios.map((u) =>
          u.id === usuarioEditando.id
            ? { ...u, nome: editNome, email: editEmail }
            : u,
        ),
      );
    }
    handleCloseModalEdit();
  };

  // Handlers para Inativar/Ativar Usuário (Aba 4)
  const handleOpenConfirmInativarUser = (usuario) => {
    setUsuarioParaInativar(usuario);
    setModalConfirmInativarUserOpen(true);
  };

  const handleCloseConfirmInativarUser = () => {
    setModalConfirmInativarUserOpen(false);
    setUsuarioParaInativar(null);
  };

  const handleConfirmarInativacaoUser = () => {
    if (usuarioParaInativar) {
      setUsuarios(
        usuarios.map((u) =>
          u.id === usuarioParaInativar.id
            ? { ...u, status: u.status === "Ativo" ? "Inativo" : "Ativo" }
            : u,
        ),
      );
    }
    handleCloseConfirmInativarUser();
  };

  // Handlers para Inativar/Ativar Tratamento (Aba 5)
  const handleOpenConfirmTratamento = (tratamento) => {
    setTratamentoParaAlterar(tratamento);
    setModalConfirmTratamentoOpen(true);
  };

  const handleCloseConfirmTratamento = () => {
    setModalConfirmTratamentoOpen(false);
    setTratamentoParaAlterar(null);
  };

  const handleConfirmarAlteracaoTratamento = () => {
    if (tratamentoParaAlterar) {
      setTratamentos(
        tratamentos.map((t) =>
          t.id === tratamentoParaAlterar.id
            ? { ...t, status: t.status === "Ativo" ? "Inativo" : "Ativo" }
            : t,
        ),
      );
    }
    handleCloseConfirmTratamento();
  };

  // Handlers para Download de Relatório (Aba 6)
  const handleOpenDownloadRelatorio = (relatorio) => {
    setRelatorioParaDownload(relatorio);
    setModalDownloadRelatorioOpen(true);
  };

  const handleCloseDownloadRelatorio = () => {
    setModalDownloadRelatorioOpen(false);
    setRelatorioParaDownload(null);
  };

  const handleConfirmarDownloadRelatorio = () => {
    // Simulação do download
    handleCloseDownloadRelatorio();
  };

  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.cpf.includes(searchTerm),
  );

  const filteredTratamentos = tratamentos.filter((t) => {
    const matchSearch =
      t.paciente.toLowerCase().includes(tratamentoSearch.toLowerCase()) ||
      t.medicamento.toLowerCase().includes(tratamentoSearch.toLowerCase());
    const matchStatus =
      statusFilter === "Todos os Status" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const relatorios = RELATORIOS_MOCK[tipoRelatorio] || [];

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
            icon={<PersonAddOutlined sx={{ fontSize: 20 }} />}
            label="Cadastrar Paciente"
            iconPosition="start"
          />
          <Tab
            icon={<GroupAddOutlined sx={{ fontSize: 20 }} />}
            label="Cadastrar Funcionário"
            iconPosition="start"
          />
          <Tab
            icon={<LinkOutlined sx={{ fontSize: 20 }} />}
            label="Cadastrar Medicamentos"
            iconPosition="start"
          />
          <Tab
            icon={<PeopleAltOutlined sx={{ fontSize: 20 }} />}
            label="Gerenciar Usuários"
            iconPosition="start"
          />
          <Tab
            icon={<ShowChartOutlined sx={{ fontSize: 20 }} />}
            label="Controle de Tratamento"
            iconPosition="start"
          />
          <Tab
            icon={<AssessmentOutlined sx={{ fontSize: 20 }} />}
            label="Relatórios"
            iconPosition="start"
          />
        </Tabs>

        {/* ==================== ABA 1: CADASTRAR PACIENTE ==================== */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Cadastro de Paciente
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Preencha os dados do paciente para cadastrá-lo no sistema
              </Typography>
            </Box>

            {(() => {
              const fieldStyle = {
                backgroundColor: "#FFFFFF",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#FFFFFF",
                  "& fieldset": { borderColor: "#E5E7EB" },
                  "&:hover fieldset": { borderColor: "#D1D5DB" },
                  "&.Mui-focused fieldset": { borderColor: "#1A56DB" },
                },
              };

              const labelStyle = {
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                mb: 0.8,
              };

              return (
                <>
                  {/* Bloco 1: Dados Pessoais */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      border: "1px solid #E5E7EB",
                      borderRadius: 3,
                      mb: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#111827",
                        mb: 2.5,
                      }}
                    >
                      Dados Pessoais
                    </Typography>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        columnGap: 3,
                        rowGap: 2,
                      }}
                    >
                      <Box>
                        <Typography sx={labelStyle}>Nome Completo *</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          value={pacienteForm.nome}
                          onChange={handlePacienteFormChange("nome")}
                          sx={fieldStyle}
                        />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>CPF *</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="000.000.000-00"
                          value={pacienteForm.cpf}
                          onChange={handlePacienteFormChange("cpf")}
                          sx={fieldStyle}
                        />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>
                          Data de Nascimento *
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          type="date"
                          value={pacienteForm.dataNascimento}
                          onChange={handlePacienteFormChange("dataNascimento")}
                          sx={fieldStyle}
                        />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>E-mail *</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          type="email"
                          value={pacienteForm.email}
                          onChange={handlePacienteFormChange("email")}
                          sx={fieldStyle}
                        />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>Telefone *</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="(00) 00000-0000"
                          value={pacienteForm.telefone}
                          onChange={handlePacienteFormChange("telefone")}
                          sx={fieldStyle}
                        />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>
                          Senha de Acesso *
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          type="password"
                          value={pacienteForm.senha}
                          onChange={handlePacienteFormChange("senha")}
                          sx={fieldStyle}
                        />
                        <Typography
                          sx={{ fontSize: "12px", color: "#9CA3AF", mt: 0.5 }}
                        >
                          Senha para acesso ao sistema
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>

                  {/* Bloco 2: Endereço */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      border: "1px solid #E5E7EB",
                      borderRadius: 3,
                      mb: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#111827",
                        mb: 2.5,
                      }}
                    >
                      Endereço
                    </Typography>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        columnGap: 3,
                        rowGap: 2,
                      }}
                    >
                      <Box>
                        <Typography sx={labelStyle}>CEP *</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="00000-000"
                          value={pacienteForm.cep}
                          onChange={handlePacienteFormChange("cep")}
                          sx={fieldStyle}
                        />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>Logradouro *</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          value={pacienteForm.logradouro}
                          onChange={handlePacienteFormChange("logradouro")}
                          sx={fieldStyle}
                        />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>Bairro *</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          value={pacienteForm.bairro}
                          onChange={handlePacienteFormChange("bairro")}
                          sx={fieldStyle}
                        />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>Cidade *</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          value={pacienteForm.cidade}
                          onChange={handlePacienteFormChange("cidade")}
                          sx={fieldStyle}
                        />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>Estado *</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          value={pacienteForm.estado}
                          onChange={handlePacienteFormChange("estado")}
                          sx={fieldStyle}
                        />
                      </Box>
                    </Box>
                  </Paper>

                  {/* Bloco 3: Responsável */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      border: "1px solid #E5E7EB",
                      borderRadius: 3,
                      mb: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#111827",
                        mb: 2.5,
                      }}
                    >
                      Responsável
                    </Typography>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        columnGap: 3,
                        rowGap: 2,
                      }}
                    >
                      <Box>
                        <Typography sx={labelStyle}>
                          Nome do Responsável *
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          value={pacienteForm.responsavelNome}
                          onChange={handlePacienteFormChange("responsavelNome")}
                          sx={fieldStyle}
                        />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>
                          CPF do Responsável *
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="000.000.000-00"
                          value={pacienteForm.responsavelCpf}
                          onChange={handlePacienteFormChange("responsavelCpf")}
                          sx={fieldStyle}
                        />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>
                          Telefone do Responsável *
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="(00) 00000-0000"
                          value={pacienteForm.responsavelTelefone}
                          onChange={handlePacienteFormChange(
                            "responsavelTelefone",
                          )}
                          sx={fieldStyle}
                        />
                      </Box>
                    </Box>
                  </Paper>

                  {/* Bloco 4: Tratamento */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      border: "1px solid #E5E7EB",
                      borderRadius: 3,
                      mb: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#111827",
                        mb: 2.5,
                      }}
                    >
                      Tratamento
                    </Typography>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        columnGap: 3,
                        rowGap: 2,
                      }}
                    >
                      <Box>
                        <Typography sx={labelStyle}>Medicamento *</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          select
                          value={pacienteForm.medicamento}
                          onChange={handlePacienteFormChange("medicamento")}
                          sx={fieldStyle}
                        >
                          {MEDICAMENTOS_DISPONIVEIS.map((med) => (
                            <MenuItem key={med} value={med}>
                              {med}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>
                          Quantidade Necessária *
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          value={pacienteForm.quantidade}
                          onChange={handlePacienteFormChange("quantidade")}
                          sx={fieldStyle}
                        />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>
                          Data de Início do Tratamento *
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          type="date"
                          value={pacienteForm.dataInicio}
                          onChange={handlePacienteFormChange("dataInicio")}
                          sx={fieldStyle}
                        />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>
                          Duração do Tratamento (meses) *
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          value={pacienteForm.duracao}
                          onChange={handlePacienteFormChange("duracao")}
                          sx={fieldStyle}
                        />
                      </Box>
                    </Box>
                  </Paper>
                </>
              );
            })()}

            {/* Botões de Ação */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  borderColor: "#D1D5DB",
                  color: "#6B7280",
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  backgroundColor: "#1A56DB",
                }}
              >
                Cadastrar Paciente
              </Button>
            </Box>
          </Box>
        </TabPanel>

        {/* ==================== ABA 2: CADASTRAR FUNCIONÁRIO ==================== */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Cadastro de Funcionário
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Cadastre novos funcionários e defina seus níveis de acesso
              </Typography>
            </Box>

            {(() => {
              const fieldStyle = {
                backgroundColor: "#FFFFFF",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#FFFFFF",
                  "& fieldset": { borderColor: "#E5E7EB" },
                  "&:hover fieldset": { borderColor: "#D1D5DB" },
                  "&.Mui-focused fieldset": { borderColor: "#1A56DB" },
                },
              };

              const labelStyle = {
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                mb: 0.8,
              };

              return (
                <>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      border: "1px solid #E5E7EB",
                      borderRadius: 3,
                      mb: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#111827",
                        mb: 2.5,
                      }}
                    >
                      Dados do Funcionário
                    </Typography>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        columnGap: 3,
                        rowGap: 2.5,
                      }}
                    >
                      <Box sx={{ gridColumn: { xs: "span 1", md: "span 2" } }}>
                        <Typography sx={labelStyle}>Nome Completo *</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          value={funcionarioForm.nome}
                          onChange={handleFuncionarioFormChange("nome")}
                          sx={fieldStyle}
                        />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>CPF *</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="000.000.000-00"
                          value={funcionarioForm.cpf}
                          onChange={handleFuncionarioFormChange("cpf")}
                          sx={fieldStyle}
                        />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>
                          Tipo de Acesso *
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          select
                          value={funcionarioForm.tipoAcesso}
                          onChange={handleFuncionarioFormChange("tipoAcesso")}
                          sx={fieldStyle}
                        >
                          <MenuItem value="" disabled>
                            Selecione...
                          </MenuItem>
                          {TIPOS_ACESSO.map((tipo) => (
                            <MenuItem key={tipo} value={tipo}>
                              {tipo}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Box>
                    </Box>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      border: "1px solid #E5E7EB",
                      borderRadius: 3,
                      mb: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#111827",
                        mb: 2.5,
                      }}
                    >
                      Credenciais de Acesso
                    </Typography>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        columnGap: 3,
                        rowGap: 2,
                      }}
                    >
                      <Box sx={{ gridColumn: { xs: "span 1", md: "span 2" } }}>
                        <Typography sx={labelStyle}>Senha *</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          type="password"
                          value={funcionarioForm.senha}
                          onChange={handleFuncionarioFormChange("senha")}
                          sx={fieldStyle}
                        />
                        <Typography
                          sx={{ fontSize: "12px", color: "#9CA3AF", mt: 0.8 }}
                        >
                          O acesso será realizado através do CPF + senha
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </>
              );
            })()}

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  borderColor: "#D1D5DB",
                  color: "#6B7280",
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                startIcon={<GroupAddOutlined />}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  backgroundColor: "#1A56DB",
                }}
              >
                Cadastrar Funcionário
              </Button>
            </Box>
          </Box>
        </TabPanel>

        {/* ==================== ABA 3: CADASTRAR MEDICAMENTOS ==================== */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Cadastro de Medicamentos
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Adicione novos medicamentos ao sistema
              </Typography>
            </Box>

            {(() => {
              const fieldStyle = {
                backgroundColor: "#FFFFFF",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#FFFFFF",
                  "& fieldset": { borderColor: "#E5E7EB" },
                  "&:hover fieldset": { borderColor: "#D1D5DB" },
                  "&.Mui-focused fieldset": { borderColor: "#1A56DB" },
                },
              };

              const labelStyle = {
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                mb: 0.8,
              };

              return (
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    mb: 3,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "#111827",
                      mb: 2.5,
                    }}
                  >
                    Dados do Medicamento
                  </Typography>

                  <Box>
                    <Typography sx={labelStyle}>
                      Nome do Medicamento *
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Ex: Losartana 50mg"
                      value={medicamentoForm.nome}
                      onChange={(e) =>
                        setMedicamentoForm({ nome: e.target.value })
                      }
                      sx={fieldStyle}
                    />
                  </Box>
                </Paper>
              );
            })()}

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  borderColor: "#D1D5DB",
                  color: "#6B7280",
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                startIcon={<LinkOutlined />}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  backgroundColor: "#1A56DB",
                }}
              >
                Cadastrar Medicamento
              </Button>
            </Box>
          </Box>
        </TabPanel>

        {/* ==================== ABA 4: GERENCIAR USUÁRIOS ==================== */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Gerenciamento de Usuários
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Visualize e gerencie pacientes e funcionários cadastrados
              </Typography>
            </Box>

            <TextField
              fullWidth
              size="small"
              placeholder="Buscar por nome ou CPF..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ border: "1px solid #E5E7EB", borderRadius: 3 }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#6B7280",
                        fontSize: "12px",
                      }}
                    >
                      NOME
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#6B7280",
                        fontSize: "12px",
                      }}
                    >
                      CPF
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#6B7280",
                        fontSize: "12px",
                      }}
                    >
                      TIPO
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#6B7280",
                        fontSize: "12px",
                      }}
                    >
                      E-MAIL
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#6B7280",
                        fontSize: "12px",
                      }}
                    >
                      STATUS
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#6B7280",
                        fontSize: "12px",
                      }}
                    >
                      AÇÕES
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsuarios.map((usuario) => (
                    <TableRow
                      key={usuario.id}
                      hover
                      sx={{ borderBottom: "1px solid #F3F4F6" }}
                    >
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <PersonOutlineOutlinedIcon
                            sx={{ fontSize: 18, color: "#9CA3AF" }}
                          />
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "14px",
                              color: "#111827",
                            }}
                          >
                            {usuario.nome}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ color: "#4B5563", fontSize: "13px" }}>
                        {usuario.cpf}
                      </TableCell>

                      <TableCell sx={{ color: "#4B5563", fontSize: "13px" }}>
                        {usuario.tipo}
                      </TableCell>

                      <TableCell sx={{ color: "#4B5563", fontSize: "13px" }}>
                        {usuario.email}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={usuario.status}
                          size="small"
                          icon={
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                backgroundColor:
                                  usuario.status === "Ativo"
                                    ? "#10B981"
                                    : "#EF4444",
                                ml: 1,
                              }}
                            />
                          }
                          sx={{
                            backgroundColor:
                              usuario.status === "Ativo"
                                ? "#ECFDF5"
                                : "#FEF2F2",
                            color:
                              usuario.status === "Ativo"
                                ? "#059669"
                                : "#DC2626",
                            fontWeight: 600,
                            fontSize: "12px",
                            borderRadius: "16px",
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Button
                            size="small"
                            onClick={() => handleOpenModalEdit(usuario)}
                            sx={{
                              textTransform: "none",
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "#1A56DB",
                              p: "2px 8px",
                              "&:hover": { backgroundColor: "#EFF6FF" },
                            }}
                          >
                            Editar
                          </Button>

                          <Button
                            size="small"
                            onClick={() =>
                              handleOpenConfirmInativarUser(usuario)
                            }
                            sx={{
                              textTransform: "none",
                              fontSize: "12px",
                              fontWeight: 600,
                              borderRadius: "12px",
                              px: 1.5,
                              py: 0.3,
                              backgroundColor:
                                usuario.status === "Ativo"
                                  ? "#FEF2F2"
                                  : "#ECFDF5",
                              color:
                                usuario.status === "Ativo"
                                  ? "#EF4444"
                                  : "#10B981",
                              "&:hover": {
                                backgroundColor:
                                  usuario.status === "Ativo"
                                    ? "#FEE2E2"
                                    : "#D1FAE5",
                              },
                            }}
                          >
                            {usuario.status === "Ativo" ? "Inativar" : "Ativar"}
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>

        {/* ==================== ABA 5: CONTROLE DE TRATAMENTO ==================== */}
        <TabPanel value={tabValue} index={4}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Controle de Tratamento
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Gerencie os tratamentos ativos dos pacientes
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 220px" },
                gap: 2,
                mb: 3,
              }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar por paciente ou medicamento..."
                value={tratamentoSearch}
                onChange={(e) => setTratamentoSearch(e.target.value)}
                sx={{
                  backgroundColor: "#FFFFFF",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#FFFFFF",
                    "& fieldset": { borderColor: "#E5E7EB" },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                size="small"
                select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{
                  backgroundColor: "#FFFFFF",
                  "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                }}
              >
                {STATUS_FILTRO.map((status) => (
                  <MenuItem
                    key={status}
                    value={status}
                    sx={{ fontSize: "14px" }}
                  >
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {filteredTratamentos.map((tratamento) => (
                <Paper
                  key={tratamento.id}
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    backgroundColor: "#FFFFFF",
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
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        minWidth: 220,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "15px",
                            color: "#111827",
                          }}
                        >
                          {tratamento.paciente}
                        </Typography>
                        <Chip
                          label={tratamento.status}
                          size="small"
                          sx={{
                            backgroundColor:
                              tratamento.status === "Ativo"
                                ? "#ECFDF5"
                                : "#FEF2F2",
                            color:
                              tratamento.status === "Ativo"
                                ? "#059669"
                                : "#DC2626",
                            fontWeight: 600,
                            fontSize: "12px",
                            borderRadius: "16px",
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>
                          Medicamento
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "#111827",
                          }}
                        >
                          {tratamento.medicamento}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ minWidth: 180 }}>
                      <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>
                        Início do Tratamento
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.8 }}
                      >
                        <CalendarIcon sx={{ fontSize: 16, color: "#6B7280" }} />
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "#111827",
                          }}
                        >
                          {tratamento.inicio}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      size="small"
                      onClick={() => handleOpenConfirmTratamento(tratamento)}
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "13px",
                        borderRadius: "12px",
                        px: 2.5,
                        backgroundColor:
                          tratamento.status === "Ativo" ? "#FEF2F2" : "#ECFDF5",
                        color:
                          tratamento.status === "Ativo" ? "#EF4444" : "#10B981",
                        "&:hover": {
                          backgroundColor:
                            tratamento.status === "Ativo"
                              ? "#FEE2E2"
                              : "#D1FAE5",
                        },
                      }}
                    >
                      {tratamento.status === "Ativo" ? "Inativar" : "Ativar"}
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
        </TabPanel>

        {/* ==================== ABA 6: RELATÓRIOS ==================== */}
        <TabPanel value={tabValue} index={5}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
              >
                Relatórios
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "14px" }}
              >
                Visualize e baixe relatórios semanais, mensais e anuais do
                sistema
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                backgroundColor: "#FFFFFF",
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    mb: 1,
                  }}
                >
                  Tipo de Relatório
                </Typography>
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  {["semanal", "mensal", "anual"].map((tipo) => {
                    const isSelected = tipoRelatorio === tipo;
                    const labels = {
                      semanal: "Semanal",
                      mensal: "Mensal",
                      anual: "Anual",
                    };
                    return (
                      <Button
                        key={tipo}
                        onClick={() => setTipoRelatorio(tipo)}
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: "14px",
                          borderRadius: "10px",
                          px: 3,
                          backgroundColor: isSelected ? "#EFF6FF" : "#FFFFFF",
                          borderColor: isSelected ? "#1A56DB" : "#E5E7EB",
                          borderWidth: "1px",
                          borderStyle: "solid",
                          color: isSelected ? "#1A56DB" : "#374151",
                        }}
                      >
                        {labels[tipo]}
                      </Button>
                    );
                  })}
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {relatorios.map((relatorio) => (
                  <Paper
                    key={relatorio.id}
                    elevation={0}
                    sx={{
                      p: 2.5,
                      border: "1px solid #E5E7EB",
                      borderRadius: 3,
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
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: "10px",
                            backgroundColor: "#EFF6FF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <DocumentIcon
                            sx={{ color: "#1A56DB", fontSize: 22 }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: "15px",
                              color: "#111827",
                            }}
                          >
                            {relatorio.titulo}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "13px", color: "#9CA3AF" }}
                          >
                            {relatorio.data}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 4 }}
                      >
                        <Box>
                          <Typography
                            sx={{ fontSize: "12px", color: "#9CA3AF" }}
                          >
                            Retiradas
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: "16px",
                              color: "#111827",
                            }}
                          >
                            {relatorio.retiradas}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{ fontSize: "12px", color: "#9CA3AF" }}
                          >
                            Novos Pacientes
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: "16px",
                              color: "#111827",
                            }}
                          >
                            {relatorio.novosPacientes}
                          </Typography>
                        </Box>
                        <Button
                          size="small"
                          onClick={() => handleOpenDownloadRelatorio(relatorio)}
                          startIcon={<DownloadIcon />}
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            backgroundColor: "#EFF6FF",
                            color: "#1A56DB",
                            borderRadius: "10px",
                            px: 2.5,
                            py: 1,
                            boxShadow: "none",
                            "&:hover": {
                              backgroundColor: "#DBEAFE",
                              boxShadow: "none",
                            },
                          }}
                        >
                          Baixar PDF
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

      {/* ==================== MODAL 1: EDITAR USUÁRIO ==================== */}
      <Dialog
        open={modalEditOpen}
        onClose={handleCloseModalEdit}
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
            Editar Usuário
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 2.5, py: 1.5 }}>
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
                Nome
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={editNome}
                onChange={(e) => setEditNome(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#FFFFFF",
                    "& fieldset": { borderColor: "#EF4444" },
                    "&:hover fieldset": { borderColor: "#EF4444" },
                    "&.Mui-focused fieldset": { borderColor: "#EF4444" },
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
                E-mail
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
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
        </DialogContent>

        <DialogActions
          sx={{ p: 2.5, pt: 1, justifyContent: "flex-end", gap: 1 }}
        >
          <Button
            onClick={handleCloseModalEdit}
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
            onClick={handleSalvarEdicao}
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
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* ==================== MODAL 2: CONFIRMAR INATIVAÇÃO/ATIVAÇÃO DE USUÁRIO (ABA 4) ==================== */}
      <Dialog
        open={modalConfirmInativarUserOpen}
        onClose={handleCloseConfirmInativarUser}
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
          {usuarioParaInativar && (
            <Typography
              sx={{ fontSize: "14px", color: "#4B5563", lineHeight: 1.5 }}
            >
              Tem certeza que deseja{" "}
              <strong>
                {usuarioParaInativar.status === "Ativo" ? "Inativar" : "Ativar"}
              </strong>{" "}
              o usuário <strong>{usuarioParaInativar.nome}</strong>?
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 1, justifyContent: "flex-end", gap: 1 }}>
          <Button
            onClick={handleCloseConfirmInativarUser}
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
            onClick={handleConfirmarInativacaoUser}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "10px",
              px: 2.5,
              py: 0.6,
              backgroundColor:
                usuarioParaInativar?.status === "Ativo" ? "#EF4444" : "#10B981",
              color: "#FFFFFF",
              boxShadow: "none",
              "&:hover": {
                backgroundColor:
                  usuarioParaInativar?.status === "Ativo"
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

      {/* ==================== MODAL 3: CONFIRMAR INATIVAÇÃO/ATIVAÇÃO DE TRATAMENTO (ABA 5) ==================== */}
      <Dialog
        open={modalConfirmTratamentoOpen}
        onClose={handleCloseConfirmTratamento}
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
            Confirmar Alteração de Tratamento
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 2.5, py: 1 }}>
          {tratamentoParaAlterar && (
            <Typography
              sx={{ fontSize: "14px", color: "#4B5563", lineHeight: 1.5 }}
            >
              Tem certeza que deseja{" "}
              <strong>
                {tratamentoParaAlterar.status === "Ativo"
                  ? "Inativar"
                  : "Ativar"}
              </strong>{" "}
              o tratamento de{" "}
              <strong>{tratamentoParaAlterar.medicamento}</strong> para o
              paciente <strong>{tratamentoParaAlterar.paciente}</strong>?
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 1, justifyContent: "flex-end", gap: 1 }}>
          <Button
            onClick={handleCloseConfirmTratamento}
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
            onClick={handleConfirmarAlteracaoTratamento}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "10px",
              px: 2.5,
              py: 0.6,
              backgroundColor:
                tratamentoParaAlterar?.status === "Ativo"
                  ? "#EF4444"
                  : "#10B981",
              color: "#FFFFFF",
              boxShadow: "none",
              "&:hover": {
                backgroundColor:
                  tratamentoParaAlterar?.status === "Ativo"
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

      {/* ==================== MODAL 4: CONFIRMAR DOWNLOAD DE RELATÓRIO (ABA 6) ==================== */}
      <Dialog
        open={modalDownloadRelatorioOpen}
        onClose={handleCloseDownloadRelatorio}
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
            Baixar Relatório
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 2.5, py: 1 }}>
          {relatorioParaDownload && (
            <Typography
              sx={{ fontSize: "14px", color: "#4B5563", lineHeight: 1.5 }}
            >
              Deseja realizar o download do arquivo em PDF referente ao{" "}
              <strong>{relatorioParaDownload.titulo}</strong>?
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 1, justifyContent: "flex-end", gap: 1 }}>
          <Button
            onClick={handleCloseDownloadRelatorio}
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
            onClick={handleConfirmarDownloadRelatorio}
            startIcon={<DownloadIcon sx={{ fontSize: "16px !important" }} />}
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
            Baixar PDF
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SecretariaDashboard;
