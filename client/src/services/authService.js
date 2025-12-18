import API from './api';

export const authService = {
    // Register new user
    register: async (userData) => {
        const response = await API.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    // Login user
    login: async (credentials) => {
        const response = await API.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get current user
    getCurrentUser: async () => {
        const response = await API.get('/auth/me');
        return response.data;
    },

    // Update profile
    updateProfile: async (userData) => {
        const response = await API.put('/auth/profile', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    // Get stored user
    getStoredUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Get stored token
    getStoredToken: () => {
        return localStorage.getItem('token');
    }
};
