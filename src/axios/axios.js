import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/reservas/v1/",
  headers: {
    accept: "application/json",
  },
});

const sheets = {
  postCadastro: (user) => api.post("user/", user),
  postLogin: (user) => api.post("user/login", user),
  getClassroom: (token) =>
    api.get("classroom/", {
      headers: {
        authorization: token,
      },
    }),
  getSchedulesByIdClassroomRanges: (class_id, dataInicio, dataTermino ) =>
    api.get(
      `/schedule/ranges/${class_id}?weekStart=${dataInicio}&weekEnd=${dataTermino}`
    ),
  createSchedule: (data, token) =>
    api.post("schedule/", data, {
      headers: {
        authorization: token,
      },
    }),
};

export default sheets;
