import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from './Loader';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading, isAuthenticated, isAdmin } = useAuth();

    if (loading) {
        return <Loader fullScreen />;
    }

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin()) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
