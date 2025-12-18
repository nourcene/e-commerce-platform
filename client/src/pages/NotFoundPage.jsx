import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    The page you're looking for doesn't exist.
                </p>
                <Link to="/" className="btn btn-primary inline-flex items-center space-x-2">
                    <Home className="w-5 h-5" />
                    <span>Go Home</span>
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
