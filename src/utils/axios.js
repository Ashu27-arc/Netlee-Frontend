import axios from "axios";

export const API = axios.create({
    baseURL: "https://netlee-backend.onrender.com/api",
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