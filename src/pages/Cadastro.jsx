import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState } from "react";
import api from "../axios/axios";
import senai from "../assets/senai_logo.png";
import { Link, useNavigate } from "react-router-dom";

function Cadastro() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    cadastro();
  };

  const navigate = useNavigate();

  async function cadastro() {
    await api.postCadastro(user).then(
      (response) => {
        alert(response.data.message);
        console.log(user);
        navigate("/");
      },
      (error) => {
        console.log(error);
        alert(error.response.data.error);
        console.log(user);
      }
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "200px", marginTop: "20px" }}
          src={senai}
          alt="Logo"
        />

        {/* header*/}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            height: "50px",
            backgroundColor: "#D9D9D9",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        ></Box>

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
        ></Box>

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

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "25px",
            backgroundColor: "#d90000",
            position: "absolute",
            bottom: 0,
          }}
        ></Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            id="name"
            label="Nome"
            name="name"
            margin="normal"
            value={user.name}
            onChange={onChange}
            sx={{
              // Removendo as formatações originais
              "& .MuiInputBase-root": {
                backgroundColor: "transparent", // Sem fundo
                border: "none", // Removendo a borda
                boxShadow: "none", // Removendo o efeito de sombra
                padding: 0, // Removendo o padding
              },

              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remover a borda padrão (no caso do `outlined`)
              },
              "& .MuiInput-underline:before": {
                borderBottom: "none", // Remover a linha de baixo no caso do `underline`
              },

              backgroundColor: "#D9D9D9",
              borderRadius: "10px",
              
            }}
          />

          <TextField
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            margin="normal"
            type="email"
            value={user.email}
            onChange={onChange}
            sx={{
              // Removendo as formatações originais
              "& .MuiInputBase-root": {
                backgroundColor: "transparent", // Sem fundo
                border: "none", // Removendo a borda
                boxShadow: "none", // Removendo o efeito de sombra
                padding: 0, // Removendo o padding
              },

              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remover a borda padrão (no caso do `outlined`)
              },
              "& .MuiInput-underline:before": {
                borderBottom: "none", // Remover a linha de baixo no caso do `underline`
              },

              backgroundColor: "#D9D9D9",
              borderRadius: "10px",
              marginTop: 0
            }}
          />

          <TextField
            id="cpf"
            label="CPF"
            name="cpf"
            type="number"
            required
            fullWidth
            value={user.cpf}
            onChange={onChange}
            sx={{
              // Removendo as formatações originais
              "& .MuiInputBase-root": {
                backgroundColor: "transparent", // Sem fundo
                border: "none", // Removendo a borda
                boxShadow: "none", // Removendo o efeito de sombra
                padding: 0, // Removendo o padding
              },

              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remover a borda padrão (no caso do `outlined`)
              },
              "& .MuiInput-underline:before": {
                borderBottom: "none", // Remover a linha de baixo no caso do `underline`
              },

              backgroundColor: "#D9D9D9",
              borderRadius: "10px",
            }}
          />

          <TextField
            required
            fullWidth
            id="password"
            label="Senha"
            name="password"
            margin="normal"
            type="password"
            value={user.password}
            onChange={onChange}
            sx={{
              // Removendo as formatações originais
              "& .MuiInputBase-root": {
                backgroundColor: "transparent", // Sem fundo
                border: "none", // Removendo a borda
                boxShadow: "none", // Removendo o efeito de sombra
                padding: 0, // Removendo o padding
              },

              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remover a borda padrão (no caso do `outlined`)
              },
              "& .MuiInput-underline:before": {
                borderBottom: "none", // Remover a linha de baixo no caso do `underline`
              },

              backgroundColor: "#D9D9D9",
              borderRadius: "10px",
              marginTop: 1
            }}
          />

          <Button
            sx={{
              mt: 1,
              ml: 16,
              backgroundColor: "#E31313",
              borderRadius: "10px",
            }}
            type="submit"
            variant="contained"
          >
            Cadastre-se
          </Button>

          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              textDecoration: "none",
              fontFamily: "sans-serif",
              color: "gray",
            }}
          >
            Já possui uma conta? Faça login
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Cadastro;
