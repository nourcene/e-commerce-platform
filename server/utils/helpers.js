// Format currency
exports.formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

// Generate random string
exports.generateRandomString = (length = 10) => {
    return Math.random().toString(36).substring(2, length + 2).toUpperCase();
};

// Paginate results
exports.paginate = (page = 1, limit = 12) => {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    return { skip, limit: limitNum, page: pageNum };
};

// Calculate pagination metadata
exports.getPaginationMeta = (total, page, limit) => {
    const totalPages = Math.ceil(total / limit);

    return {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
    };
};
