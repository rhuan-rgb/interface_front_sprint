import * as React from "react";
import { useState, useEffect } from "react";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; 


function Reservas() {
  const navigate = useNavigate(); // Hook necessário para navegação
  const [reservas, setReservas] = useState([]);

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

      <h1>Reservas</h1>
    </>
  );
}

export default Reservas;
