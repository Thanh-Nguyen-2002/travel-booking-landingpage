import axios from 'axios';

const apiClient = axios.create({
    baseURL: (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8080/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                // TODO: Implement refresh token logic if needed for landing page
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
export { apiClient };
