const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Resource not found',
            error: err.message
        });
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            message: `${field} already exists`,
            error: err.message
        });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            message: 'Validation Error',
            errors: messages
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            message: 'Invalid token',
            error: err.message
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            message: 'Token expired',
            error: err.message
        });
    }

    // Default error
    res.status(err.statusCode || 500).json({
        message: err.message || 'Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
