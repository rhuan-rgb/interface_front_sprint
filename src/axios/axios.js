import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.96:5000/api/reservas/v1/",
  headers: {
    accept: "application/json",
  },
});

const sheets = {
  postUser: () => api.post("user/"),
  postUser: () => api.post("user/login"),
};

export default sheets;
