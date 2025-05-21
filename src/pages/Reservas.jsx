import * as React from "react";
import { useState, useEffect } from "react";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; 
import { Grid, Card, CardContent, Typography } from "@mui/material";
import api from "../axios/axios"; // Supondo que o axios esteja configurado em "../axios/axios"

// Função para formatar a data
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function Reservas() {
  const navigate = useNavigate(); // Hook necessário para navegação
  const [reservas, setReservas] = useState([]);

  // Faz a requisição para obter as reservas do usuário
  useEffect(() => {
    async function getReservaCpf() {
      try {
        const cpf = localStorage.getItem("user_cpf");
        const response = await api.getReservaCpf(cpf);
        setReservas(response.data.results);
      } catch (error) {
        console.log("Erro ", error);
      }
    }

    getReservaCpf();
  }, []);

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
          <Grid item xs={12} sm={6} md={4} key={reserva.id} >
            <Card sx={{ borderRadius: 2, boxShadow: 3, marginLeft: 5, marginRight: 5, mb:1}}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Sala: {reserva.classroom}
                </Typography>
                <Typography color="text.secondary">
                  Data de Início: {formatDate(reserva.dateStart)}
                </Typography>
                <Typography color="text.secondary">
                  Data de Término: {formatDate(reserva.dateEnd)}
                </Typography>
                <Typography color="text.secondary">
                  Dias: {reserva.days}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Horário: {reserva.timeStart} - {reserva.timeEnd}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Reservas;
