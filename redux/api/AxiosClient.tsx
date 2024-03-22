import axios from "axios";
const AxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  timeout: 15 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const TheColorAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_COLOR,
  timeout: 15 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});


export default AxiosClient;
