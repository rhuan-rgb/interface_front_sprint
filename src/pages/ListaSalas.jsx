import { useState, useEffect } from "react";

// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";

// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { TableFooter } from "@mui/material";
import api from "../axios/axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

// useState gerencia o estado atual de uma variavel
// setUsers é como se fosse uma função, seta a constante

function listOrganizadores() {
  const [organizadores, setOrganizadores] = useState([]);

  async function getOrganizadores() {
    // Chamada da Api
    await api.getOrganizadores().then(
      (response) => {
        console.log(response.data.organizadores);
        setOrganizadores(response.data.organizadores);
      },
      (error) => {
        console.log("Erro ", error);
      }
    );
  }

  const listOrganizadores = organizadores.map((organizador) => {
    return (
      <TableRow key={organizador.id_organizador}>
        <TableCell align="center">{organizador.nome}</TableCell>
        <TableCell align="center">{organizador.email}</TableCell>
        <TableCell align="center">{organizador.telefone}</TableCell>
      </TableRow>
    );
  });

  useEffect(() => {
    // Aqui devemos criar ou chamar uma função
    getOrganizadores();
  }, []);

  return (
    <div>
      <h5>Lista de organizadores</h5>
      <TableContainer component={Paper} style={{ margin: "2px" }}>
        <Table size="small">
          <TableHead style={{ backgroundColor: "#008000", borderStyle: "solid" }}>
            <TableRow>
              <TableCell align="center">Nome</TableCell>

              <TableCell align="center">Email</TableCell>

              <TableCell align="center">Telefone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody> {listOrganizadores} </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  );
}

export default listOrganizadores;
