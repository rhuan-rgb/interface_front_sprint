import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import api from "../axios/axios";
import senai from "../assets/senai_logo.png";

function Cadastro() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
  });
  const onChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
    // ... mantem o estado inicial atual do user e só altera um unico valor
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    cadastro();
  };

  async function cadastro() {
    await api.postCadastro(user).then(
      (response) => {
        alert(response.data.message);
        console.log(user);
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
        <img style={{ width: "200px" }} src={senai} />

        <Typography component="h1" variant="h5"></Typography>



        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            height: "50px",
            backgroundColor: "#D9D9D9",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        ></div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            height: "20px",
            backgroundColor: "#d90000",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        ></div>

        

        <div
          style={{
            display: "flex",
            padding: "10px",
            width: "100%",
            height: "15px",
            backgroundColor: "#d90000",
            position: "absolute",
            bottom: 0,
          }}
        ></div>

        {/* /mt é a abreviação de marginTop */}
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            id="name"
            label="Nome"
            name="name"
            margin="normal"
            value={user.name}
            onChange={onChange}
          />

          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            margin="normal"
            type="email"
            value={user.email}
            onChange={onChange}
          />

          <TextField
            id="cpf"
            label="CPF"
            name="cpf"
            type="text"
            required
            fullWidth
            value={user.cpf}
            onChange={onChange}
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
            sx={{ mt: 3, mb: 2, backgroundColor: "#E31313" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Cadastre-se
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Cadastro;
