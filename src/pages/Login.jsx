import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import api from "../axios/axios";
import senai from "../assets/senai_logo.png";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    cpf: 0,
    password: "",
  });
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    // ... mantem o estado inicial atual do user e só altera um unico valor
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  async function login() {
    await api.postLogin(user).then(
      (response) => {
        alert(response.data.message);
        console.log(user);
        navigate("/organizadores")
        
      },
      (error) => {
        console.log(error);
        alert(error.response.data.error);
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
          style={{ width: "200px", marginTop: "60px" }}
          src={senai}
          alt="Logo"
        />

        <Typography component="h1" variant="h5"></Typography>

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

        {/* /mt é a abreviação de marginTop */}
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            id="cpf"
            label="CPF"
            name="cpf"
            margin="normal"
            type="number"
            value={user.cpf}
            onChange={onChange}
            sx={{ borderRadius: 100 }}
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
          />

          <Button
            sx={{
              mt: 2,
              ml: 20,
              mb: 10,
              backgroundColor: "#E31313",
              borderRadius: "8px",
            }}
            type="submit"
            variant="contained"
          >
            Entrar
          </Button>

          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: -8,
              textDecoration: "none",
              fontFamily: "sans-serif",
              color: "gray",
            }}
          >
            Não uma conta? Cadastre-se
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
