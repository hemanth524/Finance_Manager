import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:1927/api", // make sure your backend is running on this port
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
