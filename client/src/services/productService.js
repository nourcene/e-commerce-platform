import API from './api';

export const productService = {
    // Get all products
    getProducts: async (params = {}) => {
        const response = await API.get('/products', { params });
        return response.data;
    },

    // Get product by ID
    getProductById: async (id) => {
        const response = await API.get(`/products/${id}`);
        return response.data;
    },

    // Get featured products
    getFeaturedProducts: async () => {
        const response = await API.get('/products/featured');
        return response.data;
    },

    // Create product (admin)
    createProduct: async (productData) => {
        const response = await API.post('/products', productData);
        return response.data;
    },

    // Update product (admin)
    updateProduct: async (id, productData) => {
        const response = await API.put(`/products/${id}`, productData);
        return response.data;
    },

    // Delete product (admin)
    deleteProduct: async (id) => {
        const response = await API.delete(`/products/${id}`);
        return response.data;
    }
};
