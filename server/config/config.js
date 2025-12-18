module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'fallback_secret_key',
    jwtExpire: process.env.JWT_EXPIRE || '30d',
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce',

    // Pagination defaults
    defaultPageSize: 12,
    maxPageSize: 100,

    // Order statuses
    orderStatuses: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'],

    // User roles
    userRoles: ['user', 'admin'],
};
