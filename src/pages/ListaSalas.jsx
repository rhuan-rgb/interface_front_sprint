import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import api from "../axios/axios";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: "10px",
  p: 4,
};

function ListRooms() {
  const [rooms, setRooms] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [days, setDays] = useState("");
  const [dataReservaInicio, setDataReservaInicio] = useState("");
  const [dataReservaTermino, setDataReservaTermino] = useState("");
  const [horaReservaInicio, setHoraReservaInicio] = useState("");
  const [horaReservaTermino, setHoraReservaTermino] = useState("");
  const [salasDisponiveisList, setSalasDisponiveisList] = useState(false);

  const navigate = useNavigate();

  

  useEffect(() => {
    async function getRooms() {
      try {
        const token = localStorage.getItem("token");
        const response = await api.getClassroom(token);
        setRooms(response.data.classrooms);
      } catch (error) {
        console.log("Erro ", error);
      }
    }

    getRooms();
  }, []);

  const handleOpenModal = (room) => {
    setSelectedRoom(room);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRoom(null);
    setDataReservaInicio("");
    setDataReservaTermino("");
    setHoraReservaInicio("");
    setHoraReservaTermino("");
    setSalasDisponiveisList(false);
  };

  const handleReserva = async () => {
    if (
      !dataReservaInicio ||
      !dataReservaTermino ||
      !horaReservaInicio ||
      !horaReservaTermino ||
      !days
    ) {
      alert("Preencha os campos corretamente.");
      return;
    }
    const datahoraInicio = dataReservaInicio + " " + horaReservaInicio;
    const datahoraTermino = dataReservaTermino + " " + horaReservaTermino;

    if (agendamento_nao_valido(datahoraInicio, datahoraTermino)) {
      alert("data do agendamento inválida");
      return;
    }
    const user_cpf = localStorage.getItem("user_cpf");
    const token = localStorage.getItem("token");

    await api
      .createSchedule(
        {
          dateStart: dataReservaInicio,
          dateEnd: dataReservaTermino,
          days: days.split(","),
          user: user_cpf,
          classroom: selectedRoom.number,
          timeStart: horaReservaInicio,
          timeEnd: horaReservaTermino,
        },
        token
      )
      .then(
        (response) => {
          alert(response.data.message);
          handleCloseModal();
        },
        (error) => {
          alert(error.response.data.error);
        }
      );
  };

  const handleDisponibilidade = async (
    class_id,
    dataReservaInicio,
    dataReservaTermino
  ) => {
    if (!dataReservaInicio || !dataReservaTermino || !days) {
      alert("Informe o período e os dias dos agendamentos.");
      return;
    } else {
      console.log(class_id, dataReservaInicio, dataReservaTermino);
      if (data_nao_valida(dataReservaInicio, dataReservaTermino)) {
        alert("data do agendamento inválida");
        return;
      }
      const salas = await api.getSchedulesByIdClassroomRanges(
        class_id.number,
        dataReservaInicio,
        dataReservaTermino
      );
      const salasFiltradas = limparHorariosComAgendamentos(
        salas.data.schedulesByDayAndTimeRange
      );
      // alert(JSON.stringify(salasFiltradas));
      setSalasDisponiveisList(salasFiltradas);
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
            <TableContainer
              component={Paper}
              style={{ margin: "14px", marginBottom: "70px" }}
            >
              <Table size="small">
                <TableHead style={{ backgroundColor: "#D9D9D9" }}>
                  <TableRow>
                    <TableCell align="center">Número</TableCell>
                    <TableCell align="center">Descrição</TableCell>
                    <TableCell align="center">Capacidade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: "#E9E7E7" }}>
                  {rooms.map((sala) => (
                    <TableRow
                      key={sala.number}
                      onClick={() => handleOpenModal(sala)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#d3d3d3" },
                      }}
                    >
                      <TableCell align="center">{sala.number}</TableCell>
                      <TableCell align="center">{sala.description}</TableCell>
                      <TableCell align="center">{sala.capacity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>

      {/* Modal para reserva */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Reserva da Sala {selectedRoom?.number}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <strong>Descrição:</strong> {selectedRoom?.description}
            <br />
            <strong>Capacidade:</strong> {selectedRoom?.capacity}
          </Typography>

          <TextField
            label="DataInicio"
            type="date"
            value={dataReservaInicio}
            onChange={(data) => setDataReservaInicio(data.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="DataTermino"
            type="date"
            value={dataReservaTermino}
            onChange={(data) => setDataReservaTermino(data.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ mb: 2 }}
          />


          <TextField
            label= "Dias"
            value={days}
            onChange={(dias) => setDays(dias.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            onClick={() =>
              handleDisponibilidade(
                selectedRoom,
                dataReservaInicio,
                dataReservaTermino
              )
            }
            fullWidth
            sx={{ mb: 2, backgroundColor: "#D90000"}}
          >
            conferir disponibilidade das salas
          </Button>



{salasDisponiveisList && (
  <TableContainer
    component={Paper}
    style={{ margin: "14px", marginBottom: "20px", maxHeight: "300px", overflowY: "auto" }}
  >
    <Table size="small">
      <TableHead style={{ backgroundColor: "#D9D9D9" }}>
        <TableRow>
          {days
            .split(",")
            .map((dia) => dia.trim())
            .filter((dia) => salasDisponiveisList[dia]) // só mostra se houver dados
            .map((dia) => (
              <TableCell align="center" key={dia}>
                {dia}
              </TableCell>
            ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {(() => {
          const horariosUnicos = new Set();
          Object.values(salasDisponiveisList).forEach((horarios) => {
            Object.keys(horarios).forEach((hora) => horariosUnicos.add(hora));
          });
          const horariosOrdenados = Array.from(horariosUnicos).sort();

          return horariosOrdenados.map((horario) => (
            <TableRow key={horario}>
              {days
                .split(",")
                .map((dia) => dia.trim())
                .filter((dia) => salasDisponiveisList[dia])
                .map((dia) => (
                  <TableCell align="center" key={`${dia}-${horario}`}>
                    {salasDisponiveisList[dia][horario] !== undefined
                      ? horario
                      : "Indisponível"}
                  </TableCell>
                ))}
            </TableRow>
          ));
        })()}
      </TableBody>
    </Table>
  </TableContainer>
)}



          <TextField
            label="HoraInicio"
            type="time"
            value={horaReservaInicio}
            onChange={(hora) => setHoraReservaInicio(hora.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="HoraTermino"
            type="time"
            value={horaReservaTermino}
            onChange={(hora) => setHoraReservaTermino(hora.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Button variant="contained" onClick={handleReserva} fullWidth sx={{backgroundColor: "#D90000",}}>
            Confirmar Reserva
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default ListRooms;







// functions:

//função para checar se a data término é maior que a data início, e se a data é de um tempo futuro (evitando que o usuário agende algo "pra ontem")
function agendamento_nao_valido(date_inicio, date_termino) {
  const d1 = new Date(date_inicio);
  const d2 = new Date(date_termino);
  const now = new Date();

  // Extrai apenas horas e minutos
  const hora1 = d1.getHours() * 60 + d1.getMinutes(); // transforma as horas em minutos multiplicando por 60 para transformar horas e minutos em um único número, facilitando a comparação
  const hora2 = d2.getHours() * 60 + d2.getMinutes();

  return d2 < d1 || d1 < now || d2 < now || hora1 === hora2;
}

const getEpochLocal = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).setHours(0, 0, 0, 0);
};

const data_nao_valida = (dataInicio, dataTermino) => {
  //getEpochLocal pega o valor da data em milisegundos
  const d1Epoch = getEpochLocal(dataInicio);
  const d2Epoch = getEpochLocal(dataTermino);
  const nowEpoch = new Date().setHours(0, 0, 0, 0);

  if (d2Epoch < d1Epoch || d1Epoch < nowEpoch || d2Epoch < nowEpoch) {
    return true;
  }

  return false;
};

const limparHorariosComAgendamentos = (schedulesByDayAndTimeRange) => {
  // Itera sobre os dias da semana e filtra os intervalos de horário ocupados
  const diasDaSemana = Object.keys(schedulesByDayAndTimeRange);

  const resultado = diasDaSemana.reduce((acc, dia) => {
    // Filtra os intervalos de horário de cada dia
    const horariosFiltrados = Object.entries(schedulesByDayAndTimeRange[dia])
      .filter(([intervalo, reservas]) => reservas.length === 0) // Mantém apenas os intervalos sem reservas
      .reduce((obj, [intervalo]) => {
        obj[intervalo] = [];
        return obj;
      }, {});

    // Adiciona o dia com seus horários filtrados no acumulador
    if (Object.keys(horariosFiltrados).length > 0) {
      acc[dia] = horariosFiltrados;
    }
    return acc;
  }, {});
  return resultado;
};
