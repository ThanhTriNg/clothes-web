import axios from 'axios';
import Cookies from 'js-cookie';
const AxiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const AxiosClient2 = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export const TheColorAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_COLOR,
    headers: {
        'Content-Type': 'application/json',
    },
});

AxiosClient.interceptors.request.use(
    async (response) => {
        return response;
    },
    async (error) => {
        console.log(error);
        throw error;
    },
);

AxiosClient.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
            //logic code refresh token
            Cookies.remove('token');
            window.location.href = '/login';
        }
        throw error;
    },
);

AxiosClient2.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'multipart/form-data';
    return config;
});
export default AxiosClient;
