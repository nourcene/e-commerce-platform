const express = require('express');
const router = express.Router();
const {
    getProductReviews,
    createReview,
    deleteReview
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

// Public route
router.get('/product/:productId', getProductReviews);

// Protected routes
router.post('/', protect, createReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
