import axios from "axios";

export const API = axios.create({
    baseURL: "http://192.168.1.12:5000/api",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add response interceptor for better error handling
API.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = error.response && error.response.data ? error.response.data : error.message;
        console.error('API Error:', errorMessage);
        return Promise.reject(error);
    }
);