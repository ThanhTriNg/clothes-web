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

// AxiosClient.interceptors.request.use(
//   async (config) => {
//     const token = Cookies.get("token");
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {}
// );
AxiosClient.interceptors.response.use(
  async (response) => {

    return response;
  },
  async (error) => {

    throw error;
  }
);
export default AxiosClient;
