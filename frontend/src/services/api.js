import axios from "axios";

const api = axios.create({
  baseURL: "https://rapha-ai-server.onrender.com/api",
});

export default api;