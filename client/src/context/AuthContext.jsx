import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { getErrorMessage } from '../utils/helpers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check for stored user on mount
        const storedUser = authService.getStoredUser();
        const token = authService.getStoredToken();

        if (storedUser && token) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            setError(null);
            const data = await authService.login(credentials);
            setUser(data);
            return data;
        } catch (err) {
            const errorMsg = getErrorMessage(err);
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            const data = await authService.register(userData);
            setUser(data);
            return data;
        } catch (err) {
            const errorMsg = getErrorMessage(err);
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const updateUser = async (userData) => {
        try {
            setError(null);
            const data = await authService.updateProfile(userData);
            setUser(data);
            return data;
        } catch (err) {
            const errorMsg = getErrorMessage(err);
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const isAuthenticated = () => {
        return !!user && !!authService.getStoredToken();
    };

    const isAdmin = () => {
        return user?.role === 'admin';
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated,
        isAdmin
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
