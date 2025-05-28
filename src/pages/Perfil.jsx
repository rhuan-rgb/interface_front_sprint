import * as React from "react";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";
import { useState, useEffect } from "react";

function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    async function getUser() {
      try {
        const cpf = localStorage.getItem("user_cpf");
        const response = await api.getUser(cpf);
        setUser(response.data.user);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          cpf: response.data.user.cpf,
          password: response.data.user.password,
        });
      } catch (error) {
        console.log("Erro ao buscar informações perfil", error);
      }
    }

    getUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const cpf = localStorage.getItem("user_cpf");
      await api.updateUser(cpf, formData).then(
        (response) => {
          alert(response.data.message);
        },
        (error) => {
          alert(error.response.data.error);
        }
      );

      setEditing(false);
    } catch (error) {
      console.log("Erro ao salvar alterações", error);
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

      {user && (
        <Box sx={{ display: "flex", flexDirection: "row", margin: "2rem" }}>
          {/* Coluna esquerda (Foto de perfil) */}
          <Box sx={{ marginRight: "2rem", textAlign: "center" }}>
            <Button variant="outlined" color="primary">
              Alterar Foto
            </Button>
          </Box>

          {/* Coluna direita (Informações do usuário) */}
          <Box>
            <h2>Perfil do Usuário</h2>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!editing}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!editing}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="CPF"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  disabled={!editing}
                />
              </Grid>

              <Grid item xs={12} sx={{ marginTop: "1rem",  }}>
                {editing ? (
                  <Button
                    variant="contained"
                    onClick={handleSaveChanges}
                    sx={{backgroundColor: "#008000", color:"white"}}
                  >
                    Salvar Alterações
                  </Button>
                ) : (
                  <Button sx={{ backgroundColor: "#D90000", color:"white" }}
                    variant="outlined"
                    onClick={() => setEditing(true)}
                  >
                    Editar
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Perfil;
