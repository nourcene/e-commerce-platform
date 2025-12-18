import React from 'react';

const Loader = ({ size = 'md', fullScreen = false }) => {
    const sizeClasses = {
        sm: 'w-6 h-6 border-2',
        md: 'w-12 h-12 border-3',
        lg: 'w-16 h-16 border-4'
    };

    const loader = (
        <div className={`${sizeClasses[size]} border-primary-600 border-t-transparent rounded-full animate-spin`}></div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
                {loader}
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center py-12">
            {loader}
        </div>
    );
};

export default Loader;
