import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import senai from "../assets/senai_logo.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



const Header = () => {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/");
  }
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          width: "100%",
          height: "50px",
          backgroundColor: "#D9D9D9",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <img style={{width:"70px", marginTop:"20px", marginLeft:"10px"}} src={senai} alt="Logo" />
      </Box>
        
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          height: "20px",
          backgroundColor: "#d90000",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Button
          fullWidth
          onClick={logout}
          sx={{ backgroundColor: "transparent", color: "white", width: "5%" }}
        >
          SAIR
        </Button>
      </Box>

      {/* Risco */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "50px",
          width: "100%",
          height: "1px",
          backgroundColor: "#d90000",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></Box>
    </Container>
  );
};

export default Header;
