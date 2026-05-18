import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-leads-dashboard-lmq7.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;