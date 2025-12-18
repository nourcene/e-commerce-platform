import API from './api';

export const cartService = {
    // Get user cart
    getCart: async () => {
        const response = await API.get('/cart');
        return response.data;
    },

    // Add item to cart
    addToCart: async (productId, quantity = 1) => {
        const response = await API.post('/cart', { productId, quantity });
        return response.data;
    },

    // Update cart item
    updateCartItem: async (itemId, quantity) => {
        const response = await API.put(`/cart/${itemId}`, { quantity });
        return response.data;
    },

    // Remove item from cart
    removeFromCart: async (itemId) => {
        const response = await API.delete(`/cart/${itemId}`);
        return response.data;
    },

    // Clear cart
    clearCart: async () => {
        const response = await API.delete('/cart');
        return response.data;
    }
};
