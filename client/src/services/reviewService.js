import API from './api';

export const reviewService = {
    // Get product reviews
    getProductReviews: async (productId) => {
        const response = await API.get(`/reviews/product/${productId}`);
        return response.data;
    },

    // Create review
    createReview: async (reviewData) => {
        const response = await API.post('/reviews', reviewData);
        return response.data;
    },

    // Delete review
    deleteReview: async (id) => {
        const response = await API.delete(`/reviews/${id}`);
        return response.data;
    }
};
