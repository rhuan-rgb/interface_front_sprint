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
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [ModalTipo, setModalTipo] = useState("");

  const [senha, setSenha] = useState({
    senha_atual: "",
    nova_senha: "",
    showPassword: false,
    showPassword2: false,
  });

  const handleChangeSenha = (e) => {
    const { name, value } = e.target;
    setSenha((prevSenha) => ({
      ...prevSenha,
      [name]: value,
    }));
  };

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

  const handleOpenModal = (tipo) => {
    setModalTipo(tipo);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSenha({
      senha_atual: "",
      nova_senha: "",
      showPassword: false,
      showPassword2: false,
    });
  };

  const deleteUser = async () => {
    const cpf = localStorage.getItem("user_cpf");
    try {
      const response = await api.deleteUser(cpf);
      alert(response.data.message);
      localStorage.removeItem("authenticated");
      navigate("/");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const updatePassword = async () => {
    const cpf = localStorage.getItem("user_cpf");
    try {
      const response = await api.updatePassword({
        cpf: cpf,
        senha_atual: senha.senha_atual,
        nova_senha: senha.nova_senha,
      });
      alert(response.data.message);
      handleCloseModal();
    } catch (error) {
      alert(error.response.data.error);
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
                    onClick={() => handleOpenModal("senha")}
                  >
                    Alterar senha
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{ backgroundColor: "#D90000", color: "white" }}
                    onClick={() => handleOpenModal("deletar")}
                  >
                    Deletar conta
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}

      <ModalBase open={openModal} onClose={handleCloseModal}>
        {ModalTipo === "deletar" && (
          <>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 2,
                color: "#af2e2e",
              }}
            >
              Confirmação
            </Typography>

            <Typography sx={{ fontSize: 16, marginBottom: 3, color: "#333" }}>
              Você tem certeza que deseja deletar sua conta?
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleCloseModal}
                sx={{
                  backgroundColor: "#ccc",
                  color: "#000",
                  "&:hover": { backgroundColor: "#b3b3b3" },
                }}
              >
                Cancelar
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  deleteUser();
                  handleCloseModal();
                }}
                sx={{
                  backgroundColor: "#af2e2e",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#941f1f" },
                }}
              >
                Deletar
              </Button>
            </Box>
          </>
        )}

        {ModalTipo === "senha" && (
          <>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 2,
                color: "#af2e2e",
              }}
            >
              Alterar Senha
            </Typography>

            <Box sx={{ position: "relative", marginBottom: 2 }}>
              <TextField
                fullWidth
                label="Senha Atual"
                name="senha_atual"
                type={senha.showPassword ? "text" : "password"}
                value={senha.senha_atual}
                onChange={handleChangeSenha}
              />
              <Button
                onClick={() =>
                  setSenha({ ...senha, showPassword: !senha.showPassword })
                }
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  minWidth: "auto",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                {senha.showPassword ? (
                  <FaEyeSlash size={20} color="gray" />
                ) : (
                  <FaEye size={20} color="gray" />
                )}
              </Button>
            </Box>

            <Box sx={{ position: "relative", marginBottom: 3 }}>
              <TextField
                fullWidth
                label="Nova Senha"
                name="nova_senha"
                type={senha.showPassword2 ? "text" : "password"}
                value={senha.nova_senha}
                onChange={handleChangeSenha}
              />
              <Button
                onClick={() =>
                  setSenha({
                    ...senha,
                    showPassword2: !senha.showPassword2,
                  })
                }
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  minWidth: "auto",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                {senha.showPassword2 ? (
                  <FaEyeSlash size={20} color="gray" />
                ) : (
                  <FaEye size={20} color="gray" />
                )}
              </Button>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleCloseModal}
                sx={{
                  backgroundColor: "#ccc",
                  color: "#000",
                  "&:hover": { backgroundColor: "#b3b3b3" },
                }}
              >
                Cancelar
              </Button>

              <Button
                variant="contained"
                onClick={updatePassword}
                sx={{
                  backgroundColor: "#af2e2e",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#941f1f" },
                }}
              >
                Alterar
              </Button>
            </Box>
          </>
        )}
      </ModalBase>
    </>
  );
}

export default Perfil;
