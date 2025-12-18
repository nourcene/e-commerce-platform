const express = require('express');
const router = express.Router();
const {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

// User routes
router.post('/', protect, createOrder);
router.get('/', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

// Admin routes
router.get('/admin/all', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
