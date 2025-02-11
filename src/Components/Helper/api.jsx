import axios from "axios";
// import getConfig from 'next/config';
// import { getValue, removeToken } from "./helpers";
// const { publicRuntimeConfig } = getConfig();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// const baseUrl="https://wxbcontrolstagingapi.rootingforyou.app"
const baseurl="http://116.202.210.102:5005/"
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ1MGJlNTM4NDZlMmFkYmI4YjgwNGMiLCJlbWFpbCI6ImRldjAxQHlvcG1haWwuY29tIiwiaWF0IjoxNzM4MzE2MjU3LCJleHAiOjE3Mzg5MjEwNTd9.rVTisFfnCDl0nBOw5duh-7vgTpjJhzCKaJGBZ1BfQtY"

console.log(BACKEND_URL,"===========");

const api = axios.create({
    baseURL: baseurl,
});

api.interceptors.request.use(
    (config) => {
        // const token = getValue('token');
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            // removeToken();
            // window.location.replace("/auth/login");
        }
        return Promise.reject(error);
    }
);

export default api;