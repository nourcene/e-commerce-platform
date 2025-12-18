import API from './api';

export const orderService = {
    // Create order
    createOrder: async (orderData) => {
        const response = await API.post('/orders', orderData);
        return response.data;
    },

    // Get user orders
    getMyOrders: async () => {
        const response = await API.get('/orders');
        return response.data;
    },

    // Get order by ID
    getOrderById: async (id) => {
        const response = await API.get(`/orders/${id}`);
        return response.data;
    },

    // Get all orders (admin)
    getAllOrders: async () => {
        const response = await API.get('/orders/admin/all');
        return response.data;
    },

    // Update order status (admin)
    updateOrderStatus: async (id, status) => {
        const response = await API.put(`/orders/${id}/status`, { status });
        return response.data;
    }
};
