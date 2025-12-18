const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        // Verify products and calculate total
        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({ message: `Product ${item.product} not found` });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for ${product.name}`
                });
            }

            orderItems.push({
                product: product._id,
                name: product.name,
                quantity: item.quantity,
                price: product.price,
                imageUrl: product.imageUrl
            });

            totalAmount += product.price * item.quantity;

            // Update product stock
            product.stock -= item.quantity;
            await product.save();
        }

        // Create order
        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount,
            shippingAddress,
            paymentMethod: paymentMethod || 'Card',
            isPaid: true,
            paidAt: Date.now()
        });

        // Clear user's cart
        await Cart.findOneAndUpdate(
            { user: req.user._id },
            { items: [], totalAmount: 0 }
        );

        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort('-createdAt')
            .populate('items.product', 'name imageUrl');

        res.json(orders);
    } catch (error) {
        next(error);
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.product', 'name imageUrl');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Make sure user owns this order or is admin
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }

        res.json(order);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({})
            .sort('-createdAt')
            .populate('user', 'name email')
            .populate('items.product', 'name');

        res.json(orders);
    } catch (error) {
        next(error);
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;

        if (status === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }

        await order.save();

        res.json(order);
    } catch (error) {
        next(error);
    }
};
