export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ORDER_STATUSES = {
    PENDING: 'Pending',
    PAID: 'Paid',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled'
};

export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin'
};

export const ITEMS_PER_PAGE = 12;
