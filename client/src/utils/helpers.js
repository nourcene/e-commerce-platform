// Format currency in Tunisian Dinar (TND)
export const formatCurrency = (amount) => {
    return `${amount.toFixed(3)} TND`;
};

// Format date
export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// Calculate cart total
export const calculateCartTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Get error message
export const getErrorMessage = (error) => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }
    if (error.response?.data?.errors) {
        return error.response.data.errors.join(', ');
    }
    return error.message || 'An error occurred';
};
