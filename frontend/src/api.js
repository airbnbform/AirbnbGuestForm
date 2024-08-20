import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "https://99fc88ca-dcca-429e-9219-715399d5ecee-dev.e1-eu-north-azure.choreoapis.dev/airbnbform/backend/v1.0"

const api = axios.create({
    baseURL: apiUrl
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;