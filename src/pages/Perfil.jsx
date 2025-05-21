import * as React from "react";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // Adicione isto se estiver usando react-router

function Perfil() {
  const navigate = useNavigate(); // Hook necessário para navegação

  return (
    <>
      <Button
        sx={{ display: "flex", marginLeft: "93%", marginTop: 0 }}
        onClick={() => navigate("/home")}
      >
        <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 40, color: "#807F7F" }} />
      </Button>
      
      <h1>Perfil</h1>
    </>
  );
}

export default Perfil;
