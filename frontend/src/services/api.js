import axios from 'axios';

const VITE_API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || 'http://localhost:4000';
const API_BASE = `${VITE_API_URL}/api`;
export const UPLOAD_BASE = `${VITE_API_URL}/uploads`;

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token and fix baseURL path overriding
api.interceptors.request.use(
    (config) => {
        // If the URL starts with a slash, it will override the baseURL path in Axios.
        // We strip the leading slash to ensure it appends to the baseURL (which includes /api).
        if (config.url && config.url.startsWith('/')) {
            config.url = config.url.substring(1);
        }

        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle the standardized format
api.interceptors.response.use(
    (response) => {
        // If the response has the standardized format, return the data part
        if (response.data && response.data.success !== undefined) {
            return response.data.data;
        }
        return response.data;
    },
    (error) => {
        // Centralized error handling
        if (error.response && error.response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
