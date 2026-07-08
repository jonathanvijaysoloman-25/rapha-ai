import axios from "axios";

const authApi = axios.create({
  baseURL: "https://rapha-ai-server.onrender.com/api/auth",
});

export default authApi;