import * as React from "react";
import Button from "@mui/material/Button";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Button
        sx={{ display: "flex", marginLeft: "93%", marginTop: 0,}}
        onClick={() => navigate("/perfil")}
      >
        <AccountCircleIcon sx={{ fontSize: 40, color:'#807F7F' }} />
      </Button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "70px",
          marginTop: "140px",
        }}
      >
        <Button
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#D9D9D9",
            border: "none",
            borderRadius: "10px",
            fontSize: "20px",
            width: "200px",
            height: "150px",
            color: "black",
          }}
          onClick={() => navigate("/listaSalas")}
        >
          <GroupsIcon sx={{ fontSize: 80 }} />
          Salas
        </Button>

        <Button
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#D9D9D9",
            border: "none",
            borderRadius: "10px",
            fontSize: "20px",
            width: "200px",
            height: "150px",
            color: "black",
          }}
           onClick={() => navigate("/reservas")}
        >
          <EventAvailableIcon sx={{ fontSize: 70 }} 
          
          />
          Reservas
        </Button>
      </div>
    </>
  );
}

export default Home;
