import * as React from "react";
import { useState, useEffect } from "react";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Box, Snackbar, Alert } from "@mui/material";
import api from "../axios/axios";
import ModalBase from "../components/ModalBase";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function Reservas() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    async function getReservaCpf() {
      try {
        const cpf = localStorage.getItem("user_cpf");
        const response = await api.getReservaCpf(cpf);
        setReservas(response.data.results);
      } catch (error) {
        console.log("Erro ao buscar reservas", error);
      }
    }

    getReservaCpf();
  }, []);

  const handleCardClick = (reserva) => {
    setReservaSelecionada(reserva);
    setOpenModal(true);
  };

  const handleDeleteReserva = async () => {
    if (!reservaSelecionada) return;

    try {
      await api.deleteReserva(reservaSelecionada.id);
      setReservas((prev) =>
        prev.filter((reserva) => reserva.id !== reservaSelecionada.id)
      );
      setOpenModal(false);
      setReservaSelecionada(null);
      showAlert("success", "Reserva excluída com sucesso!");
      
    } catch (error) {
      console.error("Erro ao deletar reserva:", error);
      showAlert("error", "Erro ao excluir reserva.");
    }
  };

  return (
    <>
      <Button
        sx={{ display: "flex", marginLeft: "93%", marginTop: 0 }}
        onClick={() => navigate("/home")}
      >
        <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 40, color: "#807F7F" }} />
      </Button>

      <h1>Minhas Reservas</h1>

      <Grid container spacing={2} mb={5}>
        {reservas.map((reserva) => (
          <Grid item xs={12} sm={6} md={4} key={reserva.id}>
            <Card
              onClick={() => handleCardClick(reserva)}
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                marginLeft: 5,
                marginRight: 5,
                mb: 1,
                backgroundColor: "#D9D9D9",
                cursor: "pointer",
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" color="#000000">
                  Sala: {reserva.classroom}
                </Typography>
                <Typography color="#000000">
                  Data de Início: {formatDate(reserva.dateStart)}
                </Typography>
                <Typography color="#000000">
                  Data de Término: {formatDate(reserva.dateEnd)}
                </Typography>
                <Typography color="#000000">
                  Horário: {reserva.timeStart} - {reserva.timeEnd}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal para confirmar exclusão */}
      <ModalBase open={openModal} onClose={() => setOpenModal(false)}>
        {reservaSelecionada && (
          <>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              minHeight="50px"
              mb={1}
            >
              <Typography variant="h6" mb={2}>
                Deseja excluir esta reserva?
              </Typography>
            </Box>

            <Box px={2}>
              <Typography>
                <strong>Sala:</strong> {reservaSelecionada.classroom}
              </Typography>
              <Typography>
                <strong>Data de Início:</strong>{" "}
                {formatDate(reservaSelecionada.dateStart)}
              </Typography>
              <Typography>
                <strong>Data de Término:</strong>{" "}
                {formatDate(reservaSelecionada.dateEnd)}
              </Typography>
              <Typography>
                <strong>Horário:</strong> {reservaSelecionada.timeStart} -{" "}
                {reservaSelecionada.timeEnd}
              </Typography>
              <Typography>
                <strong>Dias Reservados:</strong> {reservaSelecionada.days}
              </Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              minHeight="50px"
              mt={2}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteReserva}
              >
                Excluir Reserva
              </Button>
            </Box>
          </>
        )}
      </ModalBase>

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Reservas;
