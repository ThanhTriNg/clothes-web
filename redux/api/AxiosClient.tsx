import axios from "axios";
const AxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

export const TheColorAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_COLOR,
  headers: {
    "Content-Type": "application/json",
  },
});


export default AxiosClient;
