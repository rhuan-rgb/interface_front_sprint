import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import api from "../axios/axios";

function Cadastro() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    cpf: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
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
        <Avatar sx={{ margin: 1, backgroundColor: "#FFA500" }}>
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastre-se
        </Typography>
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
            required
            fullWidth
            id="data_nascimento"
            name="data_nascimento"
            margin="normal"
            type="date"
            value={user.data_nascimento}
            onChange={onChange}
          />

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
            sx={{ mt: 3, mb: 2, backgroundColor: "#FFA500" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Cadastro;