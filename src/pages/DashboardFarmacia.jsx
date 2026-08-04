import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const DashboardFarmacia = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard da Farmácia
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Bem-vindo, {user?.name}
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Estoque Total</Typography>
            <Typography variant="h3" color="primary">
              0
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Pedidos Recebidos</Typography>
            <Typography variant="h3" color="info.main">
              0
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Baixo Estoque</Typography>
            <Typography variant="h3" color="error.main">
              0
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardFarmacia;
