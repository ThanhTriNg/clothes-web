import axios from "axios";
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  timeout: 15 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
