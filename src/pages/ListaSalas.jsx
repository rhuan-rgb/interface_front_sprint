import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { useNavigate } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Button from "@mui/material/Button";

function listRooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  async function getRooms() {
    // Chamada da Api
    await api.getClassroom().then(
      (response) => {
        console.log(response.data.classrooms);
        setRooms(response.data.classrooms);
      },
      (error) => {
        console.log("Erro ", error);
      }
    );
  }

  const listRooms = rooms.map((sala) => {
    return (
      <TableRow sx={{ borderBottom: "2px solid #fff" }} key={sala.number}>
        <TableCell sx={{}} align="center">
          {sala.number}
        </TableCell>
        <TableCell align="center">{sala.description}</TableCell>
        <TableCell align="center">{sala.capacity}</TableCell>
      </TableRow>
    );
  });

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
       <Button
        sx={{ display: "flex", marginLeft: "93%", marginTop: 0,}}
        onClick={() => navigate("/home")}
      >
        <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 40, color:'#807F7F' }} />
      </Button>


    
      <div>
        {rooms.length === 0 ? (
          <h1>Carregando Salas</h1>
        ) : (
          <div>
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#807F7F",
              }}
            >
              Salas
            </h2>
            <TableContainer component={Paper} style={{ margin: "14px" }}>
              <Table size="small">
                <TableHead
                  style={{
                    backgroundColor: "#D9D9D9",
                    border: "10px solid white none",
                  }}
                >
                  <TableRow>
                    <TableCell align="center">Número</TableCell>
                    <TableCell align="center">Descrição</TableCell>
                    <TableCell align="center">Capacidade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    backgroundColor: "#E9E7E7",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "100px",
                  }}
                >
                  {listRooms}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </>
  );
}
export default listRooms;
