import * as React from "react";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";
import { useState, useEffect } from "react";
import ModalBase from "../components/ModalBase";
import { Typography } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [senha, setSenha] = useState({
    senha_atual: "",
    nova_senha: "",
    showPassword: false,
    showPassword2: false,
  });
  const [openModal, setOpenModal] = useState(false);

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

  async function updateSenha() {
    try {
      const cpf = localStorage.getItem("user_cpf");
      const response = await api.updateSenha({
        cpf,
        senha_atual: senha.senha_atual,
        nova_senha: senha.nova_senha,
      });
      alert(response.data.message); // Sucesso
      setOpenModal(false); // Fecha o modal
      setSenha({ senha_atual: "", nova_senha: "" }); // Limpa campos
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error); // Erro da API
      } else {
        alert("Erro ao alterar senha.");
      }
    }
  }

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
          localStorage.setItem("user_cpf", formData.cpf);
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

              <Grid item xs={12} sx={{ marginTop: "1rem" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  {editing ? (
                    <Button
                      variant="contained"
                      onClick={handleSaveChanges}
                      sx={{ backgroundColor: "#008000", color: "white" }}
                    >
                      Salvar Alterações
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      sx={{ backgroundColor: "#D90000", color: "white" }}
                      onClick={() => setEditing(true)}
                    >
                      Editar
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    sx={{ backgroundColor: "#D90000", color: "white" }}
                    onClick={() => setOpenModal(true)}
                  >
                    Alterar Senha
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}

      <ModalBase
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSenha({
            senha_atual: "",
            nova_senha: "",
            showPassword: false,
            showPassword2: false,
          });
        }}
        title="Alterar Senha"
      >
        <Box sx={{ mt: 2 }}>
          <Typography>Altere sua senha</Typography>

          <Box sx={{ position: "relative" }}>
            <TextField
              label="Senha Atual"
              fullWidth
              type={senha.showPassword ? "text" : "password"}
              margin="normal"
              value={senha.senha_atual}
              onChange={(e) =>
                setSenha({ ...senha, senha_atual: e.target.value })
              }
            />
            <Button
              onClick={() =>
                setSenha({ ...senha, showPassword: !senha.showPassword })
              }
              style={{
                position: "absolute",
                right: 8,
                top: "45%",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                minWidth: "auto",
              }}
            >
              {senha.showPassword ? (
                <FaEyeSlash size={20} color="gray" />
              ) : (
                <FaEye size={20} color="gray" />
              )}
            </Button>
          </Box>

          <Box sx={{ position: "relative" }}>
            <TextField
              label="Nova Senha"
              fullWidth
              type={senha.showPassword2 ? "text" : "password"}
              margin="normal"
              value={senha.nova_senha}
              onChange={(e) =>
                setSenha({ ...senha, nova_senha: e.target.value })
              }
            />
            <Button
              onClick={() =>
                setSenha({ ...senha, showPassword2: !senha.showPassword2 })
              }
              style={{
                position: "absolute",
                right: 8,
                top: "45%",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                minWidth: "auto",
              }}
            >
              {senha.showPassword2 ? (
                <FaEyeSlash size={20} color="gray"/>
              ) : (
                <FaEye size={20} color="gray" />
              )}
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#008000", color: "white" }}
              onClick={updateSenha}
              disabled={!senha.senha_atual || !senha.nova_senha}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </ModalBase>
    </>
  );
}

export default Perfil;
