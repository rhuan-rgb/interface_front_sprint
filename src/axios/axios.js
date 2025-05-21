import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/reservas/v1/",
  headers: {
    accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const sheets = {
  postCadastro: (user) => api.post("user/", user),
  postLogin: (user) => api.post("user/login", user),
  getClassroom: () => api.get("classroom/"),

  getSchedulesByIdClassroomRanges: (class_id, dataInicio, dataTermino) =>
    api.get(
      `/schedule/ranges/${class_id}?weekStart=${dataInicio}&weekEnd=${dataTermino}`
    ),
  createSchedule: (data) => api.post("schedule/", data),

  getReservaCpf: (cpf) => api.get("schedule/cpf/"+cpf),
};

export default sheets;
